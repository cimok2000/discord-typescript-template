import { Command } from "@src/types";
import { startTimer } from "@src/utils/timer";
import Discord, { SlashCommandBuilder } from "discord.js";

const CommandName: string = "start";
const CommandDescription: string = "Starts a timer";

export const command = {
  data: new SlashCommandBuilder()
    .setName(CommandName)
    .setDescription(CommandDescription)
    .addStringOption(option => option.setName("name").setDescription("The name of the timer").setRequired(true))
    .addStringOption(option => option.setName("time").setDescription("The time to ping every day (17:28)").setRequired(true)),
  execute: async (interaction: Discord.CommandInteraction, client: Discord.Client) => {
    const name = interaction.options.get("name")!.value as string;
    const time = interaction.options.get("time")!.value as string;
    startTimer(name, time, interaction);
    interaction.reply(`Timer ${name} has been started!`);
  }
}