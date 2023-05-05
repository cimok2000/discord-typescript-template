import { Command } from "@src/types";
import { getTimers, startTimer } from "@src/utils/timer";
import Discord, { SlashCommandBuilder } from "discord.js";

const CommandName: string = "all";
const CommandDescription: string = "Display all timers";

export const command = {
  data: new SlashCommandBuilder()
    .setName(CommandName)
    .setDescription(CommandDescription),
  execute: async (interaction: Discord.CommandInteraction, client: Discord.Client) => {
    interaction.reply(`Timers: ${Array.from(getTimers().keys()).join(", ")}`);
  }
}