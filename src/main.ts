require("dotenv").config();
import { ApplicationInfo } from "@src/Handlers/LogHandler";
import RestAPIHandler from '@src/Handlers/RestAPIHandler';
import Discord, { ChannelType, GatewayIntentBits, Partials } from "discord.js";
import { resolve } from 'path';
import CommandHandler from './Handlers/CommandHandler';
import DatabaseHandler from './Handlers/DatabaseHandler';
import { checkEnvironmentVariables, getApplicationID, getDiscordToken } from './utils';

export default class DiscordBot extends Discord.Client {
  // CONSTANT VARIABLES
  public APPLICATION_ENVIRONMENT: string;
  public APPLICATION_ID: string;
  public DISCORD_TOKEN: string;
  public ABSOLUTE_PATH: string;

  // HANDLERS
  public databaseHandler: DatabaseHandler;
  public commandHandler: CommandHandler;
  public restAPIHandler: RestAPIHandler;

  constructor() {
    checkEnvironmentVariables(["NODE_ENV", process.env.NODE_ENV === "production" ? "PRODUCTION_TOKEN" : "DEVELOPMENT_TOKEN", "DB_NAME", "DB_PASS", "DB_HOST", "PRODUCTION_ID", "DEVELOPMENT_ID"]);

    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping
      ],
      partials: [Partials.Channel, Partials.GuildMember, Partials.Message, Partials.Reaction, Partials.User],
    });

    // CONSTANT VARIABLES
    this.APPLICATION_ENVIRONMENT = process.env.NODE_ENV ? process.env.NODE_ENV : "development"; 
    this.APPLICATION_ID = getApplicationID(this.APPLICATION_ENVIRONMENT);
    this.DISCORD_TOKEN = getDiscordToken(this.APPLICATION_ENVIRONMENT);
    this.ABSOLUTE_PATH = resolve();
    
    // HANDLERS
    this.databaseHandler = new DatabaseHandler();
    this.commandHandler = new CommandHandler(this, this.databaseHandler);
    this.restAPIHandler = new RestAPIHandler(this, this.databaseHandler, this.commandHandler);

    ApplicationInfo(`Running in ${this.APPLICATION_ENVIRONMENT} mode..`);

    this.on("ready", () => {
      ApplicationInfo(`Bot logged in as ${this.user?.username}#${this.user?.discriminator} (${this.user?.id})`);

      const guilds = Array.from(this.guilds.cache.values());
      this.commandHandler.submitSlashCommands(guilds);
    });
    this.on("messageCreate", (message) => {
      if (message.author.bot) return;
      if (message.channel.type == ChannelType.DM) return;
    });
    this.on("interactionCreate", (interaction) => {
      if (!interaction.isCommand()) return;
      this.commandHandler.parseCommand(interaction);
    });

    this.login(this.DISCORD_TOKEN);
  }
}

new DiscordBot();
