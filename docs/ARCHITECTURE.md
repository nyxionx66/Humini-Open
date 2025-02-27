# 🏗️ Humini Architecture Documentation

## Overview

Humini is built on a modular, event-driven architecture designed for extensibility and maintainability. The system is composed of several core components that work together to create a flexible and powerful Minecraft bot.

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Humini Bot                              │
│                                                                 │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐         │
│  │             │    │             │    │             │         │
│  │  Core       │    │  Commands   │    │  Plugins    │         │
│  │  Components │    │  System     │    │  System     │         │
│  │             │    │             │    │             │         │
│  └─────────────┘    └─────────────┘    └─────────────┘         │
│         │                 │                  │                  │
│         ▼                 ▼                  ▼                  │
│  ┌─────────────────────────────────────────────────────┐       │
│  │                                                     │       │
│  │                  Event System                       │       │
│  │                                                     │       │
│  └─────────────────────────────────────────────────────┘       │
│         │                 │                  │                  │
│         ▼                 ▼                  ▼                  │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐         │
│  │             │    │             │    │             │         │
│  │  Utilities  │    │  State      │    │  AI         │         │
│  │             │    │  Machine    │    │  Systems    │         │
│  │             │    │             │    │             │         │
│  └─────────────┘    └─────────────┘    └─────────────┘         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Core Components

### HuminiBot

The main class that initializes and coordinates all other components:

- Creates the Mineflayer bot instance
- Sets up plugins, events, and commands
- Handles reconnection and error recovery
- Provides access to configuration

```javascript
// Example initialization
const bot = new HuminiBot();
```

### ConfigManager

Handles loading, saving, and updating configuration:

- Loads configuration from `config.json`
- Provides methods to update configuration
- Supports nested configuration properties
- Handles configuration reloading

```javascript
// Example usage
const config = bot.configManager.getConfig();
bot.configManager.setConfigValue('movement.followDistance', 2);
```

### EventManager

Manages game events and custom events:

- Registers event handlers for Mineflayer events
- Creates custom events specific to Humini
- Provides event filtering and processing
- Controls message printing and logging

```javascript
// Example custom event
bot.on('humini:playerJoin', (player) => {
  // Handle player join
});
```

### PluginManager

Manages Mineflayer plugins and extensions:

- Loads and configures plugins
- Tracks loaded plugins
- Provides plugin status information
- Handles plugin dependencies

```javascript
// Example plugin loading
bot.pluginManager.loadPlugin('pathfinder', pathfinderPlugin);
```

### CommandManager

Processes and executes commands:

- Registers command modules
- Parses command input
- Routes commands to handlers
- Manages command aliases and custom commands

```javascript
// Example command execution
bot.commandManager.executeCommand('follow PlayerName');
```

## Utility Systems

### Logger

Provides structured and colorful logging:

- Different log levels (info, success, warn, error, debug)
- Color-coded output for readability
- Debug mode for verbose logging
- Formatted timestamps

```javascript
// Example logging
Logger.info('Bot initialized');
Logger.error('Connection failed');
```

### InventoryUtils

Helper functions for inventory management:

- Finding items by name or ID
- Counting items
- Checking free slots
- Equipping items and armor
- Dropping items

```javascript
// Example inventory operations
const diamonds = InventoryUtils.findItems(bot, 'diamond');
InventoryUtils.equipItem(bot, 'diamond_sword');
```

### VectorUtils

Vector math and position utilities:

- Position calculations
- Distance measurements
- Block position utilities
- Path finding helpers

```javascript
// Example vector operations
const distance = VectorUtils.euclideanDistance(pos1, pos2);
const adjacent = VectorUtils.getAdjacent(position);
```

### StateMachineManager

Manages complex bot behaviors:

- Creates state machines for different tasks
- Handles state transitions
- Manages nested state machines
- Provides behavior composition

```javascript
// Example state machine
const farmingMachine = stateMachineManager.createStateMachine('farming', states, transitions);
stateMachineManager.startStateMachine('farming');
```

## AI Systems

### AI Chat System

Enables natural language interactions:

- Intent classification
- Natural language understanding
- Action execution based on intent
- Conversational responses

```javascript
// Example AI chat initialization
bot.commandManager.executeCommand('aichat YOUR_API_KEY');
```

## Plugin Integration

Humini integrates with several Mineflayer plugins:

- **pathfinder** - Advanced pathfinding and movement
- **armor-manager** - Automatic armor equipping
- **auto-eat** - Food consumption management
- **collectblock** - Block collection capabilities
- **pvp** - Combat capabilities
- **tool** - Tool selection and usage

## Event Flow

1. Minecraft server sends data to the bot
2. Mineflayer processes the data and emits events
3. Humini's EventManager receives the events
4. Custom processing and filtering is applied
5. Humini-specific events are emitted
6. Event handlers execute appropriate actions
7. Commands or AI systems may be triggered

## Command Flow

1. User enters a command in console or via chat
2. CommandManager receives the input
3. Command is parsed and matched to a handler
4. Command handler executes with provided arguments
5. Actions are performed on the bot
6. Results are logged or sent to chat

## Configuration System

The configuration is stored in `config.json` and includes:

- Bot connection details
- Feature-specific settings
- Custom commands
- AI system configuration
- Movement parameters

## Extending the System

### Adding New Commands

Create a command module and register it with the CommandManager.

### Creating Custom Plugins

Develop plugins using the Mineflayer plugin API and load them with PluginManager.

### Adding New Features

Integrate new functionality by:
1. Creating appropriate utility classes
2. Registering event handlers
3. Adding command interfaces
4. Updating configuration as needed

## Error Handling and Recovery

- Connection errors trigger automatic reconnection
- Command errors are caught and logged
- Plugin failures are isolated
- Critical errors trigger graceful shutdown

## Performance Considerations

- Event handlers are optimized for minimal overhead
- Resource-intensive operations are throttled
- Memory usage is monitored
- Long-running tasks are broken into smaller steps

## Security Considerations

- API keys are stored securely in configuration
- Custom commands are validated before execution
- User input is sanitized
- Error messages don't expose sensitive information
