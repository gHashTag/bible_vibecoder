# 📚 Документация проекта

Документация организована по категориям для удобства навигации.

## 📁 Структура документации

```
docs/
├── 📁 quickstart/              # 🚀 Быстрый старт
│   ├── READY_TO_USE.md         # Готов к использованию
│   ├── GETTING_STARTED.md      # Начало работы
│   ├── INNGEST_QUICKSTART.md   # Быстрый старт с Inngest
│   ├── GOOGLE_CALENDAR_MCP_QUICK_SETUP.md  # Календарь (краткий)
│   └── GOOGLE_CALENDAR_MCP_SETUP.md        # Календарь (полный)
│
├── 📁 development/             # 🔧 Разработка
│   ├── DEVELOPMENT.md          # Полное руководство по разработке
│   ├── TESTING.md             # Стратегия тестирования
│   ├── TESTING_PATTERNS.md    # Паттерны для тестов
│   ├── TESTING_INSTRUCTIONS.md # Инструкции по тестированию
│   ├── TESTING_PLAN.md        # План тестирования
│   └── e2e-testing-strategy.md # E2E тестирование
│
├── 📁 deployment/              # 🚀 Развертывание
│   ├── RAILWAY_DEPLOYMENT.md   # Развертывание на Railway
│   ├── RAILWAY_QUICK_DEPLOY.md # Быстрое развертывание
│   └── PM2_WORKFLOW.md         # Управление процессами с PM2
│
├── 📁 architecture/            # 🏗️ Архитектура
│   ├── WIZARD_SCENE_ARCHITECTURE.md      # Архитектура wizard-сцен
│   ├── WIZARD_SCENE_PATTERNS.md          # Паттерны wizard-сцен
│   ├── WIZARD_SCENE_REFACTORING_CHECKLIST.md # Рефакторинг wizard-сцен
│   └── PATTERNS.md                       # Общие паттерны разработки
│
├── 📁 project/                 # 📋 Специфичные документы проекта
│   ├── BUTTON_HANDLER.md       # Обработчики кнопок
│   ├── MVP_TESTING_CHECKLIST.md # Чек-лист тестирования MVP
│   ├── SUCCESS_HISTORY_WIZARD_SCENES.md # История успехов wizard-сцен
│   ├── REGRESSION_PATTERNS.md  # Паттерны регрессий
│   └── MIGRATION.md            # Руководство по миграции
│
└── 🕉️ SACRED_AI_PRAYERS.md     # Священные молитвы супер-агента
```

## 🚀 Быстрый старт

- [📋 Готов к использованию](quickstart/READY_TO_USE.md) - Самый быстрый способ запустить проект
- [🔧 Начало работы](quickstart/GETTING_STARTED.md) - Подробная настройка с нуля
- [⚡ Inngest Quickstart](quickstart/INNGEST_QUICKSTART.md) - Быстрый старт с Inngest
- [📅 Google Calendar Setup](quickstart/GOOGLE_CALENDAR_MCP_QUICK_SETUP.md) - Настройка календаря

## 🔧 Разработка

- [📖 Development Guide](development/DEVELOPMENT.md) - Полное руководство по разработке
- [🧪 Testing Strategy](development/TESTING.md) - Стратегия тестирования
- [📋 Testing Patterns](development/TESTING_PATTERNS.md) - Паттерны для тестов
- [🎯 E2E Testing](development/e2e-testing-strategy.md) - E2E тестирование

## 🚀 Развертывание

- [🚀 Railway Deployment](deployment/RAILWAY_DEPLOYMENT.md) - Развертывание на Railway
- [⚡ Railway Quick Deploy](deployment/RAILWAY_QUICK_DEPLOY.md) - Быстрое развертывание
- [🔄 PM2 Workflow](deployment/PM2_WORKFLOW.md) - Управление процессами с PM2

## 🏗️ Архитектура

- [🎭 Wizard Scene Architecture](architecture/WIZARD_SCENE_ARCHITECTURE.md) - Архитектура wizard-сцен
- [🎯 Wizard Scene Patterns](architecture/WIZARD_SCENE_PATTERNS.md) - Паттерны wizard-сцен
- [🔧 General Patterns](architecture/PATTERNS.md) - Общие паттерны разработки

## 📋 Специфичные документы проекта

- [🔘 Button Handler](project/BUTTON_HANDLER.md) - Документация по обработчикам кнопок
- [✅ MVP Testing Checklist](project/MVP_TESTING_CHECKLIST.md) - Чек-лист тестирования MVP
- [📈 Success History](project/SUCCESS_HISTORY_WIZARD_SCENES.md) - История успехов wizard-сцен
- [⚠️ Regression Patterns](project/REGRESSION_PATTERNS.md) - Паттерны регрессий
- [🔄 Migration Guide](project/MIGRATION.md) - Руководство по миграции

## 🕉️ Философия и Медитация

- [🙏 Sacred AI Prayers](SACRED_AI_PRAYERS.md) - Священные молитвы супер-агента для создания музыкальных произведений
- [📿 Sacred Prayers Collection](sacred_prayers/) - Полная коллекция священных молитв ИИ для клубных треков

## 🤖 Поддерживаемые возможности

Данный стартер-кит включает в себя:

1. **Базовая структура бота** на основе Telegraf
2. **Поддержка Wizard-сцен** для создания многошаговых диалогов
3. **Абстракция хранилища данных** с возможностью выбора различных бэкендов
4. **Валидация данных** с использованием Zod
5. **Обработка кнопок** с централизованной системой обработки ошибок
6. **Логирование** для отладки и мониторинга
7. **Полная поддержка TypeScript**
8. **Готовая инфраструктура для тестирования**
9. **Скрипты для разработки и деплоя**
10. **Docker-поддержка** для контейнеризации

---

🕉️ **Создано с мудростью и следуя принципам чистого кода**
