# Проверка деплоя Bible VibeCoder на Railway

## 🚀 Что было сделано:

1. **Исправлена проблема с lockfile** - пересоздан `bun.lock` с правильным именем проекта
2. **Обновлен Dockerfile** - оптимизирован multi-stage build (Bun для сборки, Node.js для запуска)
3. **Исправлены переменные окружения** - теперь используется `BOT_WEBHOOK_DOMAIN` из Railway
4. **Настроен порт 8080** - стандартный порт для Railway

## ✅ Проверка деплоя:

### 1. В панели Railway:
- Откройте логи деплоя (Build Logs)
- Убедитесь, что сборка прошла успешно
- Проверьте Deploy Logs на наличие сообщения:
  ```
  Webhook successfully set to: https://bible-vibecoder-bot.up.railway.app/secret-path
  ```

### 2. Проверьте переменные окружения:
Обязательные переменные:
- `BOT_TOKEN` ✅ (уже установлен)
- `NODE_ENV=production` ✅ (уже установлен)
- `BOT_WEBHOOK_DOMAIN` ✅ (уже установлен)

### 3. Проверьте работу бота:
1. Откройте Telegram
2. Найдите вашего бота
3. Отправьте команду `/start`
4. Бот должен ответить

### 4. Проверьте webhook через API:
```bash
curl https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getWebhookInfo
```

Должен вернуть информацию о webhook с URL: `https://bible-vibecoder-bot.up.railway.app/secret-path`

## 🔧 Если что-то не работает:

1. **Проверьте логи в Railway**
2. **Убедитесь, что все переменные окружения установлены**
3. **Проверьте, что бот не запущен локально** (это может вызвать конфликт)
4. **Попробуйте перезапустить сервис в Railway**

## 📝 Дополнительные команды Railway CLI:

```bash
# Просмотр статуса
railway status

# Просмотр логов
railway logs

# Перезапуск сервиса
railway restart

# Просмотр переменных
railway variables
```
