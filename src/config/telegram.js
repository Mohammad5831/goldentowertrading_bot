import { Telegraf } from "telegraf";
import config from "./env.js";

const bot = new Telegraf(config.telegram.botToken);

export default bot;