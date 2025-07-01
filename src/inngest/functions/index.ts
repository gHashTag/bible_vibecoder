/**
 * Inngest Functions Registry
 *
 * Центральный реестр всех Inngest функций приложения.
 * Экспортирует все функции для регистрации в сервере.
 */

import { helloWorld } from './hello-world';
import { generateCarousel } from './generate-carousel';
import { vibecodingBroadcastFunction } from './vibecoding-broadcast';
import { vibeCodingResearch } from './vibecoding-research';

/**
 * Массив всех Inngest функций для регистрации
 */
export const functions = [
  helloWorld,
  generateCarousel,
  vibecodingBroadcastFunction,
  vibeCodingResearch,
];

/**
 * Экспорт отдельных функций для прямого импорта
 */
export {
  helloWorld,
  generateCarousel,
  vibecodingBroadcastFunction,
  vibeCodingResearch,
};

/**
 * Экспорт событий и типов
 */
export type { HelloWorldResult } from './hello-world';

export type { GenerateCarouselInput } from './generate-carousel';

/**
 * Экспорт по умолчанию для удобства
 */
export default functions;
