/**
 * Утилита для логирования действий пользователя и ошибок
 *
 * Предоставляет единый интерфейс для логирования с разными уровнями важности,
 * форматированием и возможностью сохранения логов в файл или базу данных.
 */

import { LogLevel, LogType, LogEntry } from '../types/index';

/**
 * 🕉️ Центральный логгер для всего приложения
 */
class Logger {
  private logs: LogEntry[] = [];
  private maxLogs = 1000;

  /**
   * Основной метод логирования
   */
  private log(level: LogLevel | string, message: string, extra?: any): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      type: extra?.type || LogType.SYSTEM,
      userId: extra?.userId,
      username: extra?.username,
      error: extra?.error,
      data: extra?.data,
    };

    // Добавляем в массив логов
    this.logs.push(entry);

    // Ограничиваем размер массива
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    // Вывод в консоль
    console.log(
      `[${entry.timestamp}] ${level.toUpperCase()}: ${message}`,
      extra?.data || ''
    );
  }

  info(message: string, extra?: any): void {
    this.log(LogLevel.INFO, message, extra);
  }

  warn(message: string, extra?: any): void {
    this.log(LogLevel.WARN, message, extra);
  }

  error(message: string, extra?: any): void {
    this.log(LogLevel.ERROR, message, extra);
  }

  debug(message: string, extra?: any): void {
    this.log(LogLevel.DEBUG, message, extra);
  }

  fatal(message: string, extra?: any): void {
    this.log(LogLevel.ERROR, `FATAL: ${message}`, extra);
  }

  // Логирование действий пользователя
  userAction(message: string, extra?: any): void {
    this.log(LogLevel.INFO, message, { ...extra, type: LogType.USER_ACTION });
  }

  // Логирование действий бота
  botAction(message: string, extra?: any): void {
    this.log(LogLevel.INFO, message, { ...extra, type: LogType.SYSTEM });
  }

  // Настройка логгера (заглушка для совместимости)
  configure(_options: any): void {
    // Заглушка для совместимости со старым API
  }

  /**
   * Получить все логи
   */
  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  /**
   * Очистить логи
   */
  clearLogs(): void {
    this.logs = [];
  }
}

export const logger = new Logger();

// Реэкспорт типов для совместимости
export { LogLevel, LogType };
export type { LogEntry };
