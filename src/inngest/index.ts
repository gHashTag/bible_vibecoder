/**
 * Inngest - Barrel File
 *
 * Этот файл является основной точкой входа для модуля Inngest.
 * Он реэкспортирует клиент Inngest и все зарегистрированные функции
 * для легкого доступа из других частей приложения.
 */

import { inngest } from './client';
import { functions } from './functions';

// Клиент и зарегистрированные функции
export { inngest, functions };
