import { Context } from 'telegraf';

/**
 * 🕉️ Единый источник истины для типов проекта
 */

// Типы для логирования
export const enum LogLevel {
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  DEBUG = 'debug',
}

export enum LogType {
  SYSTEM = 'system',
  USER_ACTION = 'user_action',
  TELEGRAM_API = 'telegram_api',
  DATABASE = 'database',
  EXTERNAL_SERVICE = 'external_service',
  ERROR = 'error',
  SCENE = 'scene',
  BUSINESS_LOGIC = 'business_logic',
}

export interface LogEntry {
  timestamp: string;
  level: LogLevel | string;
  message: string;
  type: LogType;
  userId?: number;
  username?: string;
  error?: Error;
  data?: any;
}

// Контекст Telegraf, расширенный для поддержки сцен
export interface BotContext extends Context {
  scene: any;
  wizard: any;
}

// Алиас для совместимости
export interface BaseBotContext extends BotContext {}

// Шаг в сцене бота
export interface BotSceneStep {
  id: string;
  name: string;
  handler: (ctx: BotContext) => Promise<void>;
}

// Слайд для карусели
export interface CarouselSlide {
  title: string;
  content: string;
  order: number;
  subtitle?: string;
  type:
    | 'quote'
    | 'title'
    | 'principle'
    | 'practice'
    | 'summary'
    | 'introduction'
    | 'tools'
    | 'psychology'
    | 'metrics'
    | 'trends'
    | 'conclusion'
    | 'text';
}

// Конфигурация для Canvas рендеринга
export interface CanvasConfig {
  width: number;
  height: number;
  quality: number;
  format: 'png' | 'jpeg' | 'webp';
}

// Карточка для карусели Vibecoding
export interface VibeCodingCarouselCard {
  id: string;
  title: string;
  content: string;
  summary: string;
  category: string;
  tags: string[];
  sourceFile: string;
  relevanceScore: number;
  codeExamples?: string[];
  keyPrinciples?: string[];
}

// Контент из документации Vibecoding
export interface VibeCodingContent {
  title: string;
  slides: CarouselSlide[];
}

// Опции поиска для Vibecoding
export interface VibeCodingSearchOptions {
  query: string;
  searchType?: 'vector' | 'fulltext' | 'hybrid';
  categories?: string[];
  sectionTypes?: string[];
  limit?: number;
  generateCarousel?: boolean;
  carouselOptions?: {
    maxCards?: number;
    includeCodeExamples?: boolean;
    groupByCategory?: boolean;
    style?: 'minimalist' | 'vibrant' | 'dark' | 'gradient';
  };
}

// Результат выполнения команды
export interface VibeCodingCommandResult {
  success: boolean;
  message?: string;
  error?: string;
  data?: any;
  carouselCards?: VibeCodingCarouselCard[];
  carouselImages?: string[];
  query?: string;
  searchStats?: any;
}

// Статистика векторной базы данных
export interface VibeCodingStatsResult {
  totalChunks: number;
  totalFiles: number;
  categoryCounts: Record<string, number>;
  sectionTypeCounts: Record<string, number>;
  avgTokensPerChunk: number;
  topCategories: string[];
  topSectionTypes: string[];
}

// Опции для LLM
export interface Llm {
  model?: string;
  temperature?: number;
}

// Цветовые шаблоны для карусели
export enum ColorTemplate {
  GALAXY_SPIRAL_BLUR = 'galaxy_spiral_blur',
  VIBRANT = 'vibrant',
  MINIMAL = 'minimal',
}
