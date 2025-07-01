import { inngest } from '../../inngest/client';
import { generateVibeCodingCarousel } from '../../services/carousel-generator.service';
import { ColorTemplate } from '../../types';
import { logger, LogType } from '../../utils/logger';
import { InstagramCanvasService } from '../../services/instagram-canvas.service';
import { Telegraf } from 'telegraf';

interface GenerateCarouselInput {
  topic: string;
  telegramUserId: number;
  messageId: number;
  colorTemplate: ColorTemplate;
}

export const generateCarousel = inngest.createFunction(
  { id: 'generate-carousel-from-topic', name: 'Generate Carousel from Topic' },
  { event: 'carousel/generate.request' },
  async ({ event, step }) => {
    const { topic, telegramUserId, colorTemplate } =
      event.data as GenerateCarouselInput;
    logger.info('Received job to generate carousel', {
      type: LogType.BUSINESS_LOGIC,
      data: event.data,
    });

    const bot = new Telegraf(process.env.BOT_TOKEN!);

    try {
      const result = await step.run('generate-vibe-coding-carousel', () => {
        return generateVibeCodingCarousel(topic, {
          style: colorTemplate,
        });
      });

      if (
        result.success &&
        result.data?.cards &&
        result.data.cards.length > 0
      ) {
        const instagramCanvasService = new InstagramCanvasService();

        const imageBuffers = await step.run('generate-image-buffer', () => {
          return instagramCanvasService.generateCarouselImages(
            result.data!.cards,
            undefined,
            result.data!.colorTemplate
          );
        });

        if (!imageBuffers || imageBuffers.length === 0) {
          throw new Error('Не удалось сгенерировать изображение для карусели');
        }

        const imageBuffer = imageBuffers[0];

        await bot.telegram.sendPhoto(
          telegramUserId,
          { source: imageBuffer },
          { caption: `✅ Ваша карусель на тему "${topic}" готова!` }
        );
        logger.info(`Carousel sent to user ${telegramUserId}`, {
          type: LogType.SYSTEM,
        });
      } else {
        const errorMessage =
          result.error || 'Не удалось сгенерировать контент для карусели.';
        await bot.telegram.sendMessage(telegramUserId, `❌ ${errorMessage}`);
      }
    } catch (error) {
      logger.error('Error in generateCarousel function', {
        type: LogType.ERROR,
        error,
      });
      await bot.telegram.sendMessage(
        telegramUserId,
        'Произошла критическая ошибка при создании вашей карусели.'
      );
      throw error;
    }

    return {
      message: `Carousel for topic "${topic}" generated and sent.`,
    };
  }
);
