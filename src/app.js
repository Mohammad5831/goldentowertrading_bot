import express from "express";

import config from "./config/env.js";

import {
    sequelize
} from "./database/index.js";

import bot from "./bot/bot.js";

import {
    initializeChannel
} from "./modules/channel/channel.service.js";

import {
    startWeeklyContentJob
} from "./jobs/weekly-content.job.js";

import {
    startPublishPostJob
} from "./jobs/publish-post.job.js";

import logger from "./utils/logger.js";

const app = express();

app.use(
    express.json()
);

app.get(
    "/health",
    async (req, res) => {
        try {
            await sequelize.authenticate();

            res.json({
                status: "ok",
                service: "goldentowertrading_bot",
                database: "connected",
                timestamp: new Date().toISOString()
            });
        } catch (error) {
            res.status(503).json({
                status: "error",
                database: "disconnected",
                message: error.message
            });
        }
    }
);

export async function startApp() {
    logger.info(
        "Starting Golden Tower bot..."
    );

    await sequelize.authenticate();

    logger.info(
        "Database connection established"
    );

    await sequelize.sync();

    logger.info(
        "Database synchronized"
    );

    await initializeChannel();

    logger.info(
        "Telegram channel initialized"
    );

    await bot.launch();

    logger.info(
        "Telegram bot started"
    );

    startWeeklyContentJob();

    logger.info(
        "Weekly content job started"
    );

    startPublishPostJob();

    logger.info(
        "Publish job started"
    );

    return app;
}

export default app;