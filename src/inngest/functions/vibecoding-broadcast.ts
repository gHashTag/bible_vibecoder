import { inngest } from '../client';
import { logger } from '../../utils/logger';
import { User, users } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { db } from '../../db';
import { ColorTemplate } from '../../types';

export const VIBECODING_BROADCAST_EVENT = 'vibecoding/broadcast';

// TODO: Интерфейс для будущего использования
/*
interface BroadcastPayload {
  messageId: number;
  from: number;
}
*/

export const vibecodingBroadcast = inngest.createFunction(
  { id: 'vibecoding-broadcast-v3' },
  { event: VIBECODING_BROADCAST_EVENT },
  async ({ event, step }) => {
    logger.info('Starting broadcast', { data: event.data });
    const user = await step.run('fetch-user', async () => {
      if (!db) throw new Error('Database not initialized');
      const result: User[] = await db
        .select()
        .from(users)
        .where(eq(users.telegram_id, event.data.from))
        .limit(1);
      return result[0];
    });

    if (!user) {
      logger.warn('User not found for broadcast', { userId: event.data.from });
      return;
    }

    const topic = `Как ${(user.metadata as any)?.vibe || 'эффективно'} кодить на ${
      user.language_code || 'JavaScript'
    }`;

    // Вызываем функцию генерации карусели
    await step.sendEvent('send-carousel-event', {
      name: 'carousel/generate',
      data: {
        topic,
        chatId: user.telegram_id,
        messageId: event.data.messageId,
        colorTemplate: ColorTemplate.VIBRANT,
      },
    });

    logger.info(`Broadcast event sent for user ${user.telegram_id}`, {
      topic,
    });
  }
);
