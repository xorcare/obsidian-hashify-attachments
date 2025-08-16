/***********************************************
 * Copyright 2025 Vasiliy Vasilyuk
 * SPDX-License-Identifier: AGPL-3.0-only
 ***********************************************/

import en from './en';
import ru from './ru';
// можно добавить больше языков по мере необходимости

// Все переводы в одном объекте
const translations: Record<string, Record<string, string>> = {
  en,
  ru,
};

/**
 * Get translation by language code and key
 * @param language - short language code, e.g. 'en', 'ru'
 * @param key - translation key
 * @returns localized string or key itself if not found
 */
export function translate(language: string, key: string): string {
  return translations[language]?.[key] || translations['en']?.[key] || key;
}
