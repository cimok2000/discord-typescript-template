import type DatabaseHandler from "@src/Handlers/DatabaseHandler";
import Discord, { SlashCommandBuilder } from "discord.js";

export type Command = {
  data: SlashCommandBuilder; execute: (interaction: Discord.CommandInteraction, client: Discord.Client, databaseHandler?: DatabaseHandler) => any | Promise<any>;
}