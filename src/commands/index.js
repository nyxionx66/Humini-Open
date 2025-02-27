import helpCommand from './help-command.js';
import sayCommand from './say-command.js';
import toggleMessagesCommand from './toggle-messages-command.js';
import debugCommand from './debug-command.js';
import reloadCommand from './reload-command.js';
import quitCommand from './quit-command.js';
import customCommand from './custom-command.js';
import giveCommand from './give-command.js';
import followCommand from './follow-command.js';

// Export all commands as an array
export const commands = [
    helpCommand,
    sayCommand,
    toggleMessagesCommand,
    debugCommand,
    reloadCommand,
    quitCommand,
    customCommand,
    giveCommand,
    followCommand,
];

// Export individual commands for direct imports
export {
    helpCommand,
    sayCommand,
    toggleMessagesCommand,
    debugCommand,
    reloadCommand,
    quitCommand,
    customCommand,
    giveCommand,
    followCommand
};