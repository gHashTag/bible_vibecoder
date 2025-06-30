# Используем Bun официальный образ
FROM oven/bun:latest

WORKDIR /app

# Копируем файлы зависимостей
COPY package.json bun.lock ./

# Устанавливаем зависимости
RUN bun install --frozen-lockfile

# Копируем остальной исходный код
COPY . .

# Собираем проект
RUN bun run build:full

# Устанавливаем переменную окружения
ENV NODE_ENV=production

# Открываем порт (Railway автоматически назначит PORT)
EXPOSE $PORT

# Запускаем приложение через скрипт package.json
CMD ["bun", "run", "start"]
