# 🚂 Railway Deploy Instructions

## ✅ Готовность к деплою

Проект готов к развертыванию на Railway! Все необходимые файлы настроены:

- ✅ `Dockerfile` - multi-stage build с оптимизацией
- ✅ `railway.toml` - конфигурация Railway  
- ✅ `.railwayignore` - исключение ненужных файлов
- ✅ `package-lock.json` - для npm зависимостей
- ✅ Собранный `dist/` - готовый к запуску код

## 🔑 Обязательные переменные окружения

В Railway добавьте следующие переменные:

```bash
# Обязательные
BOT_TOKEN=your_telegram_bot_token_here
DATABASE_URL=postgresql://user:password@host:port/dbname

# Опциональные (для AI функций)
OPENAI_API_KEY=your_openai_key_here
APIFY_TOKEN=your_apify_token_here

# Telegram Webhook (для production)
WEBHOOK_DOMAIN=https://your-app-name.railway.app
```

## 🚀 Процесс деплоя

1. **Перейти на Railway:**
   - https://railway.app
   - Login with GitHub

2. **Создать проект:**
   - New Project → Deploy from GitHub repo
   - Выбрать репозиторий `bible_vibecoder`

3. **Настроить переменные:**
   - Variables → Add все переменные выше

4. **База данных (выберите одно):**
   
   **Вариант A: Neon (рекомендуется)**
   - Создать БД на https://neon.tech
   - Скопировать DATABASE_URL
   
   **Вариант B: Railway PostgreSQL**
   - New → Database → PostgreSQL
   - Railway автоматически создаст DATABASE_URL

5. **Деплой:**
   - Railway автоматически соберет и задеплоит
   - Следить за логами в Deployments → Logs

## 🔍 Проверка после деплоя

1. **Проверить логи:** В Railway → Deployments → View Logs
2. **Протестировать бота:** Отправить `/start` в Telegram
3. **Проверить health:** Открыть https://your-app.railway.app

## ⚠️ Troubleshooting

**Ошибка сборки:**
- Проверить логи сборки в Railway
- Убедиться, что `bun run build:full` работает локально

**Бот не отвечает:**
- Проверить BOT_TOKEN в переменных
- Проверить логи на ошибки

**База данных:**
- Проверить DATABASE_URL
- Убедиться, что БД доступна

**Webhook не работает:**
- Добавить WEBHOOK_DOMAIN переменную
- Проверить, что URL правильный

## 🎉 Готово!

После успешного деплоя бот будет работать 24/7 на Railway.

---

_Ом Шанти. Пусть Кощей Бессмертный обретет свое облачное тело._ 🙏
