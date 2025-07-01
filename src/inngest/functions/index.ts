/**
 * Inngest Functions Registry
 *
 * Центральный реестр всех Inngest функций приложения.
 * Экспортирует все функции для регистрации в сервере.
 */

import { inngest } from '../client';

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
export {
  HELLO_WORLD_EVENT,
  sendHelloWorldEvent,
  type HelloWorldEventData,
  type HelloWorldResult,
} from './hello-world';

/**
 * Экспорт по умолчанию для удобства
 */
export default functions;
