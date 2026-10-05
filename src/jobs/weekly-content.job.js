import cron from "node-cron";

import config from "../config/env.js";

import {
  generateWeeklyPlan
} from "../modules/planning/weekly-planner.service.js";

import logger from "../utils/logger.js";

export function startWeeklyContentJob() {
  const {
    day,
    hour,
    minute
  } = config.weeklyGeneration;

  const expression =
    `${minute} ${hour} * * ${day}`;

  const job = cron.schedule(
    expression,
    async () => {
      logger.info(
        "Starting weekly content generation"
      );

      try {
        await generateWeeklyPlan();

        logger.info(
          "Weekly content generation completed"
        );
      } catch (error) {
        logger.error(
          {
            error: error.message
          },
          "Weekly content generation failed"
        );
      }
    },
    {
      timezone: config.timezone
    }
  );

  return job;
}