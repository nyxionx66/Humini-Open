<div align="center">
  
# 🤖 HUMINI REMASTERED

**The Next-Generation AI-Powered Minecraft Bot**

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Node](https://img.shields.io/badge/node-18.x-green)
![License](https://img.shields.io/badge/license-MIT-orange)

</div>

<p align="center">
  <img src="https://i.imgur.com/XJyemeI.png" alt="Humini Bot Logo" width="400"/>
</p>

## 🌟 Overview

Humini Remastered is a cutting-edge Minecraft bot built on a modular architecture with advanced AI capabilities. It combines powerful automation with natural language understanding to create an intelligent assistant for your Minecraft adventures.

```
"The future of Minecraft automation isn't just about what the bot can do,
but how naturally it can interact with players."
```

## ✨ Key Features

- **🧠 AI-Powered Chat** - Natural conversations with players using Mistral AI
- **🔄 Advanced Command System** - Extensible command framework with aliases and custom commands
- **🚶 Smart Navigation** - Pathfinding and following capabilities
- **📦 Inventory Management** - Item handling, giving, and collection
- **🛡️ Survival Tools** - Auto-eat, armor management, and anti-AFK features
- **🌲 Resource Collection** - Tree farming and block collection
- **🔧 Modular Architecture** - Easily extendable with plugins and new features

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or higher
- NPM 8.x or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/humini-remastered.git

# Navigate to the project directory
cd humini-remastered

# Install dependencies
npm install

# Start the bot
npm start
```

### Configuration

Edit the `config.json` file to customize your bot:

```json
{
  "bot": {
    "host": "your-server.com",
    "port": 25565,
    "username": "YourBotName",
    "version": "1.20.1"
  }
}
```

## 💬 AI Chat System

Humini features an advanced AI chat system powered by Mistral AI. The bot can:

- Understand natural language commands
- Respond to player messages in a conversational manner
- Detect intent and execute appropriate actions
- Follow players, give items, and perform tasks on request

### Setting Up AI Chat

```
aichat <your_mistral_api_key>
```

Once enabled, players can interact with the bot using natural language. For example:

- "Can you follow me?"
- "Give me 5 diamonds please"
- "What's in your inventory?"
- "Come over here"

### Advanced Mode

Activate the bot's advanced mode with:

```
make fully advanced
```

This special command enables enhanced capabilities, allowing the bot to:
- Stop following if currently following a player
- Give specific items when requested
- Respond to complex multi-part requests

## 🎮 Console Commands

| Command | Aliases | Description |
|---------|---------|-------------|
| `help` | `?`, `commands` | Shows available commands |
| `say <message>` | `chat`, `msg` | Send a chat message |
| `follow <username>` | `followplayer` | Follow a player |
| `follow stop` | | Stop following |
| `give <username> [count] <item>` | `gimme` | Give items to a player |
| `custom list` | `cmd list` | List custom commands |
| `custom add <name> <action>` | `cmd add` | Add a custom command |
| `custom remove <name>` | `cmd remove` | Remove a custom command |
| `togglemsgs` | `messages`, `msgs` | Toggle in-game message printing |
| `debug` | `verbose` | Toggle debug mode |
| `reload` | `refresh` | Reload configuration and commands |
| `antiafk [seconds]` | `afk`, `noafk` | Toggle anti-AFK mode |
| `aichat <api_key>` | `ai`, `chatai` | Toggle AI chat responses |
| `quit` | `exit`, `stop` | Shutdown the bot |

## 🔧 Advanced Configuration

### Custom Commands

Define shortcuts for common actions:

```json
"customCommands": {
  "rg": "/register password password",
  "lg": "/login password",
  "tpa": "/tpa playername"
}
```

### Auto-Eat Settings

Configure when and what the bot should eat:

```json
"autoEat": {
  "startAt": 19,
  "priority": "foodPoints",
  "bannedFood": ["rotten_flesh", "spider_eye"],
  "cooldown": 5000
}
```

### Movement Settings

Fine-tune how the bot follows players:

```json
"movement": {
  "followDistance": 1,
  "lookInterval": 800
}
```

## 📚 Architecture

Humini is built on a modular architecture with several key components:

- **Core System**
  - `HuminiBot` - Main bot instance and initialization
  - `EventManager` - Handles game events and custom events
  - `PluginManager` - Manages bot plugins and extensions
  - `CommandManager` - Processes and executes commands

- **Utilities**
  - `ConfigManager` - Handles configuration loading and saving
  - `Logger` - Provides colorful and structured logging
  - `InventoryUtils` - Helper functions for inventory management
  - `VectorUtils` - Vector math and position utilities
  - `StateMachineManager` - Manages complex bot behaviors

## 🔌 Plugins

Humini uses several Mineflayer plugins:

- `mineflayer-pathfinder` - Advanced pathfinding
- `mineflayer-armor-manager` - Automatic armor equipping
- `mineflayer-auto-eat` - Food consumption management
- `mineflayer-collectblock` - Block collection capabilities
- `mineflayer-pvp` - Combat capabilities
- `mineflayer-tool` - Tool selection and usage

## 🛠️ Extending Humini

### Creating a New Command

Create a new file in the `src/commands` directory:

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

Then add it to `src/commands/index.js`:

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

## 📊 Dashboard

Humini includes a web dashboard for monitoring and controlling the bot:

```json
"dashboard": {
  "enabled": true,
  "port": 3000
}
```

Access the dashboard at `http://localhost:3000` when the bot is running.

## 🔮 Future Development

- **Voice Recognition** - Control the bot with voice commands
- **Computer Vision** - Visual analysis of the game environment
- **Advanced Combat** - Sophisticated PvP strategies
- **Building System** - Automated construction capabilities
- **Multi-Server Support** - Control bots across multiple servers

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Mineflayer](https://github.com/PrismarineJS/mineflayer) - The foundation of this bot
- [Mistral AI](https://mistral.ai/) - Powering the natural language capabilities
- All contributors and the Minecraft bot community

---

<div align="center">
  
**Humini Remastered** • Developed with ❤️ by Jerseys Team • © 2025

</div>
