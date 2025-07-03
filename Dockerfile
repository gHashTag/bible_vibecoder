# Multi-stage build для оптимизации
FROM oven/bun:1 AS builder

WORKDIR /app

# Копируем файлы зависимостей
COPY package.json bun.lock ./
COPY tsconfig*.json ./

# Устанавливаем зависимости
RUN bun install --frozen-lockfile

# Копируем исходный код
COPY src/ ./src/
COPY index.ts ./

# Собираем проект
RUN bun run build:full

# Production stage
FROM node:18-alpine AS runtime

WORKDIR /app

# Копируем package.json для production зависимостей
COPY package.json ./

# Устанавливаем только production зависимости
RUN npm ci --only=production && npm cache clean --force

# Копируем собранный проект из builder stage
COPY --from=builder /app/dist ./dist/

# Создаем пользователя для безопасности
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Меняем владельца файлов
RUN chown -R nodejs:nodejs /app
USER nodejs

# Устанавливаем переменные окружения
ENV NODE_ENV=production
ENV PORT=3000

# Открываем порт
EXPOSE 3000

# Проверка здоровья
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "http.get('http://localhost:3000/', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Запускаем приложение
CMD ["node", "dist/server.js"]
