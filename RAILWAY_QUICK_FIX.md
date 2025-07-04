# 🚀 БЫСТРОЕ РЕШЕНИЕ ДЛЯ RAILWAY

## Скопируйте эти переменные в Railway → Variables

```bash
NODE_ENV=production
BOT_TOKEN=7667727700:AAEJIvtBWxgy_cj_Le_dGMpqA_dz7Pwhj0c
USE_WEBHOOK=false
PORT=8080
```

## Что это делает:

1. `NODE_ENV=production` - запускает бота в production режиме
2. `BOT_TOKEN` - ваш токен бота (уже подставлен)
3. `USE_WEBHOOK=false` - заставляет бота работать в polling режиме (временное решение)
4. `PORT=8080` - порт для HTTP сервера

## После установки переменных:

1. Нажмите **Deploy** в Railway
2. Дождитесь завершения деплоя
3. Проверьте логи - должно появиться:
   - "Bot is running in polling mode"
   - "Server is listening on port 8080"
4. Откройте Telegram и отправьте боту `/start`

## Когда бот заработает:

Вы сможете:
- Использовать команду `/carousel` для генерации карусели
- Получать автоматические карусели каждый час (нужно добавить TELEGRAM_ID)

## Для крон-функции добавьте:

```bash
TELEGRAM_ID=ваш_telegram_id_здесь
```

Узнать свой ID можно через @userinfobot в Telegram.

---

**Это временное решение!** Позже мы настроим правильную работу через вебхук.
