/**
 * Интерфейс для адаптеров хранилища данных
 */
export interface StorageAdapter<T = any> {
  /**
   * Инициализация хранилища
   */
  initialize(): Promise<void>;

  /**
   * Получение данных по ключу
   */
  get(key: string): Promise<T | undefined>;

  /**
   * Сохранение данных по ключу
   */
  set(key: string, value: T): Promise<void>;

  /**
   * Удаление данных по ключу
   */
  delete(key: string): Promise<boolean>;

  /**
   * Проверка существования ключа
   */
  has(key: string): Promise<boolean>;

  /**
   * Получение всех ключей
   */
  keys(): Promise<string[]>;

  /**
   * Очистка всех данных
   */
  clear(): Promise<void>;

  /**
   * Закрытие соединения с хранилищем
   */
  close(): Promise<void>;
}

/**
 * Интерфейс для данных сессии
 */
export interface SessionData {
  [key: string]: any;
}
