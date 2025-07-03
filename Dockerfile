# Оптимизированный Dockerfile для Railway
# Используем Bun для сборки, Node.js для запуска
FROM oven/bun:1 AS builder

WORKDIR /app

# Копируем файлы зависимостей и устанавливаем их
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Копируем исходные файлы
COPY tsconfig*.json ./
COPY src ./src
COPY index.ts ./

# Собираем TypeScript
RUN bun run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Копируем только необходимое для production
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Устанавливаем переменные окружения
ENV NODE_ENV=production
ENV PORT=8080

# Открываем порт
EXPOSE 8080

# Запускаем через npm start
CMD ["npm", "start"]
