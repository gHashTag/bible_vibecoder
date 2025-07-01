import { Context } from 'telegraf';
import {
  generateVibeCodingCarousel,
  TemplateDesign,
} from '../services/carousel-generator.service';
import { VibeCodingContentService } from '../services/vibecoding-content.service';
import { logger, LogType } from '../utils/logger';

export const handleCarouselCommand = async (ctx: Context) => {
  const text = (ctx.message as any)?.text;
  const topic = text.split(' ').slice(1).join(' ').trim();

  if (!topic) {
    await ctx.reply('Пожалуйста, укажите тему для карусели.');
    return;
  }

  await ctx.reply(`🎨 Генерирую карусель на тему "${topic}"...`);

  try {
    const result = await generateVibeCodingCarousel(topic, {});

    if (result.success && result.data) {
      // For now, just confirming generation
      await ctx.reply(
        `✅ Карусель успешно сгенерирована с шаблоном ${result.data.colorTemplate}!`
      );
    } else {
      await ctx.reply(`❌ Ошибка генерации: ${result.error}`);
    }
  } catch (error) {
    logger.error('Failed to handle /carousel command', {
      type: LogType.ERROR,
      error,
    });
    await ctx.reply('Произошла критическая ошибка при генерации карусели.');
  }
};

export const handleAskCommand = async (ctx: Context) => {
  const text = (ctx.message as any)?.text;
  const question = text.split(' ').slice(1).join(' ').trim();

  if (!question) {
    await ctx.reply('Пожалуйста, задайте вопрос после команды /ask.');
    return;
  }

  await ctx.reply(`💡 Ищу ответ на вопрос: "${question}"...`);
  try {
    const vibeContentService = new VibeCodingContentService();
    const results = await vibeContentService.search({ query: question });

    if (results.length > 0) {
      await ctx.replyWithMarkdown(
        `**Ответ:**\n\n${results[0].content}\n\n*Источник: ${results[0].source}*`
      );
    } else {
      await ctx.reply('К сожалению, я не смог найти ответ на ваш вопрос.');
    }
  } catch (error) {
    logger.error('Failed to handle /ask command', {
      type: LogType.ERROR,
      error,
    });
    await ctx.reply('Произошла ошибка при поиске ответа.');
  }
};

export const handleResearchCommand = async (ctx: Context) => {
  await ctx.reply('Команда /research временно отключена.');
};

export const setupVibeCodingCommands = (bot: any) => {
  // These commands are now defined in functional-commands.ts
  // bot.command('carousel', handleCarouselCommand);
  bot.command('ask', handleAskCommand);
  bot.command('research', handleResearchCommand);
};
