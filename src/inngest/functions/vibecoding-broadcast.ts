/**
 * 🎯 Inngest функция для рассылки контента Vibecoding
 */

import { inngest } from '../client';
import { NonRetriableError } from 'inngest';
import { bot } from '../../bot';
import { db } from '../../db';
import { eq } from 'drizzle-orm';
import { users, userSettings } from '../../db/schema';
import { logger } from '../../utils/logger';
import {
  VibeCodingContentService,
  ContentType,
} from '../../services/vibecoding-content.service';
import { generateVibeCodingCarousel } from '../../commands/vibecoding-commands';

const contentService = new VibeCodingContentService();

export const vibecodingBroadcastFunction = inngest.createFunction(
  { id: 'vibecoding-broadcast' },
  { event: 'vibecoding/broadcast' },
  async ({ event, step }) => {
    const { topic, contentType } = event.data;

    // Шаг 1: Получить список активных пользователей
    const activeUsers = await step.run('get-active-users', async () => {
      logger.info('📋 Получаем список активных пользователей для рассылки');

      if (!db) {
        throw new NonRetriableError('Database connection is not available');
      }

      const usersWithSettings = await db
        .select({
          id: users.id,
          telegram_id: users.telegram_id,
          username: users.username,
          first_name: users.first_name,
          notifications_enabled: userSettings.notifications_enabled,
          preferred_language: userSettings.preferred_language,
        })
        .from(users)
        .leftJoin(userSettings, eq(users.id, userSettings.user_id))
        .where(eq(userSettings.notifications_enabled, true));

      logger.info(
        `✅ Найдено ${usersWithSettings.length} активных пользователей`
      );
      return usersWithSettings;
    });

    if (activeUsers.length === 0) {
      logger.warn('⚠️ Нет активных пользователей для рассылки');
      return { success: true, message: 'Нет активных пользователей' };
    }

    // Шаг 2: Генерация контента
    let content: any;
    let mediaGroup: any[] = [];

    if (contentType === ContentType.CAROUSEL) {
      content = await step.run('generate-carousel', async () => {
        logger.info(`🎨 Генерируем карусель для темы: ${topic}`);

        const carouselResult = await generateVibeCodingCarousel(topic, {
          maxCards: 7,
          style: 'vibrant',
          includeCodeExamples: true,
        });

        if (!carouselResult.success) {
          throw new NonRetriableError(
            `Не удалось сгенерировать карусель: ${carouselResult.error}`
          );
        }

        return carouselResult;
      });

      // Шаг 3: Подготовка медиа-группы для карусели
      mediaGroup = await step.run('prepare-media-group', async () => {
        logger.info('📸 Подготавливаем медиа-группу для рассылки');

        if (!content.carouselImages || content.carouselImages.length === 0) {
          throw new NonRetriableError('Нет изображений для рассылки');
        }

        // Конвертируем base64 обратно в Buffer для Telegram API
        const mediaItems = content.carouselImages.map(
          (base64Image: string, index: number) => {
            // Извлекаем base64 данные без префикса
            const base64Data = base64Image.replace(
              /^data:image\/png;base64,/,
              ''
            );
            const buffer = Buffer.from(base64Data, 'base64');

            return {
              type: 'document' as const,
              media: { source: buffer },
              caption:
                index === 0 ? `🎯 ${topic}\n\n${content.message}` : undefined,
            };
          }
        );

        logger.info(`✅ Подготовлено ${mediaItems.length} медиа-файлов`);
        return mediaItems;
      });
    } else {
      // Для других типов контента (текст, видео и т.д.)
      content = await step.run('generate-content', async () => {
        logger.info(
          `📝 Генерируем контент типа ${contentType} для темы: ${topic}`
        );

        const generatedContent = await contentService.generateContent(
          topic,
          contentType
        );

        return {
          success: true,
          message: generatedContent.title,
          data: generatedContent,
        };
      });
    }

    // Шаг 4: Рассылка контента
    const results = await step.run('broadcast-content', async () => {
      logger.info(
        `📤 Начинаем рассылку контента ${activeUsers.length} пользователям`
      );

      const sendResults = [];

      for (const user of activeUsers) {
        try {
          if (contentType === ContentType.CAROUSEL && mediaGroup.length > 0) {
            // Отправляем карусель как медиа-группу
            await bot.telegram.sendMediaGroup(
              user.telegram_id as number,
              mediaGroup
            );
          } else {
            // Отправляем текстовое сообщение
            await bot.telegram.sendMessage(
              user.telegram_id as number,
              `🎯 ${topic}\n\n${content.message || content.data?.title || 'Новый контент от Vibecoding!'}`,
              { parse_mode: 'HTML' }
            );
          }

          sendResults.push({
            user_id: user.telegram_id,
            success: true,
          });

          logger.info(
            `✅ Контент отправлен пользователю ${user.username || user.telegram_id}`
          );
        } catch (error) {
          logger.error(
            `❌ Ошибка отправки пользователю ${user.username || user.telegram_id}`,
            {
              error: error instanceof Error ? error : new Error(String(error)),
            }
          );

          sendResults.push({
            user_id: user.telegram_id,
            success: false,
            error: error instanceof Error ? error.message : String(error),
          });
        }

        // Небольшая задержка между отправками
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      return sendResults;
    });

    // Подсчет результатов
    const successCount = results.filter(r => r.success).length;
    const failCount = results.filter(r => !r.success).length;

    logger.info(
      `📊 Рассылка завершена: ${successCount} успешно, ${failCount} ошибок`
    );

    return {
      success: true,
      message: `Рассылка завершена: ${successCount}/${activeUsers.length} пользователей`,
      stats: {
        total: activeUsers.length,
        success: successCount,
        failed: failCount,
        contentType,
        topic,
      },
    };
  }
);
