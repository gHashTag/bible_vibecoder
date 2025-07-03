import { Context, Markup } from 'telegraf';
import { logger, LogType } from '../utils/logger';
import { inngest } from '../inngest/client';
import { ColorTemplate } from '../types';

// Global state for simplicity, consider replacing with a DB/Redis in production
declare global {
  var carouselTopics:
    | Record<string, { topic: string; messageId: number }>
    | undefined;
}

export type CommandContext = Context & {
  session?: any;
};

export type CommandHandler = (ctx: CommandContext) => Promise<void>;

const buildWelcomeMessage = (userFirstName: string): string =>
  `🚀 Привет, ${userFirstName}! Я - **Bible VibeCoder Bot**\n\n` +
  `🎨 Создаю Instagram карусели из мудрости VIBECODING.\n` +
  `Используй /help для списка команд.`;

const buildHelpMessage = (): string =>
  '🤖 **Доступные команды:**\n\n' +
  '🚀 `/start` - Начальное приветствие\n' +
  '❓ `/help` - Это сообщение с помощью\n' +
  '🎨 `/carousel [тема]` - Создать Instagram карусель\n' +
  '🧘‍♂️ `/wisdom` - Получить мудрость дня\n' +
  '⚡ `/quick` - Быстрый старт проекта\n\n' +
  '**Пример:**\n`/carousel принципы VIBECODING`';

const SACRED_WISDOM = [
  '🕉️ तत्त्वमसि - Ты есть То (Tat tvam asi)',
  '🕉️ सत्यमेव जयते - Истина побеждает (Satyameva jayate)',
] as const;

const getDailyWisdom = (): string => {
  const today = new Date().getDate();
  const index = today % SACRED_WISDOM.length;
  return SACRED_WISDOM[index];
};

export const handleStart: CommandHandler = async ctx => {
  const userFirstName = ctx.from?.first_name || 'незнакомец';
  const message = buildWelcomeMessage(userFirstName);
  await ctx.reply(message, { parse_mode: 'Markdown' });
};

export const handleHelp: CommandHandler = async ctx => {
  const message = buildHelpMessage();
  await ctx.reply(message, { parse_mode: 'Markdown' });
};

export const handleWisdom: CommandHandler = async ctx => {
  const wisdom = getDailyWisdom();
  await ctx.reply(`🧘‍♂️ **Мудрость дня:**\n\n${wisdom}`, {
    parse_mode: 'Markdown',
  });
};

export const handleMyId: CommandHandler = async ctx => {
  const telegramId = ctx.from?.id;
  const username = ctx.from?.username;
  const firstName = ctx.from?.first_name;
  
  await ctx.reply(
    `🆔 **Ваша информация:**\n\n` +
    `• Telegram ID: \`${telegramId}\`\n` +
    `• Username: @${username || 'не указан'}\n` +
    `• Имя: ${firstName || 'не указано'}`,
    { parse_mode: 'Markdown' }
  );
};

export const handleCarousel: CommandHandler = async ctx => {
  const args = (ctx.message as any)?.text?.split(' ').slice(1) || [];
  const topic = args.join(' ').trim();

  if (!topic) {
    await ctx.reply(
      '🎨 Укажите тему после команды. **Пример:**\n`/carousel Квантовая физика для котов`',
      { parse_mode: 'Markdown' }
    );
    return;
  }

  const telegramUserId = ctx.from?.id;
  if (!telegramUserId) {
    await ctx.reply('❌ Не удалось определить ваш ID.');
    return;
  }

  const topicKey = `topic_${telegramUserId}_${Date.now()}`;
  if (!global.carouselTopics) global.carouselTopics = {};
  global.carouselTopics[topicKey] = {
    topic,
    messageId: (ctx.message as any).message_id,
  };

  const inlineKeyboard = Markup.inlineKeyboard([
    Markup.button.callback(
      '🌌 Galaxy',
      `color_${ColorTemplate.GALAXY_SPIRAL_BLUR}_${topicKey}`
    ),
    Markup.button.callback(
      '🎨 Vibrant',
      `color_${ColorTemplate.VIBRANT}_${topicKey}`
    ),
    Markup.button.callback(
      '✨ Minimal',
      `color_${ColorTemplate.MINIMAL}_${topicKey}`
    ),
  ]);

  await ctx.reply('🎨 **Выберите стиль для вашей карусели:**', inlineKeyboard);
};

export const handleColorSelection = async (ctx: Context) => {
  const callbackQuery = ctx.callbackQuery as any;
  const callbackData = callbackQuery?.data;

  if (!callbackData || !callbackData.startsWith('color_')) return;

  try {
    const [_, colorTemplateKey, topicKey] = callbackData.split('_');

    if (!global.carouselTopics?.[topicKey]) {
      await ctx.editMessageText('❌ Сессия истекла. Попробуйте снова.');
      return;
    }

    const { topic, messageId } = global.carouselTopics[topicKey];
    const telegramUserId = ctx.from?.id;

    const isValidTemplate = Object.values(ColorTemplate).includes(
      colorTemplateKey as ColorTemplate
    );
    if (!isValidTemplate) {
      await ctx.answerCbQuery('❌ Неверный стиль шаблона.');
      return;
    }

    await ctx.editMessageText(
      `🎨 **Стиль выбран!**\n⏳ Запускаю генерацию на тему: _"${topic}"_...`,
      { parse_mode: 'Markdown' }
    );

    await inngest.send({
      name: 'carousel/generate.request',
      data: {
        topic,
        telegramUserId,
        messageId,
        colorTemplate: colorTemplateKey as ColorTemplate,
      },
    });

    await ctx.answerCbQuery('✅ Генерация запущена!');
  } catch (error) {
    logger.error('Error handling color selection', {
      type: LogType.ERROR,
      error,
    });
    await ctx.answerCbQuery('❌ Произошла ошибка.');
  } finally {
    if (callbackData) {
      const [_, __, topicKey] = callbackData.split('_');
      if (global.carouselTopics?.[topicKey]) {
        delete global.carouselTopics[topicKey];
      }
    }
  }
};

export const setupFunctionalCommands = (bot: any) => {
  bot.start(handleStart);
  bot.help(handleHelp);
  bot.command('wisdom', handleWisdom);
  bot.command('myid', handleMyId);
  bot.command('carousel', handleCarousel);
  bot.on('callback_query', (ctx: Context) => {
    if ((ctx.callbackQuery as any)?.data?.startsWith('color_')) {
      handleColorSelection(ctx);
    }
  });
};
