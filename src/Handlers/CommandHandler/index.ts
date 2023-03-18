import DiscordBot from "@src/main";
import { Command } from "@src/types";
import Discord, { REST, Routes } from "discord.js";
import fs from "fs";
import type DatabaseHandler from "../DatabaseHandler";
import { ApplicationError, ApplicationInfo } from "../LogHandler";

export default class CommandHandler {
  public commands: Discord.Collection<string, Command>;

  constructor(public client: DiscordBot, public databaseHandler: DatabaseHandler) {
    this.commands = new Discord.Collection();
    this.registerCommands(this.getCommandFiles(`${client.ABSOLUTE_PATH}/src/commands`));
  }

  public getCommandFiles = (directory: string, commands: string[] = []) => {
    const files = fs.readdirSync(directory);
    for (const file of files) {
      const path = `${directory}/${file}`;
      if (file.endsWith(".ts")) {
        ApplicationInfo(`Loading ${file} (${path})`);
        commands.push(path);
      } else if (fs.statSync(path).isDirectory()) {
        ApplicationInfo(`Loading folder ${path}`);
        this.getCommandFiles(path, commands);
      }
    }
    return commands;
  }

  public registerCommands = (paths: string[]) => {
    for (let i = 0; i < paths.length; i++) {
      this.registerCommand(paths[i]);
    }
  }

  public registerCommand = (path: string) => {
    const { command } = require(`${path}`) as {command: Command};
    this.commands.set(command.data.name, command);
  }

  public registerSlashCommands = async (global: boolean, guild?: Discord.Guild) => {
    const rest = new REST({ version: "10" }).setToken(this.client.DISCORD_TOKEN);
    const commands = this.commands.map((command) => command.data.toJSON());
    try {
      await rest.put(global ? Routes.applicationCommands(this.client.APPLICATION_ID) : Routes.applicationGuildCommands(this.client.APPLICATION_ID, guild!.id), { body: commands });
    } catch (error) {
      ApplicationError(error as string);
    };
    ApplicationInfo(`Registered ${commands.length} slash commands for ${global ? "global" : `guild ${guild!.name} (${guild!.id})`}..`);
  }

  public submitSlashCommands = async (guilds: Discord.Guild[]) => {
    if (this.client.APPLICATION_ENVIRONMENT === "production") {
      await this.registerSlashCommands(true);
    } else if (this.client.APPLICATION_ENVIRONMENT === "development") {
      Promise.all(guilds.map((guild) => this.registerSlashCommands(false, guild)));
    }
  }

  public parseCommand = async (interaction: Discord.CommandInteraction) => {
    if (interaction.user.bot) return;
    const command = this.commands.get(interaction.commandName);
    if (!command) return;
    command.execute(interaction, this.client, this.databaseHandler);
  }
}