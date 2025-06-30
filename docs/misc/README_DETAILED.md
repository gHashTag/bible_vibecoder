<div align="center">

# 🕉️ VibeCode Bible

*The Sacred Scripture of Conscious Programming*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-blue.svg)](https://www.typescriptlang.org/)
[![Bun](https://img.shields.io/badge/Bun-1.0+-orange.svg)](https://bun.sh/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Telegram Bot](https://img.shields.io/badge/Telegram-Bot-blue.svg)](https://core.telegram.org/bots)
[![Vitest](https://img.shields.io/badge/Tested_with-Vitest-green.svg)](https://vitest.dev/)
[![Railway Deploy](https://img.shields.io/badge/Deploy-Railway-purple.svg)](https://railway.app)

*Meditative Programming • Clean Architecture • TDD Mastery*

[📚 Documentation](docs/) • [🚀 Quick Start](#-quick-start) • [🤝 Contributing](CONTRIBUTING.md) • [📜 Changelog](CHANGELOG.md)

</div>

---

## 🌟 О проекте

> *"Код - это медитация в действии"* 🧘‍♂️

**VibeCode Bible** - это не просто Telegram bot starter kit. Это философия осознанной разработки, воплощенная в коде. Проект создан для обучения и вдохновения разработчиков, которые стремятся к совершенству через медитативное программирование.

### 🎯 Для кого этот проект?

- 🧘‍♂️ **Для медитативных программистов** - тех, кто пишет код осознанно
- 🎓 **Для изучающих TDD** - полный цикл Test-Driven Development
- 🏗️ **Для архитекторов** - образец чистой архитектуры
- 🤝 **Для сообщества** - Open Source проект для совместного роста

## ✨ Основные возможности

- 🧩 **Функциональный подход**: Чистый, модульный и легко тестируемый код
- 📋 **Строгая типизация**: Полная поддержка TypeScript 
- 🔄 **Wizard-сцены**: Многошаговые диалоги с пользователями
- 💾 **Система хранения**: Универсальные адаптеры для различных БД
- 🗄️ **Drizzle ORM + Neon**: Интеграция с PostgreSQL
- 🚀 **Apollo Client**: Поддержка GraphQL API
- 🧪 **Тестирование**: Unit, integration и e2e тесты с Vitest
- 📝 **Логирование**: Продвинутая система логов
- 🌐 **Middleware**: Обработка ошибок и управление сессиями
- 🔍 **Валидация**: Встроенная поддержка Zod

## 🚀 Быстрый старт

### Установка и настройка

```bash
# Клонируем репозиторий
git clone <repository-url>
cd bible_vibecoder

# Устанавливаем зависимости
bun install

# Настраиваем переменные окружения
cp example.env .env
# Отредактируйте .env файл, добавив ваш BOT_TOKEN

# Запускаем в режиме разработки
bun run dev
```

### Основные команды

```bash
# Разработка
bun run dev              # Запуск с автоперезагрузкой
bun run dev:fast         # Быстрый запуск без перезагрузки
bun run dev:stop         # Остановка dev-сервера

# Сборка и продакшн
bun run build            # Сборка проекта
bun run start            # Запуск собранного проекта

# Тестирование и качество кода
bun run test             # Запуск всех тестов
bun run test:watch       # Тесты в режиме наблюдения
bun run test:coverage    # Тесты с покрытием
bun run typecheck        # Проверка типов TypeScript
bun run lint             # Проверка кода ESLint

# Генерация и управление
bun run generate:scene   # Создание новой wizard-сцены
bun run tdd <file>       # TDD-цикл для файла

# База данных (Drizzle)
bunx drizzle-kit generate  # Генерация миграций
bunx drizzle-kit migrate   # Применение миграций
bunx drizzle-kit studio   # Drizzle Studio

# Inngest (события)
bun run inngest:dev        # Запуск Inngest dev сервера

# PM2 (продакшн)
bun run pm2:status         # Статус процессов
bun run pm2:logs           # Логи
bun run pm2:restart        # Перезапуск
```

## 📁 Структура проекта

```
bible_vibecoder/
├── 📁 docs/                    # 📚 Документация
│   ├── deployment/             # Развертывание (Railway, PM2, Docker)
│   ├── development/            # Разработка, тестирование, паттерны
│   ├── quickstart/             # Быстрый старт (Google Calendar, Inngest)
│   └── *.md                    # Документы по различным аспектам
│
├── 📁 scripts/                 # 🔧 Скрипты и утилиты
│   ├── dev-*.sh               # Скрипты разработки
│   ├── start-*.sh             # Скрипты запуска
│   ├── test-*.ts              # Тестовые скрипты
│   ├── generate-*.ts          # Генераторы
│   └── *.sh, *.ts             # Различные утилиты
│
├── 📁 tools/                   # ⚙️ Инструменты и конфигурация
│   ├── config/                # Конфиги (vitest, drizzle, docker и т.д.)
│   └── misc/                  # Разное
│
├── 📁 src/                     # 💻 Исходный код
│   ├── adapters/              # Адаптеры хранилища
│   ├── db/                    # Drizzle ORM: схемы, подключение
│   ├── graphql/               # Apollo Client
│   ├── inngest/               # Inngest функции и сервер
│   ├── middlewares/           # Middleware для Telegraf
│   ├── services/              # Бизнес-логика
│   ├── templates/             # Шаблоны (wizard-сцены)
│   ├── utils/                 # Утилиты
│   ├── __tests__/             # Тесты
│   ├── bot.ts                 # Основная логика бота
│   ├── commands.ts            # Команды бота
│   ├── config.ts              # Конфигурация
│   └── types.ts               # TypeScript типы
│
├── 📁 vibecoding/              # 🎯 Специфичная документация VibeCode
├── 📁 .cursor/                 # 🤖 Правила для AI-агентов
├── 📁 assets/                  # 🖼️ Ресурсы (изображения, шрифты)
├── 📁 carousel-output/         # 📸 Сгенерированные карусели
├── 📁 logs/                    # 📊 Файлы логов
├── 📁 test-output/             # 🧪 Результаты тестов
│
├── 📄 README.md                # Этот файл
├── 📄 SUCCESS_HISTORY.md       # История успешных решений
├── 📄 package.json             # NPM зависимости и скрипты
├── 📄 tsconfig.json            # Настройки TypeScript
├── 📄 .env.example             # Пример переменных окружения
└── 📄 index.ts                 # Точка входа приложения
```

## 📚 Документация

### Быстрый старт
- [📋 Готов к использованию](docs/quickstart/READY_TO_USE.md) - Краткая инструкция по запуску
- [📅 Google Calendar Setup](docs/quickstart/GOOGLE_CALENDAR_MCP_QUICK_SETUP.md) - Настройка календаря
- [⚡ Inngest Quickstart](docs/quickstart/INNGEST_QUICKSTART.md) - Быстрый старт с Inngest

### Разработка
- [🔧 Development Guide](docs/development/DEVELOPMENT.md) - Полное руководство по разработке
- [🧪 Testing](docs/development/TESTING.md) - Стратегии тестирования
- [📋 Testing Patterns](docs/development/TESTING_PATTERNS.md) - Паттерны для тестов

### Развертывание
- [🚀 Railway Deployment](docs/deployment/RAILWAY_DEPLOYMENT.md) - Развертывание на Railway
- [⚡ Railway Quick Deploy](docs/deployment/RAILWAY_QUICK_DEPLOY.md) - Быстрое развертывание
- [🔄 PM2 Workflow](docs/deployment/PM2_WORKFLOW.md) - Управление процессами с PM2

### Специфичная документация
- [📚 VibeCoding Bible](vibecoding/) - Подробная документация по VibeCode методологии

## 🔧 Конфигурация

Основные конфигурационные файлы находятся в `tools/config/`:

- `vitest.config.ts` - Настройки тестирования
- `drizzle.config.ts` - Настройки ORM и миграций  
- `ecosystem.config.cjs` - Конфигурация PM2
- `docker-compose.yml` - Docker конфигурация

## 🗄️ База данных

Проект использует Drizzle ORM с PostgreSQL (Neon):

```typescript
// Пример работы с БД
import { db } from "./src/db";
import { users } from "./src/db/schema";
import { eq } from "drizzle-orm";

const user = await db.query.users.findFirst({
  where: eq(users.telegram_id, "123456")
});
```

## 🔗 GraphQL

Для работы с GraphQL API используется Apollo Client:

```typescript
import { apolloClient } from "./src/graphql/client";
import { gql } from "@apollo/client";

const GET_DATA = gql`query GetData { ... }`;
const { data } = await apolloClient.query({ query: GET_DATA });
```

## 🤖 AI-агенты

Проект оптимизирован для работы с AI-агентами. Правила и инструкции находятся в `.cursor/rules/`.

## 📊 Мониторинг и логи

- Логи приложения: `logs/`
- Тестовые отчеты: `test-output/`
- Сгенерированный контент: `carousel-output/`

## 🧪 Тестирование

Комплексная система тестирования с использованием Vitest:

- **Unit тесты**: Изолированное тестирование компонентов
- **Integration тесты**: Тестирование взаимодействий
- **E2E тесты**: Полное тестирование пользовательских сценариев

## 🔨 Разработка

### TDD цикл
Используйте команду `bun run tdd <test-file>` для TDD разработки.

### Генерация wizard-сцен
```bash
bun run generate:scene
```

### Проверка качества кода
```bash
bun run typecheck && bun run lint && bun run test
```

## 📋 Open Source стандарты

Проект полностью соответствует стандартам Open Source сообщества:

| Файл | Описание | Статус |
|------|----------|--------|
| [LICENSE](LICENSE) | MIT лицензия | ✅ |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Руководство для контрибьюторов | ✅ |
| [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) | Кодекс поведения сообщества | ✅ |
| [SECURITY.md](SECURITY.md) | Политика безопасности | ✅ |
| [CHANGELOG.md](CHANGELOG.md) | История изменений | ✅ |
| [.github/](.github/) | Шаблоны Issues и PR | ✅ |
| [docs/](docs/) | Комплексная документация | ✅ |

## 🤝 Участие в проекте

Мы приветствуем вклад любого размера! Читайте [CONTRIBUTING.md](CONTRIBUTING.md) для получения подробной информации о том, как участвовать в проекте.

## 📄 Лицензия

Этот проект лицензирован под [MIT License](LICENSE) - смотрите файл лицензии для подробностей.

## 🙏 Благодарности

- Всем контрибьюторам, которые делают этот проект лучше
- Open Source сообществу за вдохновение и инструменты
- Древним мудрецам за философские основы

---

🕉️ **Создано с мудростью и следуя принципам чистого кода и Open Source духа**
