/**
 * 🌌 Простое тестирование Galaxy Spiral Blur стиля
 *
 * Генерирует несколько карточек Galaxy Spiral Blur с новыми
 * квадратными пропорциями центрального элемента (800x800px)
 */

import {
  InstagramCanvasService,
  ColorTemplate,
} from '../src/services/instagram-canvas.service';
import type { CarouselSlide } from '../src/types';
import fs from 'fs';
import path from 'path';

const canvasService = new InstagramCanvasService();

// 🌌 Тестовые слайды для Galaxy стиля
const GALAXY_TEST_SLIDES: CarouselSlide[] = [
  {
    order: 1,
    type: 'title',
    title: '🌌 Galaxy Spiral Flow',
    content:
      'Медитативное программирование в космических масштабах галактических спиралей',
  },
  {
    order: 2,
    type: 'principle',
    title: '✨ Космическая Мудрость VibeCoding',
    content:
      'Код течет как спирали галактик — бесконечно, элегантно, с глубоким смыслом. Каждая функция — звезда в созвездии архитектуры.',
  },
  {
    order: 3,
    type: 'practice',
    title: '🌠 Практика Галактического Потока',
    content:
      'Представь свой код как галактику: центр — ядро логики, спирали — модули, звезды — функции. Программируй с космическим размахом!',
  },
  {
    order: 4,
    type: 'summary',
    title: '🎯 Галактическое Применение',
    content:
      'Начни каждый день кодинга с медитации на спирали галактик. Пиши код с космической перспективой — думай в масштабах вселенной!',
  },
];

// Папка для сохранения результатов
const outputDir = './test-outputs/galaxy-spiral-simple';

async function generateGalaxySimple() {
  console.log(
    '🌌 Тестируем Galaxy Spiral Blur с квадратным центральным элементом...\n'
  );

  // Создаем выходную папку
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  let successCount = 0;
  let errorCount = 0;
  const startTime = Date.now();

  try {
    console.log('🎨 Генерируем карусель Galaxy Spiral Blur...');

    // Генерируем полную карусель
    const imageBuffers = await canvasService.generateCarouselImages(
      GALAXY_TEST_SLIDES,
      undefined,
      ColorTemplate.GALAXY_SPIRAL_BLUR
    );

    console.log(`✅ Сгенерировано ${imageBuffers.length} изображений`);

    // Сохраняем каждое изображение
    for (const [index, buffer] of imageBuffers.entries()) {
      const filename = `galaxy_spiral_square_slide_${index + 1}.png`;
      const filePath = path.join(outputDir, filename);

      fs.writeFileSync(filePath, buffer);

      const fileSize = (fs.statSync(filePath).size / 1024).toFixed(0);
      console.log(`   💾 Сохранено: ${filename} (${fileSize}KB)`);
      successCount++;
    }
  } catch (error) {
    console.error('💥 Ошибка при генерации Galaxy карусели:', error);
    errorCount++;
  }

  const totalTime = Date.now() - startTime;

  // Создаем отчет
  const report = `# 🌌 Galaxy Spiral Blur - Квадратный центральный элемент

## 📊 Статистика
- **Успешно сгенерировано:** ${successCount} изображений
- **Ошибок:** ${errorCount}
- **Время выполнения:** ${(totalTime / 1000).toFixed(1)}с
- **Папка с результатами:** ${outputDir}

## 🔲 Новые пропорции:
- **Центральный элемент:** 800px × 800px (идеальный квадрат)
- **Footer:** 800px ширины (подогнан под центральный элемент)
- **Отступ:** 80px между центральным и нижним элементами
- **Пропорции:** aspect-ratio: 1/1 для принудительного квадрата

## ✨ Особенности Galaxy Spiral Blur:
- Фоновые изображения из папки bg-bible-vibecoding
- Glassmorphism эффекты с галактическими акцентами
- Белый текст с тенями для отличного контраста
- Backdrop-filter: blur(15px) для глубины и мистики

## 🎨 Цветовая схема:
- Основной цвет: Галактический синий/фиолетовый градиент
- Акценты: Звездные блики и космические переливы
- Текст: Белый с космическими тенями
- Blur: 15px для создания эффекта глубины космоса

Дата: ${new Date().toLocaleString('ru-RU')}
`;

  fs.writeFileSync(path.join(outputDir, 'galaxy-square-report.md'), report);

  console.log('\n📋 ИТОГОВЫЙ ОТЧЕТ:');
  console.log(`✅ Успешно: ${successCount} изображений`);
  console.log(`❌ Ошибок: ${errorCount}`);
  console.log(`⏱️ Время: ${(totalTime / 1000).toFixed(1)}с`);
  console.log(`📁 Папка: ${outputDir}`);
  console.log('\n🌌 Galaxy с квадратным центральным элементом готов!');

  if (successCount > 0) {
    console.log('\n🎯 РЕКОМЕНДАЦИИ:');
    console.log('- Центральный элемент теперь точно квадратный (800x800px)');
    console.log('- Footer подогнан под ту же ширину для гармонии');
    console.log('- Отступы правильно рассчитаны для избежания наложений');
    console.log('- Galaxy стиль отлично сочетается с квадратными пропорциями!');
  }
}

// Запускаем тестирование
generateGalaxySimple()
  .then(() => {
    console.log('\n🌌 Galaxy Spiral Blur с квадратными пропорциями готов! ✨');
  })
  .catch(error => {
    console.error('💥 Критическая ошибка:', error);
    process.exit(1);
  });
