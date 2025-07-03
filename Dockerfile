# Простой Dockerfile для Railway
FROM oven/bun:1-alpine

WORKDIR /app

# Копируем файлы зависимостей
COPY package.json bun.lock ./

# Устанавливаем зависимости
RUN bun install --frozen-lockfile

# Копируем исходный код
COPY tsconfig*.json ./
COPY src ./src  
COPY index.ts ./

# Собираем проект
RUN bun run build

# Устанавливаем переменные окружения
ENV NODE_ENV=production
ENV PORT=8080

# Открываем порт
EXPOSE 8080

# Запускаем приложение через Bun
CMD ["bun", "run", "dist/server.js"]
