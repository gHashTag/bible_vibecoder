#!/bin/bash

echo "🔧 Тестирование бота локально..."

# Устанавливаем переменные окружения
export BOT_TOKEN="7667727700:AAEJIvtBWxgy_cj_Le_dGMpqA_dz7Pwhj0c"
export NODE_ENV="development"
export LOG_LEVEL="debug"

# Сначала собираем проект
echo "📦 Сборка проекта..."
bun run build

# Проверяем, что dist/server.js существует
if [ ! -f "dist/server.js" ]; then
    echo "❌ Ошибка: dist/server.js не найден!"
    echo "Попробуем запустить через bun напрямую..."
    bun run src/server.ts
else
    echo "✅ Запускаем бота..."
    node dist/server.js
fi
