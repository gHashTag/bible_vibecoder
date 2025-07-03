/**
 * Основной файл команд бота
 * Объединяет все команды из разных модулей
 */

import { Telegraf } from 'telegraf';
import { setupFunctionalCommands } from './commands/functional-commands';
import { setupVibeCodingCommands } from './commands/vibecoding-commands';
import type { BaseBotContext } from './types';

/**
 * Настройка всех команд бота
 * @param bot - Экземпляр Telegraf бота
 */
export const setupCommands = (bot: Telegraf<BaseBotContext>) => {
  // Функциональные команды (start, help, carousel, wisdom)
  setupFunctionalCommands(bot);
  
  // VibeCoding специфичные команды (ask, research)
  setupVibeCodingCommands(bot);
};

// Экспорт отдельных хэндлеров для возможного прямого использования
export {
  handleStart,
  handleHelp,
  handleWisdom,
  handleMyId,
  handleCarousel,
  handleColorSelection,
} from './commands/functional-commands';

export {
  handleCarouselCommand,
  handleAskCommand,
  handleResearchCommand,
} from './commands/vibecoding-commands';
