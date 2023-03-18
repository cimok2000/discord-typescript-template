# Discord Bot Template built using Typescript

## About

This is a template for a Discord bot built using Typescript. It uses the [discord.js](https://discord.js.org/#/) library.

## Getting Started

**Node.js 16.9.0 or newer is required.**

```sh-session
npm i
yarn
pnpm i
```

### Configuration

Change the name in `package.json` to your bot's name.
Set the following environment variables in the .env file (copy the .env.example file and rename it to .env):
- `PRODUCTION_TOKEN` - Your bot's production token (for production bot)
- `DEVELOPMENT_TOKEN` - Your bot's development token (for development bot)
- `PRODUCTION_ID` - Your bot's production ID (for production bot)
- `DEVELOPMENT_ID` - Your bot's development ID (for development bot)
- `DB_NAME` - The name of the database
- `DB_PASS` - The password of the database
- `DB_HOST` - The host of the database

### Creating Commands

Create a new file in the `src/commands` directory. The file name should be the name of the command. For example, if you want to create a command called `ping`, create a file called `ping.ts` in the `src/commands` directory.

#### Command Structure

```ts
import { Command } from "@src/types";
import Discord, { SlashCommandBuilder } from "discord.js";

const CommandName: string = "{REPLACE_WITH_COMMAND_NAME}";
const CommandDescription: string = "{REPLACE_WITH_COMMAND_DESCRIPTION}";

export const command: Command = {
  data: new SlashCommandBuilder().setName(CommandName).setDescription(CommandDescription),
  execute: async (interaction: Discord.CommandInteraction, client: Discord.Client) => {
    // Command code goes here;
  }
}
```