/**
 * Inngest Functions Registry
 *
 * Центральный реестр всех Inngest функций приложения.
 * Экспортирует все функции для регистрации в сервере.
 */

import { serve } from 'inngest/bun';
import { inngest } from '../client';

// Core Functions
import { helloWorld } from './hello-world';
import { generateCarousel } from './generate-carousel';
import { vibeCodingResearch } from './vibecoding-research';
import { vibecodingBroadcastFunction } from './vibecoding-broadcast';
// import { textToSpeech } from './text-to-speech'; // Example, can be added later

// Helper Functions & Types
// Note: These are not Inngest functions but can be used by them.
export * from '../../utils/logger';
export * from '../../services/instagram-canvas.service';
export * from '../../services/vibecoding-content.service';

/**
 * Массив всех Inngest функций для регистрации
 */
const functions = [
  // Core
  helloWorld,
  generateCarousel,
  vibeCodingResearch,
  vibecodingBroadcastFunction,

  // Utilities, if they were Inngest functions
  // textToSpeech,
];

/**
 * Экспорт отдельных функций для прямого импорта
 */
export {
  helloWorld,
  generateCarousel,
  vibeCodingResearch,
  vibecodingBroadcastFunction,
};

/**
 * Экспорт событий и типов
 */
export type { HelloWorldResult } from './hello-world';

/**
 * Экспорт по умолчанию для удобства
 */
export default functions;

/**
 * Serve the functions
 */
export const server = serve({ client: inngest, functions });
