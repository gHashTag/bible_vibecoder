# 🕉️ VibeCoding Автоматическая Рассылка

## 📋 Обзор

Система автоматической почасовой рассылки знаний из Библии VibeCoding всем зарегистрированным пользователям Telegram бота. Каждый час система генерирует тематические карусели с полезными знаниями и отправляет их активным пользователям.

## 🏗️ Архитектура

### Основные компоненты:

1. **📦 Inngest Function**: `vibecoding-broadcast.ts` - основная функция рассылки
2. **🔍 Vector Search**: Поиск по векторизованной базе знаний VibeCoding
3. **🎨 Carousel Generator**: Создание красивых карусельных изображений
4. **👥 User Management**: Управление активными пользователями и настройками
5. **📊 Analytics**: Статистика и логирование рассылок

### Workflow рассылки:

```mermaid
graph TD
    A[⏰ Cron Trigger каждый час] --> B[👥 Получить активных пользователей]
    B --> C[🎯 Выбрать случайную тему]
    C --> D[🔍 Поиск в VibeCoding базе]
    D --> E[🎨 Генерация карусели]
    E --> F[📤 Рассылка батчами]
    F --> G[📊 Логирование результатов]
```

## 🔧 Настройка

### 1. Переменные окружения

```bash
# База данных Neon
DATABASE_URL="postgresql://username:password@host/database?sslmode=require"

# Telegram Bot API
BOT_TOKEN="your_telegram_bot_token"

# OpenAI для генерации эмбеддингов
OPENAI_API_KEY="your_openai_api_key"

# Inngest
INNGEST_SIGNING_KEY="your_inngest_signing_key"
INNGEST_EVENT_KEY="your_inngest_event_key"
```

### 2. Схема базы данных

Система требует следующие таблицы:

#### Пользователи (`users`)

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  telegram_id TEXT NOT NULL UNIQUE,
  username TEXT,
  first_name TEXT,
  last_name TEXT,
  language_code TEXT DEFAULT 'ru',
  is_bot BOOLEAN DEFAULT false,
  is_premium BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  metadata JSONB
);
```

#### Настройки пользователей (`user_settings`)

```sql
CREATE TABLE user_settings (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  notifications_enabled BOOLEAN DEFAULT true,
  preferred_language TEXT DEFAULT 'ru',
  theme TEXT DEFAULT 'light',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id)
);
```

#### VibeCoding Vector Schema

```sql
-- Включение pgvector расширения
CREATE EXTENSION IF NOT EXISTS vector;

-- Создание схемы для векторных данных
CREATE SCHEMA IF NOT EXISTS vibecoding_vectors;

-- Таблица исходных файлов
CREATE TABLE vibecoding_vectors.source_files (
  id SERIAL PRIMARY KEY,
  file_path VARCHAR(512) NOT NULL UNIQUE,
  file_name VARCHAR(255) NOT NULL,
  file_size INTEGER,
  file_category VARCHAR(100),
  last_modified TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Таблица векторизованных чанков
CREATE TABLE vibecoding_vectors.document_chunks (
  id SERIAL PRIMARY KEY,
  source_file_id INTEGER REFERENCES vibecoding_vectors.source_files(id),
  source_file VARCHAR(512),
  source_path VARCHAR(512),
  chunk_index INTEGER,
  title VARCHAR(512),
  content TEXT NOT NULL,
  content_hash VARCHAR(64) NOT NULL,
  chunk_hash VARCHAR(64),
  embedding VECTOR(1536),
  token_count INTEGER,
  section_type VARCHAR(100),
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Индексы для оптимизации
CREATE INDEX idx_document_chunks_embedding ON vibecoding_vectors.document_chunks
  USING hnsw (embedding vector_cosine_ops);
CREATE INDEX idx_document_chunks_content ON vibecoding_vectors.document_chunks
  USING gin(to_tsvector('russian', content));
CREATE UNIQUE INDEX idx_document_chunks_unique_chunk ON vibecoding_vectors.document_chunks
  (source_path, chunk_index);
```

### 3. Векторизация VibeCoding

Запустите векторизацию книги для заполнения векторной базы:

```bash
# Установка DATABASE_URL
export DATABASE_URL="your_neon_connection_string"

# Запуск векторизации
bun run scripts/vectorize-vibecoding.ts
```

## 🚀 Запуск

### 1. Развертывание Inngest функции

Функция `vibecoding-broadcast.ts` автоматически регистрируется в системе Inngest при запуске приложения.

### 2. Тестирование

#### Упрощённый тест (без векторизации):

```bash
bun run scripts/test-broadcast-simple.ts
```

#### Полный тест (с генерацией карусели):

```bash
bun run scripts/test-vibecoding-broadcast.ts
```

### 3. Ручной запуск

```typescript
import { triggerVibeCodingBroadcast } from './src/inngest/functions/vibecoding-broadcast';

// Ручной запуск рассылки
await triggerVibeCodingBroadcast();
```

## ⚙️ Настройки рассылки

### Расписание

- **Периодичность**: Каждый час (`0 * * * *`)
- **Timezone**: UTC (настраивается через Inngest)

### Темы рассылки

Система случайно выбирает из 16 предустановленных тем:

#### 🧘 Философские темы:

- Философия интуитивного программирования
- Медитативное программирование и состояние потока
- Принципы VIBECODING и доверие ИИ
- Намерение над алгоритмом

#### 💻 Практические навыки:

- Cursor AI техники и лучшие практики
- Эффективные промпты для программирования
- Работа с ИИ-инструментами
- Создание MVP за день

#### 📈 Развитие и карьера:

- Современные тренды AI-программирования
- Путь от новичка до мастера VIBECODING
- Инструменты разработчика 2025
- Стратегии быстрого прототипирования

#### 🌐 Сообщество и экосистема:

- VIBECODING сообщество и ресурсы
- Будущее программирования и ИИ
- Творческие практики в разработке
- Энергетические практики для кодеров

### Стили карусели

- `minimalist` - Минималистичный дизайн
- `vibrant` - Яркие цвета
- `dark` - Тёмная тема
- `gradient` - Градиентные переходы

## 👥 Управление пользователями

### Включение/отключение уведомлений

Пользователи с `notifications_enabled = true` или без записи в `user_settings` (по умолчанию включено) получают рассылку.

### Фильтрация пользователей

```sql
-- Активные пользователи для рассылки
SELECT u.telegram_id, u.first_name
FROM users u
LEFT JOIN user_settings us ON u.id = us.user_id
WHERE u.telegram_id IS NOT NULL
  AND (us.notifications_enabled IS NULL OR us.notifications_enabled = true);
```

## 📊 Мониторинг и аналитика

### Логирование

Система логирует:

- ✅ Успешные отправки
- ❌ Ошибки отправки
- 📊 Статистику рассылки
- ⏱️ Время выполнения

### Статистика рассылки

```typescript
interface VibeCodingBroadcastResult {
  success: boolean;
  message: string;
  stats: {
    usersFound: number;
    carouselsGenerated: number;
    messagesSent: number;
    errors: number;
  };
  theme: string;
  style: string;
  executionTime: number;
  timestamp: string;
}
```

## 🔧 Troubleshooting

### Проблемы с векторизацией

1. **Таблицы не существуют**: Запустите SQL скрипты создания схемы
2. **Отсутствует pgvector**: Включите расширение: `CREATE EXTENSION vector;`
3. **Неправильные столбцы**: Проверьте схему таблицы `document_chunks`

### Проблемы с рассылкой

1. **Пользователи не найдены**: Проверьте таблицу `users` и `user_settings`
2. **Ошибки Telegram API**: Проверьте `BOT_TOKEN` и права бота
3. **Rate limits**: Система автоматически обрабатывает батчи по 10 пользователей

### Проблемы с Inngest

1. **Функция не регистрируется**: Проверьте `INNGEST_SIGNING_KEY`
2. **Cron не срабатывает**: Убедитесь, что Inngest Dev Server запущен
3. **Timeout**: Увеличьте таймауты в конфигурации функции

## 🧪 Тестирование

### Структура тестов

```
scripts/
├── test-broadcast-simple.ts      # Упрощённый тест без векторизации
├── test-vibecoding-broadcast.ts  # Полный тест с генерацией карусели
└── vectorize-vibecoding.ts       # Скрипт векторизации
```

### Результаты тестов

Тесты создают отчёты в `test-outputs/`:

- JSON отчёты с метриками
- Сгенерированные изображения карусели
- Логи выполнения

## 🔮 Roadmap

### В разработке:

- 📱 Персонализированные рассылки по интересам
- 🌍 Мультиязычная поддержка
- 📈 A/B тестирование тем и стилей
- 🤖 Адаптивная частота рассылки

### Планируется:

- 🎯 Рекомендательная система на основе AI
- 💬 Интерактивные элементы в карусели
- 📊 Детальная аналитика вовлечённости
- 🔗 Интеграция с внешними платформами

---

## 🕉️ Философия

_"Знание, разделённое с другими, умножается. Автоматизация служения - это путь бодхисаттвы в мире технологий."_

Система рассылки VibeCoding воплощает принципы:

- **Служение**: Регулярная доставка ценных знаний
- **Автоматизация**: Освобождение времени для более важных задач
- **Осознанность**: Тематический и стилистический баланс
- **Сообщество**: Объединение людей вокруг общих ценностей

🙏 **Намасте, код-садхана!**
