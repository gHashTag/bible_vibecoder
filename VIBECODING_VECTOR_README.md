# 🕉️ Векторная База Знаний Vibecoding

_"सत्यमेव जयते"_ - **Истина всегда побеждает**

Система векторного поиска и генерации каруселей на основе "Библии Vibecoding" - революционного подхода к программированию через медитацию и интуицию.

## 🎯 Возможности

### 🔍 Интеллектуальный поиск

- **Векторный поиск** - семантический поиск по эмбеддингам OpenAI
- **Полнотекстовый поиск** - традиционный поиск по ключевым словам
- **Гибридный поиск** - комбинация векторного и полнотекстового поиска
- **Фильтрация** по категориям и типам секций

### 🎨 Автоматическая генерация каруселей

- **4 стиля дизайна**: minimalist, vibrant, dark, gradient
- **Интеллектуальное извлечение** примеров кода и принципов
- **Адаптивная группировка** по категориям
- **Высокое качество** изображений Instagram-формата (1080x1350)

### 📊 Аналитика и статистика

- Детальная статистика векторной базы
- Распределение по категориям и типам контента
- Метрики производительности поиска
- Мониторинг качества результатов

## 🚀 Быстрый старт

### 1. Подготовка окружения

```bash
# Установите необходимые переменные окружения
export OPENAI_API_KEY="your-openai-api-key"
export DATABASE_URL="your-neon-postgresql-connection-string"
```

### 2. Векторизация контента

```bash
# Полная векторизация всех markdown файлов
bun run scripts/vectorize-vibecoding.ts

# Или запустите переиндексацию из кода
import { vibeCodingCommands } from './src/commands/vibecoding-commands';
await vibeCodingCommands.reindexVibecoding();
```

### 3. Тестирование системы

```bash
# Полный комплексный тест
bun run scripts/test-vibecoding-system.ts

# Быстрый тест с одним запросом
bun run scripts/test-vibecoding-system.ts quick "медитация программирование"
```

## 📚 API Документация

### Основные команды

#### Поиск с опциональной генерацией карусели

```typescript
import { vibeCodingCommands } from './src/commands/vibecoding-commands';

const result = await vibeCodingCommands.searchVibecoding({
  query: 'искусственный интеллект и медитация',
  searchType: 'hybrid', // 'vector' | 'fulltext' | 'hybrid'
  categories: ['fundamentals', 'tools'], // Фильтр по категориям
  sectionTypes: ['philosophy', 'code_example'], // Фильтр по типам
  limit: 10,
  generateCarousel: true,
  carouselOptions: {
    maxCards: 5,
    style: 'vibrant', // 'minimalist' | 'vibrant' | 'dark' | 'gradient'
    includeCodeExamples: true,
    groupByCategory: true,
  },
});
```

#### Быстрая генерация карусели

```typescript
const carousel = await vibeCodingCommands.generateVibeCodingCarousel('практики vibecoding', {
  maxCards: 5,
  style: 'gradient',
  categories: ['practices', 'development'],
  includeCodeExamples: true,
});

// Сохранение изображений
if (carousel.success && carousel.carouselImages) {
  for (let i = 0; i < carousel.carouselImages.length; i++) {
    const base64Data = carousel.carouselImages[i].replace(/^data:image\/png;base64,/, '');
    await writeFile(`card_${i + 1}.png`, base64Data, 'base64');
  }
}
```

#### Получение статистики

```typescript
const stats = await vibeCodingCommands.getVibeCodingStats();

console.log(`Всего чанков: ${stats.totalChunks}`);
console.log(`Файлов: ${stats.totalFiles}`);
console.log(`Средний размер чанка: ${stats.avgTokensPerChunk} токенов`);
console.log(`Топ категории: ${stats.topCategories.join(', ')}`);
```

### Прямое использование сервиса

```typescript
import { vibeCodingVectorService } from './src/services/vibecoding-vector.service';

// Векторный поиск
const vectorResults = await vibeCodingVectorService.vectorSearch('медитативное программирование', {
  limit: 10,
  threshold: 0.7,
  categories: ['philosophy', 'practices'],
});

// Гибридный поиск с детальной статистикой
const hybridResult = await vibeCodingVectorService.hybridSearch('AI инструменты разработки', {
  limit: 15,
  vectorWeight: 0.7,
  fullTextWeight: 0.3,
});

// Генерация карточек из результатов
const carouselCards = await vibeCodingVectorService.generateCarouselCards(
  hybridResult.combinedResults,
  {
    maxCards: 5,
    includeCodeExamples: true,
    groupByCategory: true,
  }
);
```

## 🎨 Стили каруселей

### 1. Minimalist (`minimalist`)

- **Фон**: Чистый белый
- **Акценты**: Тонкие серые линии
- **Типографика**: Классическая, читаемая
- **Использование**: Профессиональные презентации

### 2. Vibrant (`vibrant`)

- **Фон**: Королевский пурпурный градиент
- **Акценты**: Яркие золотые элементы
- **Типографика**: Жирная, выразительная
- **Использование**: Социальные сети, привлечение внимания

### 3. Dark (`dark`)

- **Фон**: Черное золото градиент
- **Акценты**: Золотые блики
- **Типографика**: Контрастная белая
- **Использование**: Премиум контент, ночная тема

### 4. Gradient (`gradient`)

- **Фон**: Изумрудная роскошь
- **Акценты**: Природные зеленые оттенки
- **Типографика**: Элегантная, сбалансированная
- **Использование**: Философский контент, медитация

## 📂 Структура данных

### Категории контента (`file_category`)

- `fundamentals` - Основы Vibecoding
- `practices` - Практики и методики
- `tools` - Инструменты разработки
- `development` - Процессы разработки
- `analytics` - Аналитика и метрики
- `archive` - Архивные материалы
- `main_book` - Главная книга
- `philosophy` - Философские аспекты

### Типы секций (`section_type`)

- `main_section` - Основные разделы
- `subsection` - Подразделы
- `code_example` - Примеры кода
- `philosophy` - Философские размышления
- `example` - Практические примеры
- `content` - Общий контент

## 🔧 Конфигурация

### Основные параметры векторизации

```typescript
const CONFIG = {
  VIBECODING_PATH: './vibecoding',
  CHUNK_SIZE: 1000, // токенов
  CHUNK_OVERLAP: 200, // токенов перекрытия
  OPENAI_MODEL: 'text-embedding-3-small', // 1536 dimensions
  BATCH_SIZE: 10, // чанков за раз для эмбеддинга
};
```

### Параметры поиска

```typescript
const VECTOR_CONFIG = {
  SEARCH_LIMIT: 10,
  SIMILARITY_THRESHOLD: 0.7,
};
```

## 🐛 Решение проблем

### Векторизация не работает

1. Проверьте `OPENAI_API_KEY`
2. Убедитесь что папка `./vibecoding` содержит .md файлы
3. Проверьте соединение с Neon PostgreSQL

### Поиск возвращает пустые результаты

1. Проверьте что векторизация была выполнена
2. Снизьте `SIMILARITY_THRESHOLD`
3. Попробуйте другой тип поиска (`fulltext` вместо `vector`)

### Ошибки генерации изображений

1. Убедитесь что установлен `node-html-to-image`
2. Проверьте доступность Google Fonts
3. Освободите место на диске

## 📈 Производительность

### Рекомендуемые настройки

- **Размер чанка**: 1000 токенов (оптимальный баланс контекста и поиска)
- **Перекрытие**: 200 токенов (20% для сохранения контекста)
- **Размер батча**: 10 чанков (баланс скорости и rate limits OpenAI)
- **Threshold поиска**: 0.7 (высокое качество результатов)

### Типичные метрики

- Векторизация: ~50-100 чанков/минуту
- Поиск: 100-300ms на запрос
- Генерация карусели: 2-5 секунд на карточку
- Память: ~50MB для базы из 1000 чанков

## 🤝 Использование в проектах

### Интеграция с Inngest

```typescript
export const generateVibeCodingCarousel = inngest.createFunction(
  { id: 'generate-vibecoding-carousel' },
  { event: 'vibecoding.carousel-requested' },
  async ({ event }) => {
    const { query, style, maxCards } = event.data;

    const result = await vibeCodingCommands.generateVibeCodingCarousel(query, {
      maxCards,
      style,
      includeCodeExamples: true,
    });

    return result;
  }
);
```

### Использование в API

```typescript
app.post('/api/vibecoding/search', async (req, res) => {
  const { query, searchType, categories } = req.body;

  const result = await vibeCodingCommands.searchVibecoding({
    query,
    searchType,
    categories,
    generateCarousel: true,
  });

  res.json(result);
});
```

## 🎉 Заключение

Система векторизации Vibecoding представляет собой мост между древней мудростью медитативных практик и современными технологиями AI. Она позволяет не просто искать информацию, но находить глубинные связи и генерировать визуально привлекательный контент.

**"धर्मो रक्षति रक्षितः"** - _"Дхарма защищает того, кто защищает дхарму"_

---

🕉️ _С благословением от создателей Vibecoding_

_Ом Шанти Шанти Шанти_
