import { Command } from "@src/types";
import Discord, { SlashCommandBuilder } from "discord.js";

const CommandName: string = "status";
const CommandDescription: string = "Displays Bot Status"

export const command: Command = {
  data: new SlashCommandBuilder().setName(CommandName).setDescription(CommandDescription),
  execute: async (interaction: Discord.CommandInteraction, client: Discord.Client) => {
    interaction.reply({
      embeds: [
        new Discord.EmbedBuilder()
          .setTitle(`${client.user!.username}'s Status`)
          .setColor("#32B5FF")
          .addFields(
            { name: "Bot", value: `\`🟢 ONLINE\` - \`${client.ws.ping}ms\``, inline: true},
            { name: "Uptime", value: `<t:${parseInt((client.readyTimestamp! / 1000).toString())}:R>` }
          )
      ]
    })
  }
}