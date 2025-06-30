# 📅 Установка Google Calendar MCP Server

**Источник:** [nspady/google-calendar-mcp](https://github.com/nspady/google-calendar-mcp.git)

## 🎯 Возможности сервера

- ✅ **Получение списка событий** (решает нашу проблему!)
- ✅ **Создание, обновление, удаление событий**
- ✅ **Поиск событий**
- ✅ **Поддержка нескольких календарей**
- ✅ **Автоматическая аутентификация OAuth**

## 🛠️ Установка

### Шаг 1: Проверка установки

MCP сервер уже доступен через bunx:

```bash
bunx @cocal/google-calendar-mcp --help
```

### Шаг 2: Настройка Google OAuth Credentials

#### 2.1 Создание проекта в Google Cloud Console

1. Перейдите в [Google Cloud Console](https://console.cloud.google.com/)
2. Создайте новый проект или выберите существующий
3. Включите Google Calendar API:
   - Перейдите в "APIs & Services" > "Library"
   - Найдите "Google Calendar API"
   - Нажмите "Enable"

#### 2.2 Создание OAuth 2.0 Credentials

1. Перейдите в "APIs & Services" > "Credentials"
2. Нажмите "Create Credentials" > "OAuth client ID"
3. Выберите "Desktop application"
4. Укажите имя (например, "Google Calendar MCP")
5. Скачайте JSON файл с credentials

#### 2.3 Настройка OAuth Consent Screen

1. Перейдите в "APIs & Services" > "OAuth consent screen"
2. Выберите "External" (если не организация)
3. Заполните обязательные поля:
   - App name
   - User support email
   - Developer contact information
4. Добавьте себя в "Test users"

### Шаг 3: Размещение credentials файла

Создайте credentials файл в безопасном месте:

```bash
# Создать директорию
mkdir -p ~/.config/google-calendar-mcp

# Скопировать скачанный файл (замените путь)
cp ~/Downloads/client_secret_*.json ~/.config/google-calendar-mcp/credentials.json
```

### Шаг 4: Настройка Cursor MCP

Обновите конфигурацию MCP в Cursor:

```json
{
  "mcpServers": {
    "google-calendar": {
      "command": "bunx",
      "args": ["@cocal/google-calendar-mcp"],
      "env": {
        "GOOGLE_OAUTH_CREDENTIALS": "/Users/euro/.config/google-calendar-mcp/credentials.json"
      }
    }
  }
}
```

**Путь к конфигурации Cursor:**

- macOS: `~/Library/Application Support/Cursor/User/globalStorage/rooveterinaryinc.cursor-mcp/settings.json`
- Или через Cursor: Settings > Extensions > MCP

### Шаг 5: Аутентификация

#### Автоматическая аутентификация (при первом запуске)

1. Перезапустите Cursor
2. MCP сервер автоматически запустит браузер для OAuth
3. Войдите в Google аккаунт
4. Разрешите доступ к календарю
5. Токены сохранятся автоматически

#### Ручная аутентификация (при необходимости)

```bash
export GOOGLE_OAUTH_CREDENTIALS="/Users/euro/.config/google-calendar-mcp/credentials.json"
bunx @cocal/google-calendar-mcp auth
```

## 🧪 Тестирование

После настройки проверьте работу через Cursor:

```bash
# В Cursor можно использовать MCP функции:
# - list_events
# - create_event
# - update_event
# - delete_event
# - search_events
```

## 📋 Доступные функции

### Получение событий на сегодня

```
Функция: list_events
Параметры:
- calendar_id: "primary" (или ID конкретного календаря)
- time_min: "2025-06-05T00:00:00Z"
- time_max: "2025-06-05T23:59:59Z"
```

### Обновление события

```
Функция: update_event
Параметры:
- calendar_id: "primary"
- event_id: "ID_события"
- summary: "Раз, два"
- start: {"dateTime": "2025-06-05T13:30:00"}
- end: {"dateTime": "2025-06-05T14:30:00"}
```

### Поиск событий

```
Функция: search_events
Параметры:
- query: "13:30"
- calendar_id: "primary"
```

## 🔧 Решение проблем

### Проблема: Credentials файл не найден

```bash
# Проверьте путь к файлу
ls -la ~/.config/google-calendar-mcp/credentials.json

# Убедитесь что переменная окружения правильная
echo $GOOGLE_OAUTH_CREDENTIALS
```

### Проблема: OAuth ошибки

1. Убедитесь, что ваш email добавлен в Test Users
2. Проверьте, что включен Google Calendar API
3. Попробуйте пересоздать credentials для Desktop application

### Проблема: Токены истекли

```bash
# Удалить старые токены и переаутентифицироваться
rm ~/.config/google-calendar-mcp/tokens.json
bunx @cocal/google-calendar-mcp auth
```

### Проблема: MCP сервер не отвечает

1. Перезапустите Cursor
2. Проверьте логи MCP в Cursor
3. Убедитесь что bunx работает: `bunx @cocal/google-calendar-mcp version`

## 🎉 Результат

После успешной настройки вы сможете:

1. **Получить все события на сегодня** и найти нужное с ID
2. **Обновить название события на "Раз, два"** через MCP функции
3. **Управлять календарем** прямо из Cursor

## 🔐 Безопасность

- Файл credentials содержит секретные данные - НЕ публикуйте его
- Токены автоматически обновляются
- В тестовом режиме токены истекают через 7 дней

## 📚 Дополнительная информация

- **Документация:** [GitHub README](https://github.com/nspady/google-calendar-mcp)
- **Поддерживаемые функции:** Multi-calendar support, Event management, Smart search
- **Требования:** Node.js (через bunx), Google Account, OAuth credentials
