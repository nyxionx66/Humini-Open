import { HuminiBot } from './src/core/bot.js';
import { Logger } from './src/utils/logger.js';

try {
  const bot = new HuminiBot();
  Logger.info('Humini bot initialized successfully!');
} catch (error) {
  Logger.error(`Failed to initialize bot: ${error.message}`);
  process.exit(1);
}