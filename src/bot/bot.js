import bot from "../config/telegram.js";

import {
  adminMiddleware
} from "./middleware/admin.middleware.js";

import {
  startHandler
} from "./handlers/start.handler.js";

import {
  statusHandler
} from "./handlers/status.handler.js";

import {
  businessHandler
} from "./handlers/business.handler.js";

import {
  planHandler
} from "./handlers/plan.handler.js";

import {
  postsHandler
} from "./handlers/posts.handler.js";

bot.use(adminMiddleware);

bot.start(startHandler);

bot.command(
  "status",
  statusHandler
);

bot.command(
  "business",
  businessHandler
);

bot.command(
  "plan",
  planHandler
);

bot.command(
  "posts",
  postsHandler
);

bot.catch(
  async (error, ctx) => {
    console.error(
      "Telegram bot error:",
      error
    );

    try {
      await ctx.reply(
        "❌ خطایی در اجرای درخواست رخ داد."
      );
    } catch {
      // Ignore Telegram reply errors.
    }
  }
);

export default bot;