/***********************************************
 * Copyright 2025 Vasiliy Vasilyuk
 * SPDX-License-Identifier: AGPL-3.0-only
 ***********************************************/

import en from './dictionary/en';
import ru from './dictionary/ru';

type Dict = Record<string, string>;

function placeholders(s: string): string[] {
  const m = s.match(/\{\{([\w.]+)\}\}/g) ?? [];
  return m.map(x => x.slice(1, -1)).sort();
}

function compareLocales(base: Dict, other: Dict) {
  const baseKeys = Object.keys(base).sort();
  const otherKeys = Object.keys(other).sort();

  const missing = baseKeys.filter(k => !(k in other));
  const extra = otherKeys.filter(k => !(k in base));

  expect(missing).toEqual([]);
  expect(extra).toEqual([]);

  for (const k of baseKeys) {
    const pb = placeholders(base[k]);
    const po = placeholders(other[k]);
    expect({ key: k, placeholders: po }).toEqual({ key: k, placeholders: pb });
  }
}

describe('i18n consistency', () => {
  it('ru matches en keys and placeholders', () => {
    compareLocales(en as Dict, ru as Dict);
  });
});
