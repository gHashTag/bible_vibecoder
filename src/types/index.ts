import { Context } from 'telegraf';

/**
 * 🕉️ Единый источник истины для типов проекта
 */

// Контекст Telegraf, расширенный для поддержки сцен
export interface BotContext extends Context {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  scene: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  wizard: any;
}

// Слайд для карусели
export interface CarouselSlide {
  title: string;
  content: string;
  order: number;
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
    | 'conclusion';
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

// Заглушка для типа LLM
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Llm {}

// Результат выполнения команды
export interface VibeCodingCommandResult {
  success: boolean;
  message?: string;
  error?: string;
  data?: any;
}

// Опции поиска для Vibecoding
export interface VibeCodingSearchOptions {
  query: string;
  searchType?: 'vector' | 'fulltext' | 'hybrid';
  categories?: string[];
  sectionTypes?: string[];
  limit?: number;
  generateCarousel?: boolean;
}

// Тип для контента Vibecoding, возможно, устарел, но нужен для компиляции
export interface VibeCodingContent {
  id: number;
  title: string;
  content: string;
  category: string;
  concepts: string[];
  quotes: string[];
  sourceFile: string;
}

// Опции для LLM
export interface Llm {
  // Заглушка для типа LLM
  model?: string;
  temperature?: number;
}
