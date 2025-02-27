import mineflayer from 'mineflayer';
import pathfinderPlugin from 'mineflayer-pathfinder';
import armorManager from 'mineflayer-armor-manager';
import { plugin as autoEatPlugin } from 'mineflayer-auto-eat';
import { plugin as collectBlockPlugin } from 'mineflayer-collectblock';
import { plugin as toolPlugin } from 'mineflayer-tool';
import minecraftData from 'minecraft-data';

import { ConfigManager } from '../utils/config-manager.js';
import { EventManager } from './event-manager.js';
import { PluginManager } from './plugin-manager.js';
import { CommandManager } from '../commands/command-manager.js';
import { commands } from '../commands/index.js';
import { Logger } from '../utils/logger.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class HuminiBot {
  constructor() {
    this.configManager = new ConfigManager();
    this.config = this.configManager.getConfig();
    this.bot = null;
    this.eventManager = null;
    this.pluginManager = null;
    this.commandManager = null;

    this.initialize();
  }

  initialize() {
    Logger.info('Initializing Humini bot...');

    this.createBot();
    this.setupPlugins();
    this.setupEventSystem();
    this.setupCommandSystem();
    this.setupConsoleCommands();
  }

  createBot() {
    const botConfig = this.config.bot;

    try {
      this.bot = mineflayer.createBot({
        host: botConfig.host,
        port: botConfig.port,
        username: botConfig.username,
        version: botConfig.version,
        auth: 'offline',
        hideErrors: false,
        // Add a retry mechanism
        reconnect: true,
        chatLengthLimit: 100
      });

      // Attach config to bot instance for easy access
      this.bot.huminiConfig = this.config;

      // Attach HuminiBot instance to bot for access from commands
      this.bot.huminiBot = this;

      Logger.info(`Connecting to ${botConfig.host}:${botConfig.port} as ${botConfig.username}`);

      // Add error handling for connection issues
      this.bot.on('error', (err) => {
        Logger.error(`Connection error: ${err.message}`);
      });

      // Add reconnect handling
      this.bot.on('end', () => {
        Logger.warn('Connection ended, will attempt to reconnect...');
        setTimeout(() => {
          Logger.info('Attempting to reconnect...');
          this.createBot();
        }, 5000); // Wait 5 seconds before reconnecting
      });
    } catch (error) {
      Logger.error(`Failed to create bot: ${error.message}`);

      // Set up a dummy bot for console commands to work
      this.setupDummyBot();
    }
  }

  setupDummyBot() {
    // Create a minimal bot object that can handle console commands
    this.bot = {
      chat: (message) => {
        Logger.info(`[CONSOLE] ${message}`);
      },
      huminiConfig: this.config,
      huminiBot: this
    };

    Logger.warn('Running in console-only mode. Server connection failed.');
  }

  setupPlugins() {
    this.pluginManager = new PluginManager(this.bot, this.config);

    // Only load plugins if we have a real bot connection
    if (this.bot._client) {
      // Load core plugins
      this.pluginManager.loadPlugin('pathfinder', pathfinderPlugin.pathfinder);
      this.pluginManager.loadPlugin('armorManager', armorManager);
      this.pluginManager.loadPlugin('autoEat', autoEatPlugin);
      this.pluginManager.loadPlugin('collectBlock', collectBlockPlugin);
      this.pluginManager.loadPlugin('tool', toolPlugin);

      // Configure pathfinder with default movements
      if (this.bot.pathfinder) {
        const mcData = minecraftData(this.bot.version);
        const { Movements } = pathfinderPlugin;
        const movements = new Movements(this.bot, mcData);
        this.bot.pathfinder.setMovements(movements);
      }
    } else {
      Logger.warn('Skipping plugin setup - bot is in console-only mode');
    }
  }

  setupEventSystem() {
    // Only set up event system if we have a real bot connection
    if (this.bot._client) {
      this.eventManager = new EventManager(this.bot, this.config);
      this.eventManager.registerAllEvents();

      // Attach event manager to bot for access from commands
      this.bot.eventManager = this.eventManager;
    } else {
      Logger.warn('Skipping event system setup - bot is in console-only mode');
    }
  }

  setupCommandSystem() {
    this.commandManager = new CommandManager(this.bot, this.config);

    // Load all commands
    this.commandManager.loadCommands(commands);

    // Attach command manager to bot for access from commands
    this.bot.commandManager = this.commandManager;

    Logger.info('Command system initialized');
  }

  setupConsoleCommands() {
    // Set up console input handling
    process.stdin.on('data', (data) => {
      const input = data.toString().trim();

      // Skip empty input
      if (!input) return;

      // Use the command manager to handle the input
      if (!this.commandManager.executeCommand(input)) {
        // Check if it's a direct custom command from config
        if (this.config.customCommands && this.config.customCommands[input]) {
          if (this.bot.chat) {
            this.bot.chat(this.config.customCommands[input]);
            Logger.info(`Executed custom command: ${input} -> ${this.config.customCommands[input]}`);
          } else {
            Logger.warn(`Cannot execute command: Bot chat function not available`);
          }
        } else {
          Logger.warn(`Unknown command. Type "help" for available commands.`);
        }
      }
    });

    Logger.info('Console command handler initialized. Type "help" for available commands.');
  }

  reloadConfig() {
    this.config = this.configManager.reloadConfig();
    this.bot.huminiConfig = this.config;
    Logger.info('Configuration reloaded');

    // Update any runtime configurations
    if (this.bot.autoEat) {
      this.bot.autoEat.options = this.config.autoEat;
    }

    return this.config;
  }

  async reloadCommands() {
    if (this.commandManager) {
      try {
        // Get the commands directory path
        const commandsDir = path.join(__dirname, '../commands');

        // Read all command files
        const commandFiles = fs.readdirSync(commandsDir)
            .filter(file => file.endsWith('-command.js'))
            .map(file => path.join(commandsDir, file));

        // Load each command file directly
        const freshCommands = [];

        for (const filePath of commandFiles) {
          try {
            // Import the file with a cache-busting query parameter
            const fileUrl = `file://${filePath}?t=${Date.now()}`;
            const commandModule = await import(fileUrl);

            // Get the default export
            const command = commandModule.default;

            if (command && command.name && typeof command.execute === 'function') {
              freshCommands.push(command);
              Logger.debug(`Loaded command: ${command.name}`);
            }
          } catch (error) {
            Logger.error(`Error loading command file ${path.basename(filePath)}: ${error.message}`);
          }
        }

        // Reload commands using the command manager
        this.commandManager.loadCommands(freshCommands);

        // Log the result
        Logger.success(`Reloaded ${this.commandManager.getCommands().size} commands`);

        return true;
      } catch (error) {
        Logger.error(`Failed to reload commands: ${error.message}`);
        return false;
      }
    }

    Logger.error('Cannot reload commands: Command manager not available');
    return false;
  }
}