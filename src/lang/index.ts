/***********************************************
 * Copyright 2025 Vasiliy Vasilyuk
 * SPDX-License-Identifier: AGPL-3.0-only
 ***********************************************/

import en from "./dictionary/en";
import ru from "./dictionary/ru";

const translations: Record<string, Record<string, string>> = { en, ru };

// Simple {{var}} interpolation with default behavior (no escaping by default)
function interpolate(template: string, values?: Record<string, unknown>): string {
  if (!values) return template;

  const toSafeString = (v: unknown): string => {
    if (
      v === null ||
      v === undefined ||
      typeof v === "string" ||
      typeof v === "number" ||
      typeof v === "boolean" ||
      typeof v === "bigint" ||
      typeof v === "symbol"
    ) {
      return String(v);
    }

    return typeof v;
  };

  return template.replace(/{{\s*([\w.[\]]+)\s*}}/g, (_, path: string) => {
    const parts = path.split(".");
    let cur: unknown = values; // was: any
    for (const p of parts) {
      if (cur && typeof cur === "object" && p in (cur as Record<string, unknown>)) {
        cur = (cur as Record<string, unknown>)[p as keyof typeof cur];
      } else {
        cur = undefined;
        break;
      }
    }
    const val = cur ?? "";
    return toSafeString(val);
  });
}

/**
 * Get translation by language code and key
 * @param language - short language code, e.g. 'en', 'ru'
 * @param key - translation key
 * @param values - interpolation values for {{placeholders}}
 * @returns localized string or key itself if not found
 */
export function translate(language: string, key: string, values?: Record<string, unknown>): string {
  const msg = translations[language]?.[key] || translations["en"]?.[key] || key; // Fallback to en and then to the key itself
  return interpolate(msg, values); // Insert interpolated values
}
