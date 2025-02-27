# 🚀 Getting Started with Humini

This guide will help you set up and start using Humini, the advanced AI-powered Minecraft bot.

## Prerequisites

Before installing Humini, ensure you have:

- **Node.js** (v18.x or higher)
- **NPM** (v8.x or higher)
- A Minecraft server to connect to (Java Edition)
- (Optional) A Mistral AI API key for AI chat features

## Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/humini-remastered.git
cd humini-remastered
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure the Bot

Edit the `config.json` file to match your server details:

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

### Step 4: Start the Bot

```bash
npm start
```

## Basic Usage

Once the bot is running, you can control it using the console or in-game chat.

### Console Commands

Type commands directly into the console where Humini is running:

```
help
```

This will show all available commands.

### In-Game Interaction

If you have AI chat enabled, you can interact with the bot using natural language in-game.

## Configuration Guide

### Bot Connection

```json
"bot": {
  "host": "mc.example.com",  // Server hostname or IP
  "port": 25565,             // Server port (default: 25565)
  "username": "HuminiBot",   // Bot's username
  "version": "1.20.1"        // Minecraft version
}
```

### Auto-Eat Settings

```json
"autoEat": {
  "startAt": 19,             // Food level to start eating (max: 20)
  "priority": "foodPoints",  // Priority: "foodPoints" or "saturation"
  "bannedFood": [],          // Foods the bot should not eat
  "cooldown": 5000           // Cooldown between eating attempts (ms)
}
```

### Movement Settings

```json
"movement": {
  "followDistance": 1,       // Distance to maintain when following
  "lookInterval": 800        // How often to update when following (ms)
}
```

### Dashboard Settings

```json
"dashboard": {
  "enabled": true,           // Enable/disable web dashboard
  "port": 3000               // Dashboard port
}
```

### Custom Commands

```json
"customCommands": {
  "rg": "/register password password",  // Registration command
  "lg": "/login password",              // Login command
  "gg": "Good game everyone!"           // Chat message
}
```

### Tree Bot Settings

```json
"treeBot": {
  "searchRadius": 50,                   // Search radius for trees
  "climbingBlocks": [                   // Blocks the bot can climb
    "dirt",
    "cobblestone",
    "stone"
  ],
  "treeTypes": [                        // Tree types to harvest
    "oak",
    "spruce",
    "birch"
  ]
}
```

### AI Chat Settings

```json
"aiChat": {
  "apiKey": "your-mistral-api-key"      // Mistral AI API key
}
```

## First Steps

### 1. Enable AI Chat

To enable the AI chat system:

```
aichat your-mistral-api-key
```

### 2. Test Basic Commands

Try these basic commands to ensure everything is working:

```
say Hello, world!
debug on
togglemsgs on
```

### 3. Follow a Player

To make the bot follow you or another player:

```
follow YourUsername
```

To stop following:

```
follow stop
```

### 4. Create Custom Commands

Add shortcuts for commands you use frequently:

```
custom add home /home
custom add spawn /spawn
```

### 5. Enable Anti-AFK

To prevent the bot from being kicked for inactivity:

```
antiafk 30
```

This will perform random movements every 30 seconds.

## Advanced Features

### AI Chat Interactions

Once AI chat is enabled, players can interact with the bot using natural language:

- "Can you follow me?"
- "Give me some diamonds"
- "What's in your inventory?"
- "Come over here"

### Advanced Mode

Activate enhanced capabilities with:

```
make fully advanced
```

This special command enables the bot to:
- Stop following if currently following a player
- Give specific items when requested
- Respond to complex multi-part requests

### Inventory Management

Check the bot's inventory:

```
custom add inv /inventory
```

Give items to players:

```
give PlayerName 5 diamond
```

## Troubleshooting

### Connection Issues

If the bot can't connect to the server:

1. Verify the server address and port in `config.json`
2. Check that the server allows offline-mode connections
3. Ensure the Minecraft version matches

### Command Errors

If commands aren't working:

1. Enable debug mode: `debug on`
2. Check the console for error messages
3. Verify command syntax with `help`

### AI Chat Problems

If AI chat isn't responding:

1. Verify your Mistral AI API key
2. Check network connectivity
3. Ensure the bot has successfully connected to the server

### Performance Issues

If the bot is lagging:

1. Reduce the follow interval in configuration
2. Disable unused features
3. Increase the cooldown values for auto-eat and other periodic actions

## Next Steps

After getting familiar with basic features, explore:

- Creating complex custom commands
- Setting up the web dashboard
- Configuring the tree farming system
- Exploring advanced pathfinding options

For more detailed information, check the other documentation files:
- [AI Chat System](AI_CHAT_SYSTEM.md)
- [Command System](COMMAND_SYSTEM.md)
- [Architecture](ARCHITECTURE.md)
