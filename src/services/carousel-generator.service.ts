import { logger, LogType } from '../utils/logger';
import { ColorTemplate } from '../types';
import { VibeCodingContentService } from './vibecoding-content.service';

export interface TemplateDesign {
  background: string;
  textColor: string;
  font: string;
}

export const galaxySpiralBlur: TemplateDesign = {
  background:
    'https://cdn.discordapp.com/attachments/1258696805219434546/1258700257085755433/u2217837778_A_book_hanging_in_the_air_against_the_backdrop_of_c_bdaf4c83-c9af-457e-aba2-865b825fb4b6.png?ex=6688f288&is=6687a108&hm=b823e85a6745f9ccf41bc8748ac8c0a876a445a4a580662d55981665a3c00445&',
  textColor: '#FFFFFF',
  font: 'PlayfairDisplay-Bold',
};

export const vibrant: TemplateDesign = {
  background: '#ffde00',
  textColor: '#000000',
  font: 'Lato-Regular',
};

export const minimal: TemplateDesign = {
  background: '#f0f0f0',
  textColor: '#333333',
  font: 'Lato-Regular',
};

const templates: Record<ColorTemplate, TemplateDesign> = {
  [ColorTemplate.GALAXY_SPIRAL_BLUR]: galaxySpiralBlur,
  [ColorTemplate.VIBRANT]: vibrant,
  [ColorTemplate.MINIMAL]: minimal,
  [ColorTemplate.DOUGLAS_ADAMS]: vibrant, // Fallback, replace with actual
  [ColorTemplate.FRANK_HERBERT]: vibrant, // Fallback, replace with actual
  [ColorTemplate.NEON]: vibrant, // Fallback, replace with actual
  [ColorTemplate.CLASSIC_SERIF]: minimal, // Fallback, replace with actual
};

export async function generateVibeCodingCarousel(
  topic: string,
  options: {
    maxCards?: number;
    style?: ColorTemplate;
    includeCodeExamples?: boolean;
  }
) {
  logger.info('Запуск генерации карусели Vibecoding', {
    type: LogType.BUSINESS_LOGIC,
    data: { topic, options },
  });

  try {
    const vibeContentService = new VibeCodingContentService();
    const content = await vibeContentService.search({
      query: topic,
      max_results: options.maxCards || 5,
    });

    const colorTemplateKeys = Object.values(ColorTemplate);
    const currentTemplateKey =
      options.style ||
      colorTemplateKeys[Math.floor(Math.random() * colorTemplateKeys.length)];
    const selectedTemplate = templates[currentTemplateKey];

    if (!selectedTemplate) {
      throw new Error(`Не найден шаблон для стиля: ${currentTemplateKey}`);
    }

    logger.info('Контент для карусели успешно сгенерирован', {
      type: LogType.SUCCESS,
      data: { topic, count: content.length },
    });

    return {
      success: true,
      message: 'Карусель успешно сгенерирована',
      data: {
        colorTemplate: currentTemplateKey,
        cards: content,
      },
    };
  } catch (error) {
    logger.error('Ошибка при генерации карусели Vibecoding', {
      type: LogType.ERROR,
      error: error instanceof Error ? error : new Error(String(error)),
      data: { topic, options },
    });

    return {
      success: false,
      error: 'Ошибка при генерации карусели',
    };
  }
}
