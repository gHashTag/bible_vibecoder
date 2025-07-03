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
const port = config.PORT || 8080;

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
  // Railway автоматически предоставляет URL через RAILWAY_STATIC_URL
  const webhookDomain = process.env.RAILWAY_STATIC_URL 
    ? `https://${process.env.RAILWAY_STATIC_URL}`
    : config.WEBHOOK_DOMAIN;
  
  if (!webhookDomain) {
    logger.error('WEBHOOK_DOMAIN or RAILWAY_STATIC_URL not set. Cannot configure webhook.', { 
      type: LogType.ERROR 
    });
    process.exit(1);
  }

  const webhookPath = '/secret-path';
  const webhookUrl = `${webhookDomain}${webhookPath}`;
  
  app.use(bot.webhookCallback(webhookPath));
  
  // Устанавливаем webhook с retry логикой
  bot.telegram.setWebhook(webhookUrl)
    .then(() => {
      logger.info(`Webhook successfully set to: ${webhookUrl}`, { 
        type: LogType.SYSTEM 
      });
    })
    .catch((error) => {
      logger.error(`Failed to set webhook: ${error.message}`, { 
        type: LogType.ERROR 
      });
      process.exit(1);
    });
    
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
