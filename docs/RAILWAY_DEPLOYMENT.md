# Деплой Bible VibeCoder на Railway

## Обновления для работы с Bun

Проект теперь использует Bun вместо npm для управления зависимостями и сборки. Dockerfile был обновлен для оптимальной работы с Railway.

## Автоматическая настройка Webhook

Приложение автоматически настраивает webhook при деплое на Railway. Вам не нужно делать никаких дополнительных настроек!

### Как это работает

1. **Railway автоматически предоставляет переменную окружения** `RAILWAY_STATIC_URL` с публичным URL вашего приложения
2. **Приложение автоматически использует** эту переменную для настройки webhook при запуске в production режиме
3. **Если webhook не может быть установлен**, приложение завершится с ошибкой, что поможет быстро обнаружить проблемы

### Настройка переменных окружения в Railway

В панели управления Railway установите следующие переменные:

```env
# Обязательные переменные
BOT_TOKEN=ваш_токен_telegram_бота
NODE_ENV=production

# Опциональные переменные
NEON_DATABASE_URL=ваша_строка_подключения_к_БД
OPENAI_API_KEY=ваш_ключ_openai
APIFY_TOKEN=ваш_токен_apify
ADMIN_USER_ID=ваш_telegram_id

# НЕ НУЖНО устанавливать:
# - PORT (установлен в railway.toml как 8080)
# - RAILWAY_STATIC_URL (Railway устанавливает автоматически)
# - WEBHOOK_DOMAIN (используется как резервная опция)
```

### Структура сборки

Docker образ строится в три этапа:
1. **deps** - установка только production зависимостей через Bun
2. **builder** - сборка TypeScript кода
3. **runner** - финальный минимальный образ с Node.js для запуска

### Проверка работы webhook

После деплоя проверьте логи в Railway. Вы должны увидеть сообщение:

```
Webhook successfully set to: https://ваш-проект.railway.app/secret-path
```

Если вместо этого видите ошибку, проверьте:
1. Корректность BOT_TOKEN
2. Доступность вашего Railway приложения по HTTPS

### Локальная разработка

При локальной разработке (`NODE_ENV=development`) бот автоматически использует polling режим, что не требует webhook.

### Устранение проблем

Если webhook не устанавливается:

1. **Проверьте переменные окружения** в настройках Railway
2. **Убедитесь, что приложение получает публичный домен** от Railway
3. **Проверьте логи** на наличие конкретных ошибок от Telegram API
4. **Попробуйте вручную задать** WEBHOOK_DOMAIN как резервную опцию

### Безопасность

- Webhook путь (`/secret-path`) можно изменить в `src/server.ts`
- Рекомендуется использовать более сложный путь для production
