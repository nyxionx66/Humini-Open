import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Logger } from './logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class ConfigManager {
  constructor() {
    this.configPath = path.join(__dirname, '../../config.json');
    this.config = this.loadConfig();
  }

  loadConfig() {
    try {
      const configData = fs.readFileSync(this.configPath, 'utf8');
      const config = JSON.parse(configData);
      Logger.debug('Configuration loaded successfully');
      return config;
    } catch (error) {
      Logger.error(`Error loading config: ${error.message}`);
      process.exit(1);
    }
  }

  getConfig() {
    return this.config;
  }

  reloadConfig() {
    try {
      this.config = this.loadConfig();
      Logger.info('Configuration reloaded successfully');
      return this.config;
    } catch (error) {
      Logger.error(`Error reloading config: ${error.message}`);
      return this.config; // Return existing config on error
    }
  }

  updateConfig(newConfig) {
    try {
      // Merge with existing config to ensure all properties are preserved
      this.config = { ...this.config, ...newConfig };
      
      // Write to file
      fs.writeFileSync(
        this.configPath,
        JSON.stringify(this.config, null, 2),
        'utf8'
      );
      
      Logger.info('Configuration updated successfully');
      return true;
    } catch (error) {
      Logger.error(`Error updating config: ${error.message}`);
      return false;
    }
  }

  getConfigValue(key, defaultValue = null) {
    // Support nested keys with dot notation (e.g., 'bot.username')
    const keys = key.split('.');
    let value = this.config;
    
    for (const k of keys) {
      if (value === undefined || value === null) {
        return defaultValue;
      }
      value = value[k];
    }
    
    return value !== undefined ? value : defaultValue;
  }

  setConfigValue(key, value) {
    // Support nested keys with dot notation
    const keys = key.split('.');
    let current = this.config;
    
    // Navigate to the nested object
    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i];
      if (!current[k] || typeof current[k] !== 'object') {
        current[k] = {};
      }
      current = current[k];
    }
    
    // Set the value
    current[keys[keys.length - 1]] = value;
    
    // Save the updated config
    return this.updateConfig(this.config);
  }
}