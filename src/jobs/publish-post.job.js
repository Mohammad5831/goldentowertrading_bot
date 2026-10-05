import cron from "node-cron";

import config from "../config/env.js";

import {
  publishScheduledPosts
} from "../modules/publishing/publishing.service.js";

import logger from "../utils/logger.js";

export function startPublishPostJob() {
  const job = cron.schedule(
    "* * * * *",
    async () => {
      try {
        const result =
          await publishScheduledPosts();

        if (result.published > 0) {
          logger.info(
            result,
            "Scheduled posts published"
          );
        }
      } catch (error) {
        logger.error(
          {
            error: error.message
          },
          "Publish job failed"
        );
      }
    },
    {
      timezone: config.timezone
    }
  );

  return job;
}