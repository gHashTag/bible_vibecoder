# Простой и надежный Dockerfile для Railway
FROM node:20-slim

# Установка Bun
RUN apt-get update && apt-get install -y curl unzip && \
    curl -fsSL https://bun.sh/install | bash && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Добавляем Bun в PATH
ENV PATH="/root/.bun/bin:$PATH"

WORKDIR /app

# Копируем файлы зависимостей
COPY package.json bun.lock* ./

# Устанавливаем зависимости
RUN bun install --production=false

# Копируем остальные файлы
COPY . .

# Собираем проект
RUN bun run build

# Запускаем приложение
EXPOSE 8080
CMD ["node", "dist/server.js"]
