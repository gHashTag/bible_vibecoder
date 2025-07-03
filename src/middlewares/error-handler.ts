import { BotContext } from '../types';
import { logger, LogType } from '../utils/logger';

export const errorHandler = (err: unknown, ctx: BotContext): void => {
  const defaultMessage = 'Произошла ошибка, попробуйте еще раз позже.';

  logger.error(`Telegraf error for ${ctx.updateType}`, {
    error: err instanceof Error ? err : new Error(String(err)),
    type: LogType.ERROR,
    data: {
      update: ctx.update,
      from: ctx.from,
      chat: ctx.chat,
    },
  });

  if (ctx.reply && !ctx.webhookReply && typeof ctx.reply === 'function') {
    ctx.reply(defaultMessage).catch((replyError: unknown) => {
      logger.error('Failed to send error message to user', {
        error:
          replyError instanceof Error
            ? replyError
            : new Error(String(replyError)),
        type: LogType.SYSTEM,
      });
    });
  }
};
