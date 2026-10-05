# Golden Tower Trading Bot

Automated content generation and publishing system for the Golden Tower Telegram channel.

Golden Tower Trading Bot is a Node.js-based automation system designed to manage the complete content lifecycle of a business Telegram channel — from collecting business and product information to generating weekly content with AI, scheduling posts, and publishing them automatically.

---

## Overview

The system combines:

* Golden Tower business information
* Telegram channel information
* Golden Tower product data
* Previously published content
* AI-powered content generation
* Content validation
* Weekly content planning
* Automatic scheduling
* Automatic Telegram publishing

The main goal is to create a reliable content automation pipeline without requiring manual content creation every week.

---

## Main Workflow

```text
Business Profile
       │
       ▼
Telegram Channel Profile
       │
       ▼
Golden Tower Product API
       │
       ▼
Recent Published Posts
       │
       ▼
OpenAI
       │
       ▼
Weekly Content Plan
       │
       ▼
Content Validation
       │
       ▼
MySQL
       │
       ▼
Scheduled Posts
       │
       ▼
Telegram Publisher
       │
       ▼
Golden Tower Telegram Channel
```

---

# Features

## Business Profile

The system maintains a centralized business profile containing information such as:

* Business name
* Industry
* Description
* Location
* Website
* Target audience
* Products
* Services
* Strengths
* Business values
* Brand tone
* Content rules
* Forbidden topics
* Call to action
* Default hashtags

The Business Profile acts as the main source of truth for AI-generated content.

---

## Telegram Channel Synchronization

The bot automatically retrieves Telegram channel information including:

* Channel ID
* Channel username
* Channel title
* Channel description
* Member count

This information is stored in the `ChannelProfile` model and can be used as part of the AI generation context.

---

## AI Content Generation

The system uses OpenAI to generate weekly Telegram content.

Each weekly generation produces exactly:

```text
7 posts
```

The content can contain different categories:

* Product
* Educational
* Commercial
* Brand
* Industry
* Engagement

The AI is instructed to maintain variety and avoid repetitive content.

---

## Content Safety Rules

The AI is explicitly instructed not to invent:

* Product prices
* Discounts
* Product specifications
* Product availability
* Unsupported claims
* Fake promotions
* Unverified business information

Product-related content should be based on information retrieved from the official Golden Tower API.

---

## Product-Aware Content

When the AI creates product-related content, it can reference a real product ID from the available Golden Tower product catalog.

The system validates generated product IDs before storing the content.

Invalid product IDs are rejected from product usage.

---

## Weekly Planning

The system automatically creates a content plan for the next week.

Default generation schedule:

```text
Day: Saturday
Time: 02:00
Timezone: Asia/Tehran
```

The generated weekly plan contains seven scheduled posts.

---

## Automatic Publishing

Generated posts are automatically scheduled.

Default publishing time:

```text
18:00
```

Posts are checked every minute.

When a scheduled post reaches its publishing time, the bot sends it to the configured Telegram channel.

---

# Technology Stack

## Backend

* Node.js
* Express
* JavaScript
* ES Modules

## Database

* MySQL
* Sequelize ORM

## Telegram

* Telegram Bot API
* Telegraf

## Artificial Intelligence

* OpenAI API

## Scheduling

* node-cron
* Luxon

## Validation

* Zod

## Logging

* Pino
* pino-pretty

---

# Project Architecture

```text
goldentowertrading_bot/
│
├── src/
│   ├── app.js
│   ├── server.js
│
│   ├── config/
│   │   ├── env.js
│   │   ├── database.js
│   │   └── telegram.js
│
│   ├── database/
│   │   ├── models/
│   │   │   ├── BusinessProfile.js
│   │   │   ├── ChannelProfile.js
│   │   │   ├── ContentPlan.js
│   │   │   ├── ContentGeneration.js
│   │   │   └── Post.js
│   │   └── index.js
│
│   ├── integrations/
│   │   ├── telegram/
│   │   │   ├── telegram.service.js
│   │   │   ├── channel.service.js
│   │   │   └── publisher.service.js
│   │   │
│   │   ├── openai/
│   │   │   ├── openai.service.js
│   │   │   └── prompts.js
│   │   │
│   │   └── goldentower/
│   │       └── api.service.js
│
│   ├── modules/
│   │   ├── business/
│   │   │   └── business-profile.service.js
│   │   │
│   │   ├── channel/
│   │   │   └── channel.service.js
│   │   │
│   │   ├── content/
│   │   │   ├── content.service.js
│   │   │   └── content.validator.js
│   │   │
│   │   ├── planning/
│   │   │   └── weekly-planner.service.js
│   │   │
│   │   └── publishing/
│   │       └── publishing.service.js
│
│   ├── jobs/
│   │   ├── weekly-content.job.js
│   │   └── publish-post.job.js
│
│   ├── bot/
│   │   ├── bot.js
│   │   │
│   │   ├── middleware/
│   │   │   └── admin.middleware.js
│   │   │
│   │   └── handlers/
│   │       ├── start.handler.js
│   │       ├── status.handler.js
│   │       ├── business.handler.js
│   │       ├── plan.handler.js
│   │       └── posts.handler.js
│
│   └── utils/
│       ├── logger.js
│       └── dates.js
│
├── migrations/
│   ├── 001-create-business-profiles.js
│   ├── 002-create-channel-profiles.js
│   ├── 003-create-content-generations.js
│   ├── 004-create-content-plans.js
│   └── 005-create-posts.js
│
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

# Architecture Layers

The project is divided into several logical layers.

## Config

Responsible for:

* Environment variables
* Database configuration
* Telegram configuration

```text
src/config/
```

---

## Database

Responsible for:

* Sequelize connection
* Database models
* Model relationships

```text
src/database/
```

Main models:

```text
BusinessProfile
ChannelProfile
ContentGeneration
ContentPlan
Post
```

---

## Integrations

Contains external service integrations.

```text
src/integrations/
```

### Telegram

Handles:

* Telegram API
* Channel information
* Message publishing

### OpenAI

Handles:

* Prompt generation
* AI requests
* Structured AI responses

### Golden Tower API

Handles:

* Product retrieval
* Product lookup
* Communication with the Golden Tower backend API

---

## Modules

Contains the application's business logic.

```text
src/modules/
```

### Business

Manages the Business Profile.

### Channel

Manages Telegram channel information.

### Content

Handles:

* Content retrieval
* Content validation

### Planning

Responsible for weekly content generation.

### Publishing

Responsible for publishing scheduled posts.

---

## Jobs

Contains scheduled background jobs.

```text
src/jobs/
```

### Weekly Content Job

Generates the next week's content.

### Publish Post Job

Checks scheduled posts every minute and publishes due posts.

---

## Bot

Contains the Telegram administration interface.

```text
src/bot/
```

The bot provides administrative commands for monitoring the system.

---

# Database Structure

## BusinessProfile

Stores the identity and content strategy of Golden Tower.

```text
BusinessProfile
│
├── name
├── legalName
├── industry
├── description
├── location
├── website
├── phone
├── targetAudience
├── products
├── services
├── strengths
├── values
├── tone
├── contentRules
├── forbiddenTopics
├── cta
├── hashtags
└── active
```

---

## ChannelProfile

Stores information about the Telegram channel.

```text
ChannelProfile
│
├── telegramChatId
├── username
├── title
├── description
├── memberCount
├── language
├── contentStyle
├── targetAudience
└── postingFrequency
```

---

## ContentGeneration

Stores every AI generation process.

```text
ContentGeneration
│
├── model
├── prompt
├── response
├── status
└── error
```

Possible statuses:

```text
processing
completed
failed
```

---

## ContentPlan

Represents a weekly content plan.

```text
ContentPlan
│
├── weekStart
├── weekEnd
├── status
└── generationId
```

Possible statuses:

```text
generating
generated
active
completed
failed
```

Each week can only have one content plan.

---

## Post

Represents an individual Telegram post.

```text
Post
│
├── contentPlanId
├── type
├── title
├── caption
├── hashtags
├── mediaType
├── mediaUrl
├── scheduledAt
├── publishedAt
├── telegramMessageId
├── status
└── error
```

Possible statuses:

```text
draft
scheduled
publishing
published
failed
cancelled
```

---

# Content Generation Flow

Every week the following process occurs.

```text
1. Scheduler starts
        ↓
2. Load Business Profile
        ↓
3. Load Telegram Channel Profile
        ↓
4. Fetch Golden Tower products
        ↓
5. Load recent posts
        ↓
6. Build AI context
        ↓
7. Send context to OpenAI
        ↓
8. Receive 7 posts
        ↓
9. Validate AI response
        ↓
10. Validate product IDs
        ↓
11. Create Content Plan
        ↓
12. Create 7 Posts
        ↓
13. Schedule posts
        ↓
14. Save everything in MySQL
```

---

# Publishing Flow

```text
Every minute
     │
     ▼
Find scheduled posts
     │
     ▼
scheduledAt <= current time
     │
     ▼
Publish to Telegram
     │
     ▼
Telegram message ID
     │
     ▼
Update Post
     │
     ├── published
     │
     └── failed
```

---

# Telegram Commands

The bot currently provides the following administrative commands.

## `/start`

Displays the available commands.

```text
/start
```

---

## `/status`

Displays the current system status.

```text
/status
```

Example information:

```text
Latest content plan
Plan status
Scheduled posts
Published posts
Failed posts
```

---

## `/business`

Displays the current Business Profile.

```text
/business
```

---

## `/plan`

Displays the latest weekly content plan.

```text
/plan
```

---

## `/posts`

Displays the latest generated posts.

```text
/posts
```

---

# Environment Configuration

Create a `.env` file in the project root.

```env
NODE_ENV=development

PORT=3000

TIMEZONE=Asia/Tehran

TELEGRAM_BOT_TOKEN=
TELEGRAM_CHANNEL_ID=@goldentowerbojnourd
TELEGRAM_ADMIN_ID=

OPENAI_API_KEY=
OPENAI_MODEL=

GOLDENTOWER_API_URL=
GOLDENTOWER_API_TOKEN=

DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_NAME=goldentower_bot
DATABASE_USER=root
DATABASE_PASSWORD=

WEEKLY_GENERATION_DAY=6
WEEKLY_GENERATION_HOUR=2
WEEKLY_GENERATION_MINUTE=0
```

---

# Environment Variables

| Variable                   | Description                      |
| -------------------------- | -------------------------------- |
| `NODE_ENV`                 | Application environment          |
| `PORT`                     | HTTP server port                 |
| `TIMEZONE`                 | Application timezone             |
| `TELEGRAM_BOT_TOKEN`       | Telegram bot token               |
| `TELEGRAM_CHANNEL_ID`      | Target Telegram channel          |
| `TELEGRAM_ADMIN_ID`        | Telegram administrator ID        |
| `OPENAI_API_KEY`           | OpenAI API key                   |
| `OPENAI_MODEL`             | OpenAI model used for generation |
| `GOLDENTOWER_API_URL`      | Golden Tower API base URL        |
| `GOLDENTOWER_API_TOKEN`    | Optional Golden Tower API token  |
| `DATABASE_HOST`            | MySQL host                       |
| `DATABASE_PORT`            | MySQL port                       |
| `DATABASE_NAME`            | MySQL database name              |
| `DATABASE_USER`            | MySQL username                   |
| `DATABASE_PASSWORD`        | MySQL password                   |
| `WEEKLY_GENERATION_DAY`    | Weekly generation day            |
| `WEEKLY_GENERATION_HOUR`   | Weekly generation hour           |
| `WEEKLY_GENERATION_MINUTE` | Weekly generation minute         |

---

# Installation

Clone the repository:

```bash
git clone https://github.com/Mohammad5831/goldentowertrading_bot.git
```

Enter the project:

```bash
cd goldentowertrading_bot
```

Install dependencies:

```bash
pnpm install
```

---

# Database Setup

Create the MySQL database:

```sql
CREATE DATABASE goldentower_bot
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
```

Configure the database credentials in `.env`.

Example:

```env
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_NAME=goldentower_bot
DATABASE_USER=root
DATABASE_PASSWORD=your_password
```

---

# Run the Application

Development:

```bash
pnpm dev
```

Production:

```bash
pnpm start
```

---

# Health Check

The application exposes:

```text
GET /health
```

Example:

```bash
curl http://localhost:3000/health
```

Successful response:

```json
{
  "status": "ok",
  "service": "goldentowertrading_bot",
  "database": "connected",
  "timestamp": "2026-01-01T00:00:00.000Z"
}
```

---

# Scheduling

The system uses `node-cron`.

## Weekly Generation

Default:

```text
Saturday at 02:00
```

Timezone:

```text
Asia/Tehran
```

Configuration:

```env
WEEKLY_GENERATION_DAY=6
WEEKLY_GENERATION_HOUR=2
WEEKLY_GENERATION_MINUTE=0
```

The generated content is for the following week.

---

## Daily Publishing

Posts are currently scheduled for:

```text
18:00
```

The publishing worker runs every minute:

```text
* * * * *
```

The worker checks for posts whose:

```text
status = scheduled
```

and:

```text
scheduledAt <= current time
```

---

# Content Strategy

The generated weekly content is designed to maintain a balance between different types of content.

Possible distribution:

```text
Product
Educational
Industry
Brand
Commercial
Engagement
```

The exact distribution is determined by the AI according to:

* Business Profile
* Channel Profile
* Available products
* Previous posts
* Content rules

The system should avoid turning the Telegram channel into a continuous stream of advertisements.

---

# AI Prompt Strategy

The AI receives several context sources.

```text
Business Profile
+
Channel Profile
+
Product Catalog
+
Recent Posts
```

The Business Profile defines the brand identity.

The Channel Profile defines the communication context.

The product catalog provides verified product information.

Recent posts help prevent repetitive content.

---

# Product Data Policy

Product information should come from the Golden Tower API.

The AI should not independently invent:

```text
Price
Specifications
Availability
Discount
Technical properties
Product names
Product IDs
```

When product information is required, the system should prefer verified API data.

---

# Security

Never commit sensitive credentials.

The following files and values must remain private:

```text
.env
TELEGRAM_BOT_TOKEN
OPENAI_API_KEY
DATABASE_PASSWORD
GOLDENTOWER_API_TOKEN
```

The public repository should only contain:

```text
.env.example
```

Never put real credentials inside:

* Source code
* README
* JSON files
* Configuration files
* Git history

If a secret has previously been committed to Git, it should be revoked and regenerated even after removing the file from the latest commit.

---

# Error Handling

The system stores errors for failed operations.

For posts:

```text
Post.error
```

For AI generations:

```text
ContentGeneration.error
```

Failed posts can be identified using:

```text
status = failed
```

This allows failed operations to be investigated without losing the original database record.

---

# Logging

The project uses Pino for application logging.

Development logs are formatted using:

```text
pino-pretty
```

Important operations are logged, including:

* Application startup
* Database connection
* Telegram synchronization
* Weekly generation
* AI generation failures
* Post publishing
* Publishing failures
* Shutdown

---

# Timezone Handling

The application uses:

```text
Asia/Tehran
```

for scheduling.

Luxon is used to avoid relying on the operating system's local timezone.

Scheduled dates are stored as UTC-compatible JavaScript dates while business scheduling is calculated using the configured application timezone.

---

# ES Modules

The project uses JavaScript ES Modules.

All source files use:

```js
import ...
```

and:

```js
export ...
```

The project does not use:

```js
require()
```

or:

```js
module.exports
```

The `package.json` contains:

```json
{
  "type": "module"
}
```

---

# Development Principles

The project follows these principles:

### Separation of concerns

External APIs, database models, business logic, scheduled jobs and Telegram handlers are separated.

### Centralized configuration

Environment variables are handled through:

```text
src/config/env.js
```

### Centralized business context

The Business Profile acts as the source of truth for content generation.

### Database persistence

Generated content is stored before publication.

### Scheduled publishing

Content generation and publishing are separate processes.

### External integrations

External APIs are isolated under:

```text
src/integrations/
```

---

# Future Improvements

The current architecture is designed to support additional features without changing the core structure.

Potential future improvements include:

* Content approval workflow
* Admin dashboard
* Automatic product image retrieval
* AI-generated media suggestions
* Product-specific content templates
* Content analytics
* Telegram engagement analytics
* Post performance tracking
* Automatic content regeneration
* Failed post retry system
* Multiple Telegram channels
* Multiple business profiles
* Content calendar UI
* AI-based content quality scoring
* Duplicate content detection
* Channel style analysis
* Automatic media selection
* BullMQ/Redis job processing
* Docker deployment
* Production migration runner

---

# Future Media Pipeline

A future version can connect AI content generation with official product images.

The intended architecture is:

```text
OpenAI
   │
   ▼
Product ID
   │
   ▼
Golden Tower API
   │
   ▼
Official Product Image
   │
   ▼
Telegram Publisher
```

This prevents the system from using arbitrary or AI-generated product images when an official product image is available.

---

# Deployment Architecture

A production deployment can use:

```text
                    ┌──────────────────┐
                    │      Nginx       │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │   Node.js App    │
                    └────────┬─────────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
          MySQL          Telegram         OpenAI
              │
              ▼
       Golden Tower API
```

---

# Project Status

Current system architecture:

```text
Backend
    ✓ Node.js
    ✓ Express
    ✓ ES Modules

Database
    ✓ MySQL
    ✓ Sequelize
    ✓ UUID-based entities

Telegram
    ✓ Telegraf
    ✓ Channel synchronization
    ✓ Automatic publishing
    ✓ Admin commands

AI
    ✓ OpenAI integration
    ✓ Structured JSON output
    ✓ Weekly content generation
    ✓ Product-aware generation

Automation
    ✓ Weekly generation
    ✓ Scheduled publishing
    ✓ Timezone-aware scheduling

Validation
    ✓ Environment validation
    ✓ Content validation
    ✓ Product ID validation
```

---

# License

This project is private and proprietary software developed for Golden Tower.

Unauthorized copying, redistribution or commercial use is not permitted.
