# 🔄 Command System Documentation

## Overview

Humini's command system provides a flexible and extensible framework for controlling the bot through both console input and in-game chat. The system supports command aliases, parameter parsing, and custom user-defined commands.

## Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│   User Input    │────▶│ Command Manager │────▶│ Command Module  │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                               │   ▲
                               ▼   │
                        ┌─────────────────┐
                        │                 │
                        │  Custom Commands│
                        │                 │
                        └─────────────────┘
```

## Key Components

### CommandManager

The `CommandManager` class is the core of the command system:

- Registers and manages commands
- Parses user input
- Routes commands to the appropriate handler
- Manages command aliases
- Handles custom commands from configuration

### Command Structure

Each command is defined as a module with the following structure:

```javascript
{
    name: 'commandName',        // Primary command name
    aliases: ['alias1', 'alias2'], // Alternative names (optional)
    description: 'Description of what the command does',
    
    execute(bot, args, config) {
        // Command implementation
    }
}
```

### Command Registration

Commands are registered during bot initialization:

1. The `CommandManager` is created in `HuminiBot`
2. Commands are imported from the `commands` directory
3. Each command is registered using `registerCommand()`
4. Aliases are mapped to their primary commands

## Built-in Commands

### Core Commands

| Command | Description | Usage |
|---------|-------------|-------|
| `help` | Shows available commands | `help` |
| `say` | Send a chat message | `say <message>` |
| `togglemsgs` | Toggle in-game message printing | `togglemsgs [on/off]` |
| `debug` | Toggle debug mode | `debug [on/off]` |
| `reload` | Reload configuration and commands | `reload [all/config/commands]` |
| `quit` | Shutdown the bot | `quit` |

### Interaction Commands

| Command | Description | Usage |
|---------|-------------|-------|
| `follow` | Follow a player | `follow <username>` |
| `follow stop` | Stop following | `follow stop` |
| `give` | Give items to a player | `give <username> [count] <item>` |
| `antiafk` | Toggle anti-AFK mode | `antiafk [seconds]` |
| `aichat` | Toggle AI chat responses | `aichat <api_key>` |

### Custom Command Management

| Command | Description | Usage |
|---------|-------------|-------|
| `custom list` | List custom commands | `custom list` |
| `custom add` | Add a custom command | `custom add <name> <action>` |
| `custom remove` | Remove a custom command | `custom remove <name>` |
| `custom run` | Run a custom command | `custom run <name>` |

## Custom Commands

Custom commands allow users to define shortcuts for common actions without writing code.

### Configuration

Custom commands are defined in the `config.json` file:

```json
"customCommands": {
  "rg": "/register password password",
  "lg": "/login password",
  "tpa": "/tpa playername",
  "gg": "Good game everyone!"
}
```

### Usage

Custom commands can be executed directly from the console:

```
rg
```

This will execute the corresponding action (e.g., `/register password password`).

### Management

Custom commands can be managed using the `custom` command:

```
custom add hello Hello everyone!
custom remove hello
custom list
```

## Command Execution Flow

1. User enters a command in the console or triggers it via AI chat
2. `CommandManager.executeCommand()` is called with the input
3. The input is split into command name and arguments
4. The system checks if the command exists in registered commands
5. If not found, it checks aliases
6. If still not found, it checks custom commands
7. If found, the command's `execute()` method is called with the bot instance, arguments, and configuration
8. The command performs its action and returns

## Extending the System

### Creating a New Command

1. Create a new file in the `src/commands` directory:

```javascript
// src/commands/example-command.js
import { Logger } from '../utils/logger.js';

export default {
    name: 'example',
    aliases: ['ex', 'sample'],
    description: 'An example command',

    execute(bot, args, config) {
        Logger.info('Example command executed!');
        bot.chat('This is an example command');
    }
};
```

2. Add the command to `src/commands/index.js`:

```javascript
import exampleCommand from './example-command.js';

// Add to commands array
export const commands = [
    // ... existing commands
    exampleCommand,
];

// Add to named exports
export {
    // ... existing exports
    exampleCommand
};
```

### Hot Reloading

Commands can be reloaded without restarting the bot using the `reload` command:

```
reload commands
```

This will:
1. Clear existing commands and aliases
2. Re-import all command modules
3. Register the updated commands

## Advanced Usage

### Command Chaining

Multiple commands can be executed in sequence using the shell's command separator:

```
follow PlayerName && say I'm following you now!
```

### Command Access

Commands can access:

- The bot instance (`bot`)
- Command arguments (`args`)
- Bot configuration (`config`)
- Other commands via `bot.commandManager.getCommand()`

### Integration with AI Chat

The AI chat system can trigger commands based on natural language input:

```javascript
// Example from aichat-command.js
async handleFollowCommand(bot, username, message) {
    // Get the follow command
    const followCommand = bot.commandManager.getCommand('follow');
    
    // Execute the follow command
    followCommand.execute(bot, [username], bot.huminiConfig);
    
    // Send a response
    bot.chat(`I'm following you now, ${username}!`);
}
```

## Troubleshooting

### Common Issues

- **Command Not Found**: Check spelling and ensure the command is registered
- **Incorrect Arguments**: Check the command usage with `help`
- **Command Conflicts**: Ensure no two commands or aliases have the same name

### Debugging

Enable debug mode to see detailed logs:

```
debug on
```

This will show:
- Command registration details
- Command execution attempts
- Error messages
