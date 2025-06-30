# 🚂 Деплой Telegram Бота на Railway

## 🎯 Подготовка к деплою

### 1. Обязательные переменные окружения для Railway

Перед деплоем убедитесь, что у вас есть следующие данные:

#### 🔑 Обязательные переменные:

- `BOT_TOKEN` - токен Telegram бота от BotFather
- `DATABASE_URL` - строка подключения к PostgreSQL (рекомендуется Neon)

#### 🛠 Дополнительные переменные:

- `OPENAI_API_KEY` - ключ OpenAI для TTS функций
- `NODE_ENV=production` (устанавливается автоматически)
- `LOG_LEVEL=info` (по умолчанию)
- `PORT` (назначается Railway автоматически)

#### 🎤 TTS настройки (опционально):

- `TTS_MODEL=gpt-4o-mini-tts`
- `TTS_VOICE=alloy`
- `TTS_OUTPUT_FORMAT=mp3`
- `CACHE_TTL=3600`
- `AUDIO_CACHE_DIR=./cache/audio`

## 🚀 Процесс деплоя

### Шаг 1: Подготовка GitHub репозитория

1. Убедитесь, что код загружен в GitHub репозиторий
2. Проверьте, что все файлы присутствуют:
   - `Dockerfile` ✅
   - `railway.toml` ✅
   - `package.json` ✅
   - `bun.lock` ✅

### Шаг 2: Создание проекта на Railway

1. Перейдите на [railway.app](https://railway.app)
2. Подключите ваш GitHub аккаунт
3. Нажмите "New Project"
4. Выберите "Deploy from GitHub repo"
5. Выберите ваш репозиторий с ботом

### Шаг 3: Настройка переменных окружения

В настройках проекта Railway добавьте переменные:

```bash
# Обязательные
BOT_TOKEN=your_telegram_bot_token_here
DATABASE_URL=postgresql://user:password@host:port/dbname

# Опциональные (для TTS функций)
OPENAI_API_KEY=your_openai_key_here
TTS_MODEL=gpt-4o-mini-tts
TTS_VOICE=alloy
TTS_OUTPUT_FORMAT=mp3
CACHE_TTL=3600

# Логирование
LOG_LEVEL=info
```

### Шаг 4: Настройка базы данных (рекомендуется Neon)

#### Вариант A: Использование Neon (рекомендуется)

1. Создайте аккаунт на [neon.tech](https://neon.tech)
2. Создайте новую базу данных
3. Скопируйте строку подключения
4. Добавьте её как `DATABASE_URL` в Railway

#### Вариант B: Railway PostgreSQL

1. В проекте Railway нажмите "New"
2. Выберите "Database" → "PostgreSQL"
3. Railway автоматически создаст переменную `DATABASE_URL`

### Шаг 5: Миграции базы данных

Railway автоматически запустит сборку и деплой. Если используете Drizzle ORM, миграции запустятся автоматически при сборке.

## 🔧 Конфигурация Railway

Файл `railway.toml`:

```toml
[build]
builder = "DOCKERFILE"

[deploy]
startCommand = "bun run start"
restartPolicyType = "ON_FAILURE"
restartPolicyMaxRetries = 10

[source]
type = "git"

[variables]
NODE_ENV = "production"
PORT = "3000"
```

## 🐳 Docker конфигурация

Railway использует наш оптимизированный `Dockerfile`:

- Использует официальный образ Bun
- Автоматически собирает проект через `prepare` скрипт
- Запускается через `bun run start`

## 📊 Мониторинг и логи

### Просмотр логов:

1. Перейдите в ваш проект на Railway
2. Откройте вкладку "Deployments"
3. Выберите активный деплой
4. Перейдите в "Logs"

### Полезные команды для отладки:

```bash
# Проверка статуса бота (добавьте в код)
console.log('Bot is starting...');

# Логирование ошибок
logger.error('Error details', { error: formatError(err) });
```

## 🔍 Проверка деплоя

### Чекпоинты успешного деплоя:

- ✅ Сборка завершается без ошибок
- ✅ В логах видно "Бот успешно запущен"
- ✅ Бот отвечает на команды в Telegram
- ✅ База данных подключена
- ✅ TTS функции работают (если настроены)

### Основные проблемы и решения:

#### 🚨 Ошибка: "BOT_TOKEN is required"

**Решение:** Добавьте переменную `BOT_TOKEN` в настройках Railway

#### 🚨 Ошибка подключения к базе данных

**Решение:** Проверьте `DATABASE_URL` и доступность базы данных

#### 🚨 Ошибка сборки TypeScript

**Решение:** Запустите `bun exec tsc --noEmit` локально и исправьте ошибки

#### 🚨 Ошибки OpenAI/TTS

**Решение:** Убедитесь, что `OPENAI_API_KEY` задан и действителен

## 🎉 После успешного деплоя

1. **Протестируйте бота** - отправьте команду `/start`
2. **Проверьте логи** - убедитесь в отсутствии ошибок
3. **Добавьте в группы** - если планируете использовать в группах
4. **Настройте мониторинг** - следите за здоровьем приложения

## 🔄 Обновления

Railway автоматически передеплоит приложение при push в основную ветку GitHub. Для ручного обновления используйте кнопку "Redeploy" в интерфейсе Railway.

---

_Ом Шанти. Пусть бот служит с чистым кодом и стабильным подключением._ 🙏
