import { inngest } from '../client';
import { logger } from '../../utils/logger';
import { User, users } from '../../db/schema';
// import { eq } from 'drizzle-orm'; // Пока не используется
import { db } from '../../db';
import { ColorTemplate } from '../../types';

export const HOURLY_CAROUSEL_CRON_EVENT = 'carousel/hourly.cron';

/**
 * 🕉️ Автоматическая отправка карусельки каждый час
 * 
 * Эта функция автоматически генерирует и отправляет карусельку
 * каждый час определенному пользователю (Гуру) для постоянного
 * вдохновения и изучения принципов VIBECODING.
 */
export const hourlyCarouselCron = inngest.createFunction(
  { 
    id: 'hourly-carousel-cron-v1',
    // Крон-расписание: каждый час в 0 минут
    concurrency: {
      limit: 1 // Только одна задача одновременно
    }
  },
  // Запускается каждый час
  { cron: '0 * * * *' },
  async ({ step }) => {
    logger.info('🕉️ Starting hourly carousel cron', { 
      timestamp: new Date().toISOString() 
    });

    // Получаем пользователя-Гуру (здесь нужно будет указать твой telegram_id)
    const guru = await step.run('fetch-guru-user', async () => {
      if (!db) throw new Error('Database not initialized');
      
      // TODO: Заменить на реальный telegram_id Гуру
      // Для начала попробуем найти первого пользователя в базе
      const result: User[] = await db
        .select()
        .from(users)
        .limit(1);
      
      return result[0];
    });

    if (!guru) {
      logger.warn('🚨 Guru user not found for hourly carousel');
      return { success: false, error: 'Guru user not found' };
    }

    // Генерируем тему для карусельки на основе времени дня
    const currentHour = new Date().getHours();
    const topic = await step.run('generate-topic', async () => {
      const topicsByTime = {
        morning: [
          'Утренние медитации для кодера',
          'Начинаем день с чистого кода',
          'Энергия утра в программировании',
          'Пробуждение сознания разработчика'
        ],
        day: [
          'Поток и концентрация в разработке',
          'Архитектурное мышление',
          'Чистые функции и ясность ума',
          'Рефакторинг как духовная практика'
        ],
        evening: [
          'Ретроспектива дня кодинга',
          'Завершение рабочего дня с благодарностью',
          'Мудрость накопленная за день',
          'Подготовка к новому циклу разработки'
        ],
        night: [
          'Размышления о коде перед сном',
          'Ночные инсайты программиста',
          'Архитектурные решения в тишине',
          'Подсознательное решение задач'
        ]
      };

      let timeOfDay: keyof typeof topicsByTime;
      if (currentHour >= 6 && currentHour < 12) {
        timeOfDay = 'morning';
      } else if (currentHour >= 12 && currentHour < 18) {
        timeOfDay = 'day';
      } else if (currentHour >= 18 && currentHour < 22) {
        timeOfDay = 'evening';
      } else {
        timeOfDay = 'night';
      }

      const topics = topicsByTime[timeOfDay];
      const randomTopic = topics[Math.floor(Math.random() * topics.length)];
      
      // Добавляем контекст языка программирования пользователя
      const languageContext = guru.language_code 
        ? ` в контексте ${guru.language_code}` 
        : ' в контексте TypeScript';
      
      return `${randomTopic}${languageContext}`;
    });

    // Отправляем событие для генерации карусели
    await step.sendEvent('send-hourly-carousel-event', {
      name: 'carousel/generate',
      data: {
        topic,
        chatId: guru.telegram_id,
        messageId: undefined, // Не отвечаем на конкретное сообщение
        colorTemplate: ColorTemplate.VIBRANT, // Можно варьировать по времени дня
        source: 'hourly-cron',
        hour: currentHour,
      },
    });

    logger.info(`🕉️ Hourly carousel sent to Guru ${guru.telegram_id}`, {
      topic,
      hour: currentHour,
      telegramId: guru.telegram_id
    });

    return { 
      success: true, 
      message: 'Hourly carousel scheduled successfully',
      topic,
      telegramId: guru.telegram_id,
      hour: currentHour
    };
  }
);
