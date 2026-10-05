import app, {
  startApp
} from "./app.js";

import config from "./config/env.js";

import bot from "./bot/bot.js";

import logger from "./utils/logger.js";

let server;

async function bootstrap() {
  await startApp();

  server = app.listen(
    config.server.port,
    () => {
      logger.info(
        {
          port: config.server.port
        },
        "HTTP server started"
      );
    }
  );
}

async function shutdown(signal) {
  logger.info(
    { signal },
    "Shutdown signal received"
  );

  try {
    bot.stop(signal);

    if (server) {
      server.close(() => {
        logger.info(
          "HTTP server closed"
        );

        process.exit(0);
      });
    } else {
      process.exit(0);
    }
  } catch (error) {
    logger.error(
      {
        error: error.message
      },
      "Shutdown failed"
    );

    process.exit(1);
  }
}

process.once(
  "SIGINT",
  () => shutdown("SIGINT")
);

process.once(
  "SIGTERM",
  () => shutdown("SIGTERM")
);

bootstrap().catch(
  (error) => {
    logger.fatal(
      {
        error: error.message,
        stack: error.stack
      },
      "Application startup failed"
    );

    process.exit(1);
  }
);