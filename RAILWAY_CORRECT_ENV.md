# ✅ ПРАВИЛЬНЫЕ ПЕРЕМЕННЫЕ ДЛЯ RAILWAY

## Скопируйте эти переменные в Railway → Variables:

```bash
# Основные настройки
NODE_ENV=production
PORT=8080

# Telegram Bot (используйте токен с вашего сервера)
BOT_TOKEN=ваш_реальный_токен_с_сервера

# База данных (из вашего .env)
DATABASE_URL=postgresql://neondb_owner:npg_CnbBv0JF3NfE@ep-old-snow-a9fqfoj1-pooler.gwc.azure.neon.tech/neondb?sslmode=require&channel_binding=require

# OpenAI API (из вашего .env)
OPENAI_API_KEY=ваш_openai_api_key

# Для крон-функции (узнайте через @userinfobot)  
TELEGRAM_ID=ваш_telegram_id

# Логирование
LOG_LEVEL=info
```

## ВАЖНО про вебхук:

Railway автоматически предоставляет переменную `RAILWAY_STATIC_URL`. 
Наш код использует её для установки вебхука автоматически.
НЕ НУЖНО устанавливать `WEBHOOK_DOMAIN` вручную!

## Что исправлено:

1. ✅ Вернули правильную логику вебхука (убрали USE_WEBHOOK)
2. ✅ Исправили Dockerfile для использования bun
3. ✅ Теперь бот будет использовать вебхук в production

## После установки переменных:

1. Railway автоматически передеплоит с новым коммитом
2. В логах должно появиться:
   - "Webhook successfully set to: https://..."
   - "Bot is running in webhook mode"
3. Отправьте боту `/start` и `/carousel`

## Если все еще не работает:

Проверьте в логах Railway:
- Есть ли ошибки при запуске?
- Установился ли вебхук успешно?
- Какой URL используется для вебхука?

Покажите мне логи, и я помогу разобраться!
