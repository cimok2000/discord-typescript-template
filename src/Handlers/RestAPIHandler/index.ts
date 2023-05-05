import { getTimers } from "@src/utils/timer";
import type discord from "discord.js";
import express from "express";
import http from "http";
import { StatusCodes } from "http-status-codes";
import { version } from "../../../package.json";
import type CommandHandler from "../CommandHandler";
import type DatabaseHandler from "../DatabaseHandler";
import { RestAPIInfo } from "../LogHandler";
import cors from "./middleware/cors";

export default class RestAPIHandler {
  public bot: discord.Client;
  public databaseHandler: DatabaseHandler;
  public commandHandler: CommandHandler;
  public port: number;
  public express: express.Express;
  public server: http.Server;

  constructor(bot: discord.Client, databaseHandler: DatabaseHandler, commandHandler: CommandHandler) {
    // Bot Client and Handlers
    this.bot = bot;
    this.databaseHandler = databaseHandler;
    this.commandHandler = commandHandler;
    // Express
    RestAPIInfo("Initializing RestAPI..");
    this.port = 5000;
    this.express = express();
    this.express.use(cors);
    this.express.use(express.json());
    // Express Routes
    this.express.get("/", (_, res) => {
      res.status(StatusCodes.OK).json({
        title: "Template Bot",
        version: version,
        routes: { status: "/status", timers: "/timers" },
      })
    })
    this.express.get("/status", (_, res) => {
      const status = {
        account: `${this.bot.user?.username}#${this.bot.user?.discriminator} (${this.bot.user?.id})`,
        status: `Online`,
        ping: this.bot.ws.ping,
        uptime: { seconds: this.bot.uptime! / 1000, days: this.bot.uptime! / 1000 / 60 / 60 / 24 },
        guilds: this.bot.guilds.cache.size,
        memory: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}`,
        version: version,
        apiVersion: `v1`,
        apiStatus: `Online`,
        apiUptime: { seconds: process.uptime(), days: process.uptime() / 60 / 60 / 24 },
      }
      res.status(StatusCodes.OK).json(status);
    });
    this.express.get("/timers", (_, res) => {
      res.status(StatusCodes.OK).json({
        timers: Array.from(getTimers().keys()),
      })
    });

    // Start Express Server
    this.server = http.createServer(this.express);
    this.express.listen(this.port, () => {
      RestAPIInfo(`RestAPI listening at http://localhost:${this.port}`);
    });
  }
}