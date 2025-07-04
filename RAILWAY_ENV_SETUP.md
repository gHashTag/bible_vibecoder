# 🚀 Настройка переменных окружения в Railway

## Критически важные переменные для работы бота

Скопируйте этот блок и вставьте в Railway → Variables:

```bash
# ОБЯЗАТЕЛЬНЫЕ ПЕРЕМЕННЫЕ
NODE_ENV=production
BOT_TOKEN=7667727700:AAEJIvtBWxgy_cj_Le_dGMpqA_dz7Pwhj0c

# Для вебхука (Railway автоматически создаст URL)
# Не нужно устанавливать вручную, если есть RAILWAY_STATIC_URL

# Для крон-функции (узнайте через @userinfobot)
TELEGRAM_ID=ваш_telegram_id

# База данных (если используете)
DATABASE_URL=ваша_база_данных_url

# AI функции (если используете)
OPENAI_API_KEY=ваш_openai_key
```

## Проблемы и решения

### 1. Бот не отвечает на команды

**Проверьте в логах Railway:**
- Есть ли сообщение "Webhook successfully set"?
- Есть ли ошибки при запуске?

**Если вебхук не устанавливается:**
1. Railway автоматически предоставляет `RAILWAY_STATIC_URL`
2. Наш код использует её для вебхука
3. Убедитесь, что `NODE_ENV=production`

### 2. Временное решение - запуск в polling режиме

Если вебхук не работает, можно временно использовать polling:

```bash
# Измените в Railway Variables:
NODE_ENV=development
```

Это заставит бота работать в режиме polling (менее эффективно, но работает).

### 3. Проверка работы бота

После установки переменных и редеплоя:
1. Откройте логи в Railway
2. Найдите строку "Bot is running in webhook mode" или "Bot is running in polling mode"
3. Отправьте `/start` боту в Telegram

## Команда для быстрой проверки локально

```bash
# Проверка с вашим токеном
BOT_TOKEN=7667727700:AAEJIvtBWxgy_cj_Le_dGMpqA_dz7Pwhj0c NODE_ENV=development bun run start
```

## Если ничего не помогает

Покажите мне логи из Railway Dashboard, и я помогу диагностировать проблему!
