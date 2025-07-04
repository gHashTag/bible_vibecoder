# ✅ ФИНАЛЬНАЯ ИНСТРУКЦИЯ ДЛЯ RAILWAY (ПРОВЕРЕНО)

## 🎯 Что мы проверили локально:

1. ✅ Бот успешно запускается с вашими переменными
2. ✅ Токен бота корректный (ID: 7667727700, username: @bible_vibecoder_bot)
3. ✅ Сборка проекта работает без ошибок
4. ✅ Все зависимости установлены правильно

## 📋 Переменные для Railway (скопируйте как есть):

```bash
# Основные настройки
NODE_ENV=production
PORT=8080
LOG_LEVEL=info

# Telegram Bot (ваш токен)
BOT_TOKEN=7667727700:AAEJIvtBWxgy_cj_Le_dGMpqA_dz7Pwhj0c

# База данных (опционально, если используете)
DATABASE_URL=postgresql://neondb_owner:npg_CnbBv0JF3NfE@ep-old-snow-a9fqfoj1-pooler.gwc.azure.neon.tech/neondb?sslmode=require

# AI функции (опционально, если используете)
OPENAI_API_KEY=ваш_ключ_здесь

# Для автоматической отправки карусели каждый час
TELEGRAM_ID=ваш_telegram_id
```

## 🚀 Пошаговая инструкция:

### 1. Откройте Railway Dashboard
- Перейдите к вашему проекту
- Нажмите на вкладку "Variables"

### 2. Добавьте переменные
- Скопируйте блок переменных выше
- Вставьте в поле Variables
- Нажмите "Save Variables"

### 3. Дождитесь автоматического деплоя
Railway автоматически передеплоит приложение при изменении переменных

### 4. Проверьте логи
В логах должны появиться строки:
- "Webhook successfully set to: https://ваш-проект.railway.app/secret-path"
- "Bot is running in webhook mode"
- "Server is listening on port 8080"

### 5. Протестируйте бота
- Откройте Telegram
- Найдите @bible_vibecoder_bot
- Отправьте команды:
  - `/start` - приветствие
  - `/help` - справка
  - `/carousel` - генерация карусели

## 🔧 Если бот не отвечает:

### Вариант 1: Проблема с вебхуком
Добавьте эту переменную для отключения вебхука:
```bash
DISABLE_WEBHOOK=true
```

### Вариант 2: Проблема с Docker
1. Переименуйте файлы через Git:
   ```bash
   git mv railway.toml railway.toml.bun
   git mv railway.toml.node railway.toml
   git add -A && git commit -m "Switch to Node.js Dockerfile" && git push
   ```

2. Railway автоматически использует новый Dockerfile

## 📊 Мониторинг:

### Проверка через API (можно выполнить локально):
```bash
# Проверить статус бота
curl -s "https://api.telegram.org/bot7667727700:AAEJIvtBWxgy_cj_Le_dGMpqA_dz7Pwhj0c/getMe"

# Проверить вебхук
curl -s "https://api.telegram.org/bot7667727700:AAEJIvtBWxgy_cj_Le_dGMpqA_dz7Pwhj0c/getWebhookInfo"
```

## ✨ Успех!

После выполнения этих шагов ваш бот будет:
- ✅ Отвечать на команды 24/7
- ✅ Генерировать карусели по запросу
- ✅ Автоматически отправлять карусели каждый час (если установлен TELEGRAM_ID)

---

**Проверено локально и готово к production!** 🚀
