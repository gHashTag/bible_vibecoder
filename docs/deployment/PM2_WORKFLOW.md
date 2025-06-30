# 🕉️ PM2 Development Workflow - Bible VibeCoder

Полное руководство по разработке с PM2, live логами и кастомными портами Inngest.

## 🚀 Быстрый старт

### Одна команда для запуска всего:

```bash
bun dev
```

Эта команда:

- ✅ Проверяет свободность портов 9288 и 9289
- ✅ Запускает Telegram Bot через PM2 с hot reload
- ✅ Запускает Inngest Dev Server на кастомных портах
- ✅ Показывает live логи всех сервисов
- ✅ Автоматически перезапускает при сбоях

### Остановка всех сервисов:

```bash
bun run dev:stop
```

## 📊 Управление сервисами

### Основные команды:

```bash
# Запуск development окружения с live логами
bun dev

# Остановка всех сервисов
bun run dev:stop

# Только бот (без Inngest)
bun run dev:bot-only

# Проверка статуса
bun run pm2:status

# Live логи
bun run pm2:logs

# Интерактивный мониторинг
bun run pm2:monit

# Перезапуск всех сервисов
bun run pm2:restart
```

### PM2 команды напрямую:

```bash
# Статус всех процессов
pm2 status

# Логи конкретного сервиса
pm2 logs telegram-bot
pm2 logs inngest-dev

# Перезапуск конкретного сервиса
pm2 restart telegram-bot
pm2 restart inngest-dev

# Остановка конкретного сервиса
pm2 delete telegram-bot
pm2 delete inngest-dev

# Интерактивный мониторинг
pm2 monit

# Полная очистка PM2
pm2 kill
```

## 🎯 Полезные ссылки при запуске

- **🤖 Telegram Bot**: Работает в фоне с hot reload
- **📊 Inngest Dashboard**: http://localhost:9288/dashboard
- **🔍 PM2 Monitoring**: `pm2 monit` в отдельном терминале

## 📁 Структура логов

```
logs/
├── telegram-bot.log       # Все логи бота
├── telegram-bot-out.log   # Stdout бота
├── telegram-bot-error.log # Stderr бота
├── inngest-dev.log        # Все логи Inngest
├── inngest-dev-out.log    # Stdout Inngest
└── inngest-dev-error.log  # Stderr Inngest
```

## 🔧 Конфигурация PM2

Настройки находятся в `ecosystem.config.cjs`:

```javascript
{
  apps: [
    {
      name: 'telegram-bot',
      script: 'bun',
      args: 'run --watch index.ts', // Hot reload
      max_memory_restart: '500M', // Перезапуск при превышении памяти
      autorestart: true, // Автоперезапуск при сбоях
    },
    {
      name: 'inngest-dev',
      script: 'npx',
      args: ['inngest-cli', 'dev', '--port', '9288', '--gateway-port', '9289'],
      max_memory_restart: '300M',
      autorestart: true,
    },
  ];
}
```

## 🚨 Решение проблем

### Порты заняты

```bash
# Автоматическая проверка и решение
bun dev  # Скрипт сам покажет что делать

# Ручная проверка
lsof -i :9288
lsof -i :9289

# Принудительная остановка
bun run dev:stop
pm2 kill

# Убить конкретный процесс
kill -9 <PID>
```

### PM2 не работает

```bash
# Переустановка PM2
npm uninstall -g pm2
npm install -g pm2

# Сброс PM2
pm2 kill
pm2 update
```

### Логи не показываются

```bash
# Принудительная очистка и перезапуск
pm2 delete all
pm2 kill
bun dev
```

### Процессы не останавливаются

```bash
# Жесткая остановка
pm2 kill

# Если не помогает
sudo pm2 kill

# Поиск зависших процессов
ps aux | grep -E "(bun|inngest|node)"
```

## 🎯 Workflow разработки

### 1. Запуск окружения:

```bash
bun dev
```

### 2. Разработка:

- Редактируйте код - hot reload автоматический
- Смотрите логи в терминале где запустили `bun dev`
- Тестируйте Inngest функции через Dashboard

### 3. Мониторинг:

```bash
# В отдельном терминале
pm2 monit
```

### 4. Остановка:

```bash
# Ctrl+C в терминале с `bun dev`
# Или в другом терминале:
bun run dev:stop
```

## 🌟 Преимущества PM2 подхода

- ✅ **Автоперезапуск** при сбоях
- ✅ **Hot reload** для бота
- ✅ **Изолированные процессы** для каждого сервиса
- ✅ **Centralized logging** в одном месте
- ✅ **Memory monitoring** и автоперезапуск
- ✅ **Live logs** в реальном времени
- ✅ **Easy management** через команды
- ✅ **Production ready** - тот же PM2 для продакшна

## 🔮 Advanced использование

### Только определенный сервис:

```bash
# Только бот
pm2 start ecosystem.config.cjs --only telegram-bot

# Только Inngest
pm2 start ecosystem.config.cjs --only inngest-dev
```

### Изменение конфигурации:

1. Отредактируйте `ecosystem.config.cjs`
2. Перезапустите: `pm2 restart all`

### Production deploy:

```bash
pm2 start ecosystem.config.cjs --env production
```

---

_🕉️ Создано для гармоничной разработки с полным контролем над процессами и логами._
