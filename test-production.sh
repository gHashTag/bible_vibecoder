#!/bin/bash

echo "🧪 Тестирование бота с production настройками..."

# Устанавливаем все переменные как в production
# ВАЖНО: Установите переменные окружения перед запуском скрипта!
# Например:
# export BOT_TOKEN="your-bot-token"
# export DATABASE_URL="your-database-url"
# export OPENAI_API_KEY="your-openai-key"

export NODE_ENV=development  # Используем development для polling режима
export PORT=8080
export LOG_LEVEL=debug
export TELEGRAM_ID="123456789"  # Тестовый ID

# Проверяем наличие обязательных переменных
if [ -z "$BOT_TOKEN" ]; then
    echo "❌ Ошибка: BOT_TOKEN не установлен!"
    echo "Установите его командой: export BOT_TOKEN='your-token'"
    exit 1
fi

if [ -z "$DATABASE_URL" ]; then
    echo "❌ Ошибка: DATABASE_URL не установлен!"
    echo "Установите его командой: export DATABASE_URL='your-database-url'"
    exit 1
fi

if [ -z "$OPENAI_API_KEY" ]; then
    echo "❌ Ошибка: OPENAI_API_KEY не установлен!"
    echo "Установите его командой: export OPENAI_API_KEY='your-openai-key'"
    exit 1
fi

echo "📦 Сборка проекта..."
bun run build

echo "✅ Запуск бота..."
echo "---"
echo "Переменные окружения:"
echo "NODE_ENV=$NODE_ENV"
echo "PORT=$PORT"
echo "BOT_TOKEN=${BOT_TOKEN:0:20}..."
echo "DATABASE_URL установлен"
echo "OPENAI_API_KEY установлен"
echo "LOG_LEVEL=$LOG_LEVEL"
echo "---"

# Запускаем бота
node dist/server.js
