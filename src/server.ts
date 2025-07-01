/**
 * HTTP Server для Bible VibeCoder
 *
 * Обеспечивает интеграцию между Telegram ботом и Inngest функциями
 * через HTTP endpoints. Сервер принимает webhook'и от Inngest и
 * обрабатывает события от Telegram бота.
 */

import express from 'express';
import { bot } from './bot';
import { initBot } from './bot';
import { config } from './config';
import { logger } from './utils/logger';
import { server as inngestServer } from './inngest';

const app = express();
const port = config.PORT || 3000;

// Инициализация бота
initBot(config.BOT_TOKEN);

// Использование webhook для бота
app.use(bot.webhookCallback('/secret-path'));

// Inngest endpoint
app.use('/api/inngest', inngestServer);

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
  bot.telegram.setWebhook(`${config.WEBHOOK_DOMAIN}/secret-path`);
});
