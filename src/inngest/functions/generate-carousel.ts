import { inngest } from '../client';
import { CarouselGeneratorService } from '../../services/carousel-generator.service';
import { InstagramCanvasService } from '../../services/instagram-canvas.service';
import { Telegraf } from 'telegraf';
import { InputMediaPhoto } from 'telegraf/types';
import { logger, LogType } from '../../utils/logger';

// TODO: Интерфейс для будущего использования
/*
interface GenerateCarouselInput {
  topic: string;
  chatId: string;
  messageId?: number;
  colorTemplate?: ColorTemplate;
}
*/

export const generateCarousel = inngest.createFunction(
  { id: 'generate-carousel-v2' },
  { event: 'carousel/generate' },
  async ({ event, step }) => {
    const { topic, chatId, messageId } = event.data;
    logger.info(`Generating carousel for topic: ${topic}`, {
      type: LogType.SYSTEM,
    });

    const result = await step.run('generate-content', async () => {
      const generator = new CarouselGeneratorService(topic);
      return generator.generate();
    });

    if (!result.success) {
      logger.error('Failed to generate carousel content', {
        error: result.error,
      });
      await step.run('send-error-message', async () => {
        const bot = new Telegraf(process.env.BOT_TOKEN!);
        await bot.telegram.sendMessage(
          chatId,
          `Ошибка генерации контента: ${result.error}`
        );
      });
      return { success: false, error: result.error };
    }

    const { cards, colorTemplate } = result.data!;

    const imageBuffers = await Promise.all(
      cards.map((card: any, index: number) =>
        step.run(`generate-image-${index}`, async () => {
          const imageGenerator = new InstagramCanvasService(
            card,
            colorTemplate,
            index
          );
          return imageGenerator.renderToBuffer();
        })
      )
    );

    await step.run('send-carousel', async () => {
      const bot = new Telegraf(process.env.BOT_TOKEN!);
      const mediaGroup: InputMediaPhoto[] = imageBuffers.map(
        (buffer: any, index: number) => ({
          type: 'photo',
          media: { source: Buffer.from(buffer as any) }, // Восстанавливаем буфер
          caption: index === 0 ? cards[0].title : undefined,
        })
      );

      await bot.telegram.sendMediaGroup(chatId, mediaGroup, {
        reply_parameters: messageId ? { message_id: messageId } : undefined,
      });
    });

    logger.info(`Carousel sent to chat ${chatId}`, { type: LogType.SYSTEM });
    return { success: true, message: 'Carousel generated successfully' };
  }
);
