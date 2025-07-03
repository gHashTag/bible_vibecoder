# Используем minimal Node.js образ
FROM node:18-slim

WORKDIR /app

# Копируем только необходимые файлы
COPY package.json package-lock.json ./

# Устанавливаем только production зависимости без build tools
RUN npm ci --only=production --omit=dev --no-audit --no-fund && \
    npm cache clean --force && \
    rm -rf /tmp/* /var/lib/apt/lists/*

# Копируем уже собранный код  
COPY dist/ ./dist/

# Устанавливаем переменные окружения
ENV NODE_ENV=production
ENV PORT=3000

# Запускаем приложение
CMD ["node", "dist/server.js"]
