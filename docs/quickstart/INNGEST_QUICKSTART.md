# 🕉️ Inngest Quick Start - Bible VibeCoder

Быстрый старт для работы с Inngest функциями на кастомных портах **9288** и **9289**.

## 🚀 Запуск (3 простых шага)

### 1. Настройка переменных окружения

```bash
# Создайте .env файл или убедитесь что есть эти настройки:
INNGEST_DEV_PORT=9288
INNGEST_CONNECT_PORT=9289
```

### 2. Запуск Inngest Dev Server

```bash
# Автоматический запуск с проверкой портов
npm run inngest:dev

# Или ручной запуск
npm run inngest:dev:manual
```

### 3. Проверка работы

- **Dashboard**: http://localhost:9288/dashboard
- **Health Check**: http://localhost:9288/health (если используете автономный сервер)

## 🎯 Тестирование "Hello World" функции

### Отправка события через код:

```typescript
import { sendHelloWorldEvent } from './src/inngest';

// Простая отправка
await sendHelloWorldEvent({
  name: 'Гуру',
  language: 'ru',
});

// Ожидаемый результат:
// {
//   message: "Привет, Гуру! 🕉️",
//   processedAt: "2024-01-01T00:00:00.000Z",
//   environment: { nodeEnv: "development", inngestPort: 9288 }
// }
```

### Отправка через Inngest Dashboard:

1. Откройте http://localhost:9288/dashboard
2. Перейдите в раздел "Functions"
3. Найдите функцию "hello-world"
4. Нажмите "Trigger Function"
5. Введите JSON:

```json
{
  "name": "demo/hello.world",
  "data": {
    "name": "Ваше Имя",
    "language": "ru"
  }
}
```

## 🔧 Доступные команды

```bash
# Запуск Inngest Dev Server
npm run inngest:dev

# Ручной запуск с портами
npm run inngest:dev:manual

# Проверка занятости портов
npm run inngest:check-ports

# Проверка типов
npm run typecheck

# Запуск тестов (включая Inngest)
npm run test
```

## 🚨 Решение проблем

### Порты заняты

```bash
# Проверить что использует порты
lsof -i :9288
lsof -i :9289

# Убить процессы
kill -9 <PID>

# Или автоматически через скрипт
npm run inngest:dev  # проверит порты автоматически
```

### Функция не срабатывает

1. ✅ Убедитесь что Inngest Dev Server запущен
2. ✅ Проверьте Dashboard http://localhost:9288/dashboard
3. ✅ Убедитесь что имя события правильное: `"demo/hello.world"`
4. ✅ Проверьте логи в консоли

## 📁 Структура файлов

```
src/inngest/
├── client.ts                 # ⚙️ Конфигурация клиента
├── server.ts                 # 🖥️ HTTP сервер
├── functions/
│   ├── index.ts             # 📋 Реестр функций
│   └── hello-world.ts       # 👋 Hello World функция
├── index.ts                 # 📤 Главный экспорт
└── README.md                # 📖 Подробная документация

scripts/
└── start-inngest.sh         # 🎬 Скрипт запуска

src/__tests__/inngest/       # 🧪 Тесты (НЕ запускаются автоматически)
├── test-utils.ts           # 🛠️ Утилиты для тестирования
├── hello-world.test.ts     # ✅ Тесты Hello World
└── configuration.test.ts   # ⚙️ Тесты конфигурации
```

## 🎯 Следующие шаги

1. **Изучите документацию**: `src/inngest/README.md`
2. **Создайте свою функцию**: Скопируйте `hello-world.ts` как шаблон
3. **Добавьте функцию в реестр**: `src/inngest/functions/index.ts`
4. **Напишите тесты**: Используйте `src/__tests__/inngest/test-utils.ts`

---

## 🌟 Особенности нашей интеграции

- ✅ **Кастомные порты** (9288/9289) для избежания конфликтов
- ✅ **Полная типизация** TypeScript
- ✅ **Готовая тестовая инфраструктура** с моками и утилитами
- ✅ **Автоматическая проверка портов** при запуске
- ✅ **Структурированные шаги** в функциях
- ✅ **Обработка ошибок** и retry логика
- ✅ **Многоязычная поддержка** в демо функции
- ✅ **Полная документация** и примеры

_Создано с любовью и следованием лучшим практикам Inngest! 🕉️_
