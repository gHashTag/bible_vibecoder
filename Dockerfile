# Multi-stage build для минимального размера
# Используем Bun для установки зависимостей
FROM oven/bun:1 AS deps
WORKDIR /app
# Копируем файлы с зависимостями
COPY package.json bun.lock ./
# Устанавливаем только production зависимости
RUN bun install --frozen-lockfile --production

# Стадия сборки
FROM oven/bun:1 AS builder
WORKDIR /app
COPY package.json bun.lock tsconfig*.json ./
# Устанавливаем все зависимости для сборки
RUN bun install --frozen-lockfile
COPY src ./src
COPY index.ts ./
# Сборка TypeScript
RUN bun run build

# Финальная стадия - используем Node.js для запуска
FROM node:18-alpine AS runner
WORKDIR /app

# Копируем только production зависимости
COPY --from=deps /app/node_modules ./node_modules
# Копируем только собранный код
COPY --from=builder /app/dist ./dist
COPY package.json ./

# Устанавливаем переменные окружения
ENV NODE_ENV=production
ENV PORT=8080

# Railway использует порт 8080 по умолчанию
EXPOSE 8080

# Запускаем приложение через Node.js
CMD ["node", "dist/server.js"]
