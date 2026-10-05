import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  PORT: z.coerce.number().default(3000),

  TIMEZONE: z.string().default("Asia/Tehran"),

  TELEGRAM_BOT_TOKEN: z.string().min(1),
  TELEGRAM_CHANNEL_ID: z.string().min(1),
  TELEGRAM_ADMIN_ID: z.coerce.number(),

  OPENAI_API_KEY: z.string().min(1),
  OPENAI_MODEL: z.string().min(1),

  GOLDENTOWER_API_URL: z.string().url(),
  GOLDENTOWER_API_TOKEN: z.string().optional(),

  DATABASE_HOST: z.string().default("localhost"),
  DATABASE_PORT: z.coerce.number().default(3306),
  DATABASE_NAME: z.string().min(1),
  DATABASE_USER: z.string().min(1),
  DATABASE_PASSWORD: z.string(),

  WEEKLY_GENERATION_DAY: z.coerce
    .number()
    .min(0)
    .max(6)
    .default(6),

  WEEKLY_GENERATION_HOUR: z.coerce
    .number()
    .min(0)
    .max(23)
    .default(2),

  WEEKLY_GENERATION_MINUTE: z.coerce
    .number()
    .min(0)
    .max(59)
    .default(0)
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment variables:");

  console.error(
    parsed.error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message
    }))
  );

  process.exit(1);
}

const env = parsed.data;

export const config = {
  nodeEnv: env.NODE_ENV,

  server: {
    port: env.PORT
  },

  timezone: env.TIMEZONE,

  telegram: {
    botToken: env.TELEGRAM_BOT_TOKEN,
    channelId: env.TELEGRAM_CHANNEL_ID,
    adminId: env.TELEGRAM_ADMIN_ID
  },

  openai: {
    apiKey: env.OPENAI_API_KEY,
    model: env.OPENAI_MODEL
  },

  goldenTower: {
    apiUrl: env.GOLDENTOWER_API_URL,
    apiToken: env.GOLDENTOWER_API_TOKEN
  },

  database: {
    host: env.DATABASE_HOST,
    port: env.DATABASE_PORT,
    name: env.DATABASE_NAME,
    user: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD
  },

  weeklyGeneration: {
    day: env.WEEKLY_GENERATION_DAY,
    hour: env.WEEKLY_GENERATION_HOUR,
    minute: env.WEEKLY_GENERATION_MINUTE
  }
};

export default config;