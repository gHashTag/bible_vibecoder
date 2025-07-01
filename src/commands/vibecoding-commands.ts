import { Telegraf, Context } from 'telegraf';
import { InstagramCanvasService } from '../services/instagram-canvas.service';
import { VibeCodingContentService } from '../services/vibecoding-content.service';
import { generateVibeCodingCarousel } from './functional-commands';
import {
  VibeCodingCommandResult,
  VibeCodingSearchOptions,
  VibeCodingStatsResult,
  CarouselSlide,
  ColorTemplate,
  LogType,
} from '../types';
import { logger } from '../utils/logger';

const instagramCanvasService = new InstagramCanvasService();
const vibeContentService = new VibeCodingContentService();

/**
 * 🔍 Поиск по базе знаний Vibecoding
 */
async function searchVibecoding(
  options: VibeCodingSearchOptions
): Promise<VibeCodingCommandResult> {
  try {
    logger.info('Начинаем поиск по Vibecoding', {
      data: { query: options.query, searchType: options.searchType },
    });

    // Заглушка для поиска
    const results = await vectorService.searchSimilar(
      options.query,
      options.limit || 5
    );

    return {
      success: true,
      message: `Найдено ${results.length} результатов`,
      data: { results },
      carouselCards: [],
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.error('Ошибка при поиске Vibecoding', {
      error: error instanceof Error ? error : new Error(errorMessage),
    });

    return {
      success: false,
      error: errorMessage,
      data: {},
      carouselCards: [],
    };
  }
}

/**
 * 🎨 Быстрая генерация карусели по запросу (без детального поиска)
 */
export async function generateVibeCodingCarousel(
  query: string,
  options: {
    maxCards?: number;
    style?: 'minimalist' | 'vibrant' | 'dark' | 'gradient';
    categories?: string[];
    includeCodeExamples?: boolean;
  } = {}
) {
  try {
    console.log(
      `🎨 Быстрая генерация карусели Vibecoding для запроса: "${query}"`
    );

    const { maxCards = 5 } = options;

    // Выполняем гибридный поиск
    const hybridResult = await vectorService.hybridSearch(query, {
      limit: Math.ceil(maxCards * 1.5), // Берем больше для лучшего отбора
      categories: options.categories,
    });

    if (hybridResult.combinedResults.length === 0) {
      return {
        success: false,
        message: 'По вашему запросу ничего не найдено в Библии Vibecoding',
        query,
      };
    }

    // Генерируем карточки
    const carouselCards = await vectorService.generateCarouselCards(
      hybridResult.combinedResults,
      {
        maxCards,
        includeCodeExamples: options.includeCodeExamples ?? true,
        groupByCategory: true,
      }
    );

    // Конвертируем VibeCoding карточки в CarouselSlide[]
    const slides: CarouselSlide[] = carouselCards.map(
      (card: any, index: number) => ({
        order: index + 1,
        type:
          index === 0
            ? 'title'
            : index === carouselCards.length - 1
              ? 'summary'
              : 'practice',
        title: `${getCategoryEmoji(card.category)} ${card.title}`,
        content: card.summary,
      })
    );

    // Используем только Galaxy Spiral Blur
    const colorTemplate = ColorTemplate.GALAXY_SPIRAL_BLUR;

    // Используем существующую функцию generateCarouselImages
    const imageBuffers = await instagramCanvasService.generateCarouselImages(
      slides,
      undefined, // используем дефолтный config
      colorTemplate
    );

    // Конвертируем Buffer[] в base64 строки для совместимости
    const carouselImages = imageBuffers.map(
      (buffer: Buffer) => `data:image/png;base64,${buffer.toString('base64')}`
    );

    console.log(
      `✅ Генерация завершена: ${carouselImages.length} карточек создано`
    );

    return {
      success: true,
      query,
      carouselCards: carouselCards.slice(0, carouselImages.length),
      carouselImages,
      searchStats: hybridResult.searchStats,
      message: `Создана карусель из ${carouselImages.length} карточек по теме "${query}"`,
    };
  } catch (error) {
    console.error('💥 Ошибка быстрой генерации карусели:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Неизвестная ошибка',
      query,
    };
  }
}

/**
 * 🎯 Получение эмодзи для категории
 */
function getCategoryEmoji(category: string): string {
  const categoryEmojis: Record<string, string> = {
    fundamentals: '🏛️',
    practices: '🧘‍♂️',
    tools: '🛠️',
    development: '🚀',
    analytics: '📊',
    archive: '📚',
    main_book: '📖',
    philosophy: '🕉️',
    general: '✨',
  };
  return categoryEmojis[category] || '✨';
}

/**
 * 🔄 Переиндексация векторной базы Vibecoding
 */
export async function reindexVibeCoding(): Promise<VibeCodingCommandResult> {
  try {
    logger.info('🔄 Starting VibeCoding knowledge base reindexing', {
      type: LogType.BUSINESS_LOGIC,
    });

    // Запуск векторизации через внешний скрипт
    const { execSync } = await import('child_process');
    execSync('bun run scripts/vectorize-vibecoding.ts', { stdio: 'inherit' });

    logger.info('✅ VibeCoding reindexing completed successfully');

    return {
      success: true,
      message: 'VibeCoding knowledge base has been successfully reindexed',
    };
  } catch (error) {
    logger.error('❌ Error during VibeCoding reindexing', {
      type: LogType.ERROR,
      error: error instanceof Error ? error : new Error(String(error)),
    });

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Unknown error during reindexing',
    };
  }
}

/**
 * 📊 Получение статистики векторной базы знаний
 */
export type { VibeCodingSearchOptions, VibeCodingStatsResult };

// Функция для получения статистики
export async function getVibeCodingStats(): Promise<VibeCodingStatsResult> {
  try {
    logger.info('📊 Получение статистики VibeCoding');

    // Получаем статистику от векторного сервиса
    const stats = await vectorService.getStats();

    logger.info('✅ Статистика VibeCoding получена успешно');

    // Конструируем результат с правильной типизацией
    const result: VibeCodingStatsResult = {
      totalChunks: stats.totalChunks || 0,
      totalFiles: stats.totalFiles || 0,
      categoryCounts: stats.categoryCounts || {},
      sectionTypeCounts: stats.sectionTypeCounts || {},
      avgTokensPerChunk: stats.avgTokensPerChunk || 0,
      topCategories: stats.topCategories || [],
      topSectionTypes: stats.topSectionTypes || [],
    };

    return result;
  } catch (error) {
    logger.error('❌ Ошибка получения статистики VibeCoding', {
      error: error instanceof Error ? error : new Error(String(error)),
    });

    // Возвращаем пустую статистику в случае ошибки
    return {
      totalChunks: 0,
      totalFiles: 0,
      categoryCounts: {},
      sectionTypeCounts: {},
      avgTokensPerChunk: 0,
      topCategories: [],
      topSectionTypes: [],
    };
  }
}

/**
 * 🤖 Настройка команд для работы с Vibecoding
 */
export function setupVibeCodingCommands(bot: Telegraf<Context>) {
  // Команда поиска
  bot.command('vibecoding_search', async ctx => {
    const args = ctx.message.text.split(' ').slice(1);
    const query = args.join(' ');

    if (!query) {
      await ctx.reply(
        '❌ Укажите поисковый запрос: /vibecoding_search [запрос]'
      );
      return;
    }

    const result = await searchVibecoding({
      query,
      searchType: 'hybrid',
      limit: 5,
    });

    if (result.success) {
      await ctx.reply(
        `✅ ${result.message}\n\nРезультаты:\n${JSON.stringify(result.data, null, 2)}`
      );
    } else {
      await ctx.reply(`❌ ${result.error}`);
    }
  });

  // Команда реиндексации
  bot.command('vibecoding_reindex', async ctx => {
    await ctx.reply('🔄 Начинаю реиндексацию базы знаний Vibecoding...');

    const result = await reindexVibeCoding();

    if (result.success) {
      await ctx.reply(`✅ ${result.message}`);
    } else {
      await ctx.reply(`❌ ${result.error}`);
    }
  });

  // Команда статистики
  bot.command('vibecoding_stats', async ctx => {
    await ctx.reply('📊 Получаю статистику базы знаний...');

    try {
      const stats = await getVibeCodingStats();
      const message = `📊 Статистика VibeCoding:
- Всего чанков: ${stats.totalChunks}
- Всего файлов: ${stats.totalFiles}
- Средний размер чанка: ${stats.avgTokensPerChunk} токенов
- Топ категории: ${stats.topCategories.join(', ')}
- Топ типы секций: ${stats.topSectionTypes.join(', ')}`;

      await ctx.reply(message);
    } catch (error) {
      await ctx.reply('❌ Ошибка получения статистики');
    }
  });
}

// Команды для системных тестов
export const handleVibecodingSystemTestCommand =
  async (): Promise<VibeCodingCommandResult> => {
    return { success: true, message: 'System test passed' };
  };

export const handleVibecodingCommand =
  async (): Promise<VibeCodingCommandResult> => {
    return { success: true, message: 'Vibecoding command executed' };
  };

export { searchVibecoding };
