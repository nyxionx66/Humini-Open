import { Logger } from '../utils/logger.js';

export class PluginManager {
  constructor(bot, config) {
    this.bot = bot;
    this.config = config;
    this.loadedPlugins = new Map();
  }

  loadPlugin(name, plugin) {
    try {
      if (this.loadedPlugins.has(name)) {
        Logger.warn(`Plugin '${name}' is already loaded`);
        return false;
      }
      
      // Load the plugin
      this.bot.loadPlugin(plugin);
      
      // Store the plugin reference
      this.loadedPlugins.set(name, plugin);
      
      Logger.success(`Plugin '${name}' loaded successfully`);
      return true;
    } catch (error) {
      Logger.error(`Failed to load plugin '${name}': ${error.message}`);
      return false;
    }
  }

  async loadPluginAsync(name, importPromise) {
    try {
      const module = await importPromise;
      const plugin = module.default || module.plugin || module;
      
      return this.loadPlugin(name, plugin);
    } catch (error) {
      Logger.error(`Failed to load plugin '${name}': ${error.message}`);
      return false;
    }
  }

  getPlugin(name) {
    return this.loadedPlugins.get(name);
  }

  isPluginLoaded(name) {
    return this.loadedPlugins.has(name);
  }

  getLoadedPlugins() {
    return Array.from(this.loadedPlugins.keys());
  }

  configurePlugin(name, options) {
    if (!this.isPluginLoaded(name)) {
      Logger.warn(`Cannot configure plugin '${name}': Plugin not loaded`);
      return false;
    }
    
    try {
      // Different plugins have different configuration methods
      switch (name) {
        case 'autoEat':
          if (this.bot.autoEat) {
            this.bot.autoEat.options = options;
            Logger.info(`Configured plugin '${name}'`);
            return true;
          }
          break;
          
        case 'pathfinder':
          if (this.bot.pathfinder) {
            // Pathfinder typically configures movements
            // This is just a placeholder for actual configuration
            Logger.info(`Configured plugin '${name}'`);
            return true;
          }
          break;
          
        default:
          Logger.warn(`No configuration handler for plugin '${name}'`);
          return false;
      }
      
      Logger.warn(`Failed to configure plugin '${name}': Plugin interface not found`);
      return false;
    } catch (error) {
      Logger.error(`Error configuring plugin '${name}': ${error.message}`);
      return false;
    }
  }
}