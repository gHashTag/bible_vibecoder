import { Telegraf, session } from 'telegraf';
import { logger, LogType } from './utils/logger';
import { setupFunctionalCommands } from './commands/functional-commands';
import { setupVibeCodingCommands } from './commands/vibecoding-commands';
import { BotContext } from './types';
import { errorHandler } from './middlewares/error-handler';

let bot: Telegraf<BotContext>;

export const initBot = (token: string): Telegraf<BotContext> => {
  if (!token) {
    throw new Error('BOT_TOKEN is required');
  }

  bot = new Telegraf<BotContext>(token);

  // 1. Логгер
  bot.use((_ctx, next) => {
    logger.info('Update received', { type: LogType.TELEGRAM_API });
    return next();
  });

  // 2. Сессии
  bot.use(session());

  // 3. Команды
  setupFunctionalCommands(bot);
  setupVibeCodingCommands(bot);

  // 4. Обработчик ошибок
  bot.catch((err: unknown, ctx: BotContext) => {
    errorHandler(err, ctx);
  });

  return bot;
};

export { bot };
