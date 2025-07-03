/**
 * HTTP Server для Bible VibeCoder
 *
 * Обеспечивает интеграцию между Telegram ботом и Inngest функциями
 * через HTTP endpoints. Сервер принимает webhook'и от Inngest и
 * обрабатывает события от Telegram бота.
 */

import { initBot } from './bot';
import { logger, LogType } from './utils/logger';
import { config } from './config';
import express from 'express';
import { serve } from 'inngest/express';
import { inngest } from './inngest/client';
import functions from './inngest/functions';

// Инициализация бота
const bot = initBot(config.BOT_TOKEN);

const app = express();
const port = config.PORT || 3000;

app.use(express.json());

// Inngest endpoint
app.use(
  '/api/inngest',
  serve({
    client: inngest,
    functions,
  })
);

// Telegram webhook
// Устанавливаем вебхук только в окружении 'production'
if (process.env.NODE_ENV === 'production') {
  app.use(bot.webhookCallback('/secret-path'));
  bot.telegram.setWebhook(`${config.WEBHOOK_DOMAIN}/secret-path`);
  logger.info('Bot is running in webhook mode', { type: LogType.SYSTEM });
} else {
  logger.info('Bot is running in polling mode', { type: LogType.SYSTEM });
  bot.launch();
}

app.get('/', (_req, res) => {
  res.send('Vibecoding Bot is running!');
});

app.listen(port, () => {
  logger.info(`Server is listening on port ${port}`, { type: LogType.SYSTEM });
});
