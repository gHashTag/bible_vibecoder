/**
 * Утилита для логирования действий пользователя и ошибок
 *
 * Предоставляет единый интерфейс для логирования с разными уровнями важности,
 * форматированием и возможностью сохранения логов в файл или базу данных.
 */

// Уровни логирования
export enum LogLevel {
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  DEBUG = 'debug',
}

// Типы логов
export enum LogType {
  SYSTEM = 'system',
  BUSINESS_LOGIC = 'business_logic',
  USER_ACTION = 'user_action',
  DATABASE = 'database',
  TELEGRAM_API = 'telegram_api',
  ERROR = 'error',
  EXTERNAL_SERVICE = 'external_service',
  SCENE = 'scene',
}

// Интерфейс для записи лога
export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  type?: LogType;
  data?: any; // Ослабляем типизацию для гибкости
  error?: Error;
  userId?: number | string;
  username?: string;
}

// Класс логгера
export class Logger {
  private static instance: Logger;
  private logToConsole: boolean = true;
  private logToFile: boolean = false;
  private logToDatabase: boolean = false;
  private minLevel: LogLevel = LogLevel.DEBUG;

  // Приватный конструктор для синглтона
  private constructor() {}

  // Получение экземпляра логгера
  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  // Настройка логгера
  public configure(options: {
    logToConsole?: boolean;
    logToFile?: boolean;
    logToDatabase?: boolean;
    minLevel?: LogLevel;
  }) {
    if (options.logToConsole !== undefined) {
      this.logToConsole = options.logToConsole;
    }
    if (options.logToFile !== undefined) {
      this.logToFile = options.logToFile;
    }
    if (options.logToDatabase !== undefined) {
      this.logToDatabase = options.logToDatabase;
    }
    if (options.minLevel !== undefined) {
      this.minLevel = options.minLevel;
    }
  }

  // Логирование
  public log(
    level: LogLevel,
    message: string,
    options?: Omit<LogEntry, 'timestamp' | 'level' | 'message'>
  ): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...options,
    };
    console.log(JSON.stringify(entry));
  }

  // Проверка, нужно ли логировать
  private shouldLog(level: LogLevel): boolean {
    const levels = [
      LogLevel.DEBUG,
      LogLevel.INFO,
      LogLevel.WARN,
      LogLevel.ERROR,
    ];

    const minLevelIndex = levels.indexOf(this.minLevel);
    const currentLevelIndex = levels.indexOf(level);

    return currentLevelIndex >= minLevelIndex;
  }

  // Вспомогательные методы для разных уровней логирования

  public debug(
    message: string,
    options?: Omit<LogEntry, 'timestamp' | 'level' | 'message'>
  ): void {
    this.log(LogLevel.DEBUG, message, options);
  }

  public info(
    message: string,
    options?: Omit<LogEntry, 'timestamp' | 'level' | 'message'>
  ): void {
    this.log(LogLevel.INFO, message, options);
  }

  public warn(
    message: string,
    options?: Omit<LogEntry, 'timestamp' | 'level' | 'message'>
  ): void {
    this.log(LogLevel.WARN, message, options);
  }

  public error(
    message: string,
    options?: Omit<LogEntry, 'timestamp' | 'level' | 'message'>
  ): void {
    this.log(LogLevel.ERROR, message, options);
  }

  public fatal(
    message: string,
    options?: Omit<LogEntry, 'timestamp' | 'level' | 'message'>
  ): void {
    this.log(LogLevel.ERROR, message, options);
    process.exit(1);
  }

  // Логирование действий пользователя
  public userAction(
    message: string,
    options?: Omit<LogEntry, 'timestamp' | 'level' | 'type' | 'message'>
  ) {
    this.log(LogLevel.INFO, message, {
      type: LogType.USER_ACTION,
      ...options,
    });
  }

  // Логирование действий бота
  public botAction(
    message: string,
    options?: Omit<LogEntry, 'timestamp' | 'level' | 'type' | 'message'>
  ) {
    this.log(LogLevel.INFO, message, {
      type: LogType.SYSTEM,
      ...options,
    });
  }
}

// Экспортируем экземпляр логгера
export const logger = Logger.getInstance();
