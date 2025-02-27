# 🧠 AI Chat System Documentation

## Overview

The AI Chat System is one of Humini's most advanced features, enabling natural language interactions between players and the bot. Powered by Mistral AI, the system can understand player intentions, respond conversationally, and execute complex commands based on natural language input.

## Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Player Input   │────▶│  Intent Analysis│────▶│  Action Handler │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                        │
                                                        ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│   Bot Response  │◀────│ Response Generator    │  Command System │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## Key Components

### Intent Analysis

The system uses Mistral AI to classify player messages into specific intents:

- `follow` - Request for the bot to follow a player
- `give_item` - Request for the bot to give an item
- `give_specific_item` - Request for a specific quantity of an item
- `come_here` - Request for the bot to move to the player
- `stop_following` - Request to stop following
- `inventory` - Request to see the bot's inventory
- `greeting` - Simple greeting or hello
- `other` - Any other conversation

### Action Handlers

Each intent has a dedicated handler function that executes the appropriate action:

- `handleFollowCommand` - Initiates following a player
- `handleGiveCommand` - Gives an item to a player
- `handleGiveSpecificItemCommand` - Gives a specific quantity of an item
- `handleComeHereCommand` - Moves to a player's location
- `handleStopFollowingCommand` - Stops following a player
- `handleInventoryCommand` - Lists inventory contents
- `handleGreetingCommand` - Responds with a greeting
- `handleAdvancedCommand` - Processes complex multi-part commands

### Item Extraction

The system includes sophisticated item extraction capabilities:

- `extractItemFromMessage` - Identifies item names in messages
- `extractSpecificItemDetails` - Extracts both item name and quantity

### Response Generation

The `generateAIResponse` function creates contextually appropriate responses to player messages that don't match specific intents.

## Usage

### Enabling AI Chat

```
aichat <your_mistral_api_key>
```

This command enables the AI chat system and stores the API key in the configuration file for future use.

### Disabling AI Chat

```
aichat off
```

### Advanced Mode

The special phrase "make fully advanced" activates enhanced capabilities:

```
make fully advanced
```

This command:
1. Stops any active following behavior
2. Analyzes the message for item requests
3. Gives specific items if mentioned
4. Enters an advanced interaction mode

## Technical Details

### API Integration

The system uses the Mistral AI API with the following models:

- `mistral-tiny` - Used for intent classification and item extraction
- Response temperature: 0.2-0.7 (varies by function)
- Max tokens: 10-100 (varies by function)

### Cooldown System

To prevent spam and API overuse:

- 3-second cooldown between AI responses
- Pending request tracking to avoid duplicate processing

### Error Handling

The system includes robust error handling:

- API connection failures
- Message parsing errors
- Command execution failures
- Item availability checks

## Examples

### Basic Interactions

| Player Message | Bot Response |
|----------------|--------------|
| "Hello there!" | "Hi there, PlayerName! What's up?" |
| "What's in your inventory?" | "My inventory: 64x cobblestone, 32x oak_log, 16x iron_ingot" |
| "Can you follow me?" | "I'm following you now, PlayerName!" |
| "Stop following me please" | "I've stopped following, PlayerName." |

### Item Requests

| Player Message | Bot Response |
|----------------|--------------|
| "Give me some diamonds" | "Here's your diamond, PlayerName!" |
| "I need 5 iron ingots" | "Here's your 5x iron_ingot, PlayerName!" |
| "Can I have some wood?" | "Here's your log, PlayerName!" |

### Advanced Commands

| Player Message | Bot Response |
|----------------|--------------|
| "make fully advanced and give me 10 diamonds" | "Here's your 10x diamond, PlayerName!" |
| "make fully advanced" | "I'm now in advanced mode, PlayerName. What would you like me to do?" |

## Extending the System

### Adding New Intents

1. Add the new intent to the system prompt in `analyzeMessageIntent`
2. Create a new handler function for the intent
3. Add the intent to the switch statement in `handleChat`

### Adding Item Mappings

Extend the `itemMappings` object in `extractItemFromMessage` and `extractSpecificItemDetails` to support more item name variations.

## Troubleshooting

### Common Issues

- **No Response**: Check API key validity and network connectivity
- **Incorrect Intent**: Adjust the system prompt for better classification
- **Item Not Found**: Add more item name mappings or improve extraction logic

### Debugging

Enable debug mode to see detailed logs:

```
debug on
```

This will show:
- Intent classification results
- API requests and responses
- Item extraction details
