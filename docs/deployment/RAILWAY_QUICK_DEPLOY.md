# 🚂 Быстрый деплой на Railway - Чек-лист

## 📋 Обязательная подготовка

### ✅ Что уже готово:

- [x] `Dockerfile` - оптимизирован для Railway
- [x] `railway.toml` - конфигурация деплоя
- [x] `.railwayignore` - исключение ненужных файлов
- [x] TypeScript типы проверены
- [x] Проект собирается успешно

### 🔑 Нужно подготовить:

- [ ] **BOT_TOKEN** от BotFather
- [ ] **DATABASE_URL** от Neon (или Railway PostgreSQL)
- [ ] **OPENAI_API_KEY** (опционально для TTS)

## 🚀 5 шагов к деплою

### 1. Railway проект

```bash
# Перейти на railway.app
# Подключить GitHub
# New Project → Deploy from GitHub repo
```

### 2. Переменные окружения

```bash
BOT_TOKEN=your_bot_token_here
DATABASE_URL=postgresql://user:pass@host:port/db
OPENAI_API_KEY=sk-your_openai_key (optional)
```

### 3. База данных (выберите одно)

**Вариант A: Neon (рекомендуется)**

- neon.tech → создать DB → скопировать URL

**Вариант B: Railway PostgreSQL**

- В проекте: New → Database → PostgreSQL

### 4. Деплой

Railway автоматически соберет и задеплоит после push в main ветку GitHub

### 5. Проверка

- Логи: Railway Dashboard → Deployments → Logs
- Тест: отправить `/start` боту в Telegram

## 🔍 Если что-то не работает:

**Ошибка сборки:** проверьте логи Railway  
**Бот не отвечает:** проверьте BOT_TOKEN  
**База данных:** проверьте DATABASE_URL  
**TTS не работает:** проверьте OPENAI_API_KEY

## 📱 Быстрый тест бота

1. Найдите бота в Telegram по username
2. Отправьте `/start`
3. Проверьте ответ бота

---

✨ **Всё готово для деплоя!** ✨
