import { Command } from "@src/types";
import { startTimer, stopTimer } from "@src/utils/timer";
import Discord, { SlashCommandBuilder } from "discord.js";

const CommandName: string = "stop";
const CommandDescription: string = "Stops a timer";

export const command = {
  data: new SlashCommandBuilder()
    .setName(CommandName)
    .setDescription(CommandDescription)
    .addStringOption(option => option.setName("name").setDescription("The name of the timer").setRequired(true)),
  execute: async (interaction: Discord.CommandInteraction, client: Discord.Client) => {
    const name = interaction.options.get("name")!.value as string;
    stopTimer(name);
    interaction.reply(`Timer ${name} has been stopped!`);
  }
}