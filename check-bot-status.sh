#!/bin/bash

BOT_TOKEN="7667727700:AAEJIvtBWxgy_cj_Le_dGMpqA_dz7Pwhj0c"

echo "🔍 Проверка статуса бота..."

# Получаем информацию о боте
echo "1. Информация о боте:"
curl -s "https://api.telegram.org/bot${BOT_TOKEN}/getMe" | python3 -m json.tool

echo -e "\n2. Проверка вебхука:"
curl -s "https://api.telegram.org/bot${BOT_TOKEN}/getWebhookInfo" | python3 -m json.tool

echo -e "\n3. Последние обновления:"
curl -s "https://api.telegram.org/bot${BOT_TOKEN}/getUpdates?limit=5" | python3 -m json.tool | head -50

echo -e "\n✅ Проверка завершена"
