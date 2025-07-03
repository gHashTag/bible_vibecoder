# Используем Node.js LTS
FROM node:18-slim

WORKDIR /app

# Копируем файлы зависимостей
COPY package.json package-lock.json ./

# Устанавливаем зависимости (включая TypeScript для сборки)
RUN npm ci --legacy-peer-deps && npm cache clean --force

# Копируем исходный код
COPY . .

# Собираем проект
RUN npm run build

# Удаляем dev зависимости для уменьшения размера
RUN npm prune --production

# Устанавливаем переменные окружения
ENV NODE_ENV=production
ENV PORT=3000

# Открываем порт
EXPOSE 3000

# Запускаем приложение
CMD ["npm", "start"]
