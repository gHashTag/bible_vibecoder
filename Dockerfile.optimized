# Multi-stage build для минимального размера
FROM node:18-alpine AS deps
WORKDIR /app
# Только зависимости
COPY package.json package-lock.json ./
RUN npm ci --only=production --no-audit --no-fund --legacy-peer-deps

FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json tsconfig*.json ./
# Все зависимости для сборки
RUN npm ci --legacy-peer-deps
COPY src ./src
COPY index.ts ./
# Сборка
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

# Копируем только production зависимости
COPY --from=deps /app/node_modules ./node_modules
# Копируем только собранный код
COPY --from=builder /app/dist ./dist
COPY package.json ./

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Минимальный образ без лишнего
CMD ["node", "dist/server.js"]
