import { VibeCodingContentService } from './vibecoding-content.service';
import { logger, LogType } from '../utils/logger';
import { CarouselCard, ColorTemplate, Vibe, VibeCodingStyle } from '../types';

export class CarouselGeneratorService {
  private topic: string;
  private style: VibeCodingStyle;

  constructor(
    topic: string,
    _vibe: Vibe = 'zen',
    style: VibeCodingStyle = 'minimalist'
  ) {
    this.topic = topic;
    this.style = style;
  }

  public async generate(): Promise<{
    success: boolean;
    error?: string;
    data?: { colorTemplate: ColorTemplate; cards: CarouselCard[] };
  }> {
    try {
      const vibeContentService = new VibeCodingContentService();

      const content = await vibeContentService.search({ query: this.topic, max_results: 5 });
      if (!content || content.length === 0) {
        return { success: false, error: 'No content generated' };
      }
      const cards: CarouselCard[] = content.map((c, index) => ({
        id: `card_${index}`,
        title: c.title,
        content: c.content,
        summary: c.content.substring(0, 100) + '...',
        category: 'vibecoding',
        tags: ['vibecoding', 'meditation'],
        sourceFile: 'generated',
        relevanceScore: 8.5,
      }));

      logger.info('Carousel content generated', { type: LogType.SYSTEM });

      const colorTemplate =
        Object.values(ColorTemplate)[
          Math.floor(Math.random() * Object.values(ColorTemplate).length)
        ];

      return {
        success: true,
        data: {
          colorTemplate: colorTemplate,
          cards: cards,
        },
      };
    } catch (error) {
      logger.error('Error generating Vibecoding carousel', {
        type: LogType.ERROR,
        error: error instanceof Error ? error : new Error(String(error)),
        data: { topic: this.topic, style: this.style },
      });

      return {
        success: false,
        error: 'Error generating carousel',
      };
    }
  }
}

// Экспорт функции для совместимости
export async function generateVibeCodingCarousel(
  topic: string,
  vibe: Vibe = 'zen',
  style: VibeCodingStyle = 'minimalist'
) {
  const generator = new CarouselGeneratorService(topic, vibe, style);
  return generator.generate();
}
