import * as dotenv from 'dotenv';
import { Telegraf, session, Scenes, Context } from 'telegraf';
import { logger, LogLevel, LogType } from './utils/logger';
import { createFunctionalMemoryAdapter } from './adapters/functional-memory.js';
import { User } from './schemas';
import { errorHandler } from './middlewares/error-handler';
import { config } from './config';
import { setupCommands } from './commands';
import { setupFunctionalCommands } from './commands/functional-commands';
import { setupVibeCodingCommands } from './commands/vibecoding-commands';
import { BotContext } from './types';

// --- Типы Контекста и Сессии ---
export interface SessionData
  extends Scenes.SceneSession<Scenes.WizardSessionData> {
  user?: User;
}

export interface CustomContext extends Context {
  storage: any; // Compatible with both StorageAdapter and FunctionalMemoryAdapter
  session: SessionData;
  scene: Scenes.SceneContextScene<CustomContext, Scenes.WizardSessionData>;
}

let bot: Telegraf<CustomContext>;

// --- Middleware ---
async function ensureUserMiddleware(
  ctx: CustomContext,
  next: () => Promise<void>
) {
  if (!ctx.from?.id) {
    logger.warn('ensureUserMiddleware: Обновление без ctx.from.id.', {
      type: LogType.SYSTEM,
    });
    return;
  }
  const telegramId = ctx.from.id;

  if (!ctx.storage) {
    logger.error('ensureUserMiddleware: ctx.storage не инициализирован.', {
      type: LogType.SYSTEM,
    });
    if (ctx.reply) {
      await ctx
        .reply(
          'Произошла внутренняя ошибка (storage not init). Пожалуйста, попробуйте позже.'
        )
        .catch(() => {});
    }
    return;
  }

  try {
    let user = await ctx.storage.getUserByTelegramId(telegramId);

    if (!user) {
      logger.info(
        'ensureUserMiddleware: Пользователь ' +
          telegramId +
          ' не найден, создаем нового.',
        { type: LogType.USER_ACTION }
      );
      const username =
        ctx.from.username || ctx.from.first_name || 'User_' + telegramId;
      const userData: Partial<User> = {
        telegram_id: telegramId,
        username: username,
        first_name: ctx.from.first_name,
        last_name: ctx.from.last_name,
      };
      user = await ctx.storage.createUser(userData);

      if (user) {
        logger.info(
          'ensureUserMiddleware: Пользователь ' +
            telegramId +
            ' (' +
            user.username +
            ') успешно создан. ID: ' +
            user.id,
          { type: LogType.USER_ACTION }
        );
      } else {
        logger.error(
          'ensureUserMiddleware: createUser для ' +
            telegramId +
            ' вернул null/undefined.',
          { type: LogType.USER_ACTION }
        );
        if (ctx.reply) {
          await ctx
            .reply('Не удалось создать вашу учетную запись. Попробуйте позже.')
            .catch(() => {});
        }
        return;
      }
    } else {
      logger.debug(
        'ensureUserMiddleware: Пользователь ' +
          telegramId +
          ' (' +
          (user.username || 'N/A') +
          ') найден. ID: ' +
          user.id,
        { type: LogType.USER_ACTION }
      );
    }

    if (!ctx.session) {
      ctx.session = {} as SessionData;
    }
    ctx.session.user = user;
  } catch (error) {
    logger.error(
      'ensureUserMiddleware: Ошибка при работе с пользователем ' + telegramId,
      {
        error: error instanceof Error ? error : new Error(String(error)),
        type: LogType.USER_ACTION,
      }
    );
    if (ctx.reply) {
      await ctx
        .reply(
          'Произошла ошибка при проверке вашей учетной записи. Попробуйте позже.'
        )
        .catch(() => {});
    }
    return;
  }

  return next();
}

// --- Основная функция запуска бота ---
async function startBot() {
  dotenv.config();

  logger.configure({
    logToConsole: true,
    minLevel: LogLevel.DEBUG,
  });
  logger.info('Запуск бота...', { type: LogType.SYSTEM });

  const BOT_TOKEN = process.env.BOT_TOKEN || config.BOT_TOKEN;
  if (!BOT_TOKEN) {
    logger.fatal('BOT_TOKEN не найден в .env файле или конфигурации.', {
      type: LogType.SYSTEM,
    });
    process.exit(1);
  }

  bot = new Telegraf<CustomContext>(BOT_TOKEN);

  const storage = createFunctionalMemoryAdapter();
  try {
    logger.info('✅ Functional Memory Storage готово к использованию.', {
      type: LogType.SYSTEM,
    });
  } catch (error) {
    logger.fatal('Ошибка инициализации хранилища.', {
      error: error instanceof Error ? error : new Error(String(error)),
      type: LogType.SYSTEM,
    });
    process.exit(1);
  }

  bot.use(
    session({
      defaultSession: () => ({}) as SessionData,
    })
  );

  bot.use((ctx: CustomContext, next) => {
    ctx.storage = storage;
    return next();
  });

  bot.use(ensureUserMiddleware);

  // 4. Регистрация команд
  setupFunctionalCommands(bot);
  setupVibeCodingCommands(bot);

  bot.catch((err: any, ctx: BotContext) => {
    errorHandler(err, ctx);
  });
  logger.info('Telegraf global error handler registered.');

  logger.info('Запуск Telegraf...', { type: LogType.SYSTEM });

  try {
    if (process.env.NODE_ENV === 'development') {
      logger.info('Bot is running in development mode with polling.');
      await bot.telegram.deleteWebhook({ drop_pending_updates: true });
      await bot.launch();
      logger.info(`Bot @${bot.botInfo?.username} started! (Telegraf)`);
    } else {
      logger.info('Bot is running in production mode (webhook setup pending).');
      logger.warn(
        'Production mode with webhook is not fully implemented for Telegraf. Falling back to polling for now.'
      );
      await bot.telegram.deleteWebhook({ drop_pending_updates: true });
      await bot.launch();
      logger.info(`Bot @${bot.botInfo?.username} started! (Telegraf)`);
    }
  } catch (err) {
    logger.error('Error starting Telegraf bot', {
      error: err instanceof Error ? err : new Error(String(err)),
      type: LogType.SYSTEM,
    });
    process.exit(1);
  }

  logger.info('Telegraf bot setup complete. Waiting for messages...');
}

// Запускаем бота, только если файл выполняется напрямую
if (import.meta.main) {
  startBot().catch((error: unknown) => {
    logger.fatal('Критическая ошибка при запуске бота', {
      error: error instanceof Error ? error : new Error(String(error)),
      type: LogType.SYSTEM,
    });
    process.exit(1);
  });
}

process.once('SIGINT', () => {
  logger.info('SIGINT received, shutting down Telegraf bot gracefully...');
  if (bot) {
    bot.stop('SIGINT');
  }
  logger.info('Telegraf bot stopped.');
  process.exit(0);
});
process.once('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down Telegraf bot gracefully...');
  if (bot) {
    bot.stop('SIGTERM');
  }
  logger.info('Telegraf bot stopped.');
  process.exit(0);
});

export { bot };
