/**
 * Inngest Functions Registry
 *
 * Центральный реестр всех Inngest функций приложения.
 * Экспортирует все функции для регистрации в сервере.
 */

import { inngest } from '../client';
import { helloWorld } from './hello-world';
import { generateCarousel } from './generate-carousel';
import { runVibecodingBroadcast } from './vibecoding-broadcast';
import { runVibecodingResearch } from './vibecoding-research';

/**
 * Массив всех Inngest функций для регистрации
 */
export const functions = [
  helloWorld,
  generateCarousel,
  runVibecodingBroadcast,
  runVibecodingResearch,
];

/**
 * Экспорт отдельных функций для прямого импорта
 */
export {
  helloWorld,
  generateCarousel,
  runVibecodingBroadcast,
  runVibecodingResearch,
};

/**
 * Экспорт событий и типов
 */
export type {
  HelloWorldInput,
  HelloWorldOutput,
  HelloWorldResult,
} from './hello-world';

export type { GenerateCarouselInput } from './generate-carousel';
export type { VibecodingBroadcastInput } from './vibecoding-broadcast';
export type { VibecodingResearchInput } from './vibecoding-research';

/**
 * Экспорт по умолчанию для удобства
 */
export default functions;
