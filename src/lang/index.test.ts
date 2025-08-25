/***********************************************
 * Copyright 2025 Vasiliy Vasilyuk
 * SPDX-License-Identifier: AGPL-3.0-only
 ***********************************************/

// src/lang/index.test.ts
import { describe, it, expect, beforeAll, beforeEach, jest } from '@jest/globals';

// Mock dictionaries first
jest.mock('./dictionary/en', () => ({
  __esModule: true,
  default: {
    greeting: 'Hello, {{name}}!',
    authorLine: 'Author: {{user.name}}',
    countLine: 'Count: {{count}}',
    staticKey: 'Static EN',
    deep: 'Deep: {{a.b.c}}',
  },
}));

jest.mock('./dictionary/ru', () => ({
  __esModule: true,
  default: {
    greeting: 'Привет, {{name}}!',
    authorLine: 'Автор: {{user.name}}',
    // countLine intentionally missing for language fallback
    staticKey: 'Статический RU',
  },
}));

let translate: (lang: string, key: string, values?: Record<string, unknown>) => string;

beforeAll(async () => {
  // Dynamic import inside lifecycle hook avoids top-level await
  ({ translate } = await import('./index'));
});

describe('translate', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns a value from the selected language when the key exists', () => {
    expect(translate('ru', 'staticKey')).toBe('Статический RU');
  });

  it('falls back to English when the key is missing in the selected language', () => {
    expect(translate('ru', 'countLine', {count: 5})).toBe('Count: 5');
  });

  it('returns the key itself when the key is missing in all dictionaries', () => {
    expect(translate('ru', 'missing.key')).toBe('missing.key');
  });

  it('interpolates simple placeholders like {{name}}', () => {
    expect(translate('ru', 'greeting', { name: 'Василий' })).toBe('Привет, Василий!');
    expect(translate('en', 'greeting', { name: 'Ada' })).toBe('Hello, Ada!');
  });

  it('supports dotted paths such as {{user.name}}', () => {
    expect(translate('en', 'authorLine', { user: { name: 'Ada' } })).toBe('Author: Ada');
    expect(translate('ru', 'authorLine', { user: { name: 'Василий' } })).toBe('Автор: Василий');
  });

  it('inserts an empty string when a placeholder value is not provided', () => {
    expect(translate('en', 'greeting', {})).toBe('Hello, !');
  });

  it('inserts an template string when values is not provided', () => {
    expect(translate('en', 'countLine')).toBe('Count: {{count}}');
  });

  it('handles primitives and objects in values via String conversion', () => {
    expect(translate('en', 'countLine', { count: 0 })).toBe('Count: 0');
    expect(translate('en', 'countLine', { count: 42 })).toBe('Count: 42');
    expect(translate('en', 'countLine', { count: null })).toBe('Count: ');
    expect(translate('en', 'countLine', { count: { toString: () => 'X' } })).toBe('Count: X');
  });

  it('works with multiple levels of nesting in dotted paths', () => {
    expect(translate('en', 'deep', { a: { b: { c: 'Z' } } })).toBe('Deep: Z');
  });

  it('language fallback still interpolates provided values', () => {
    expect(translate('ru', 'countLine', { count: 7 })).toBe('Count: 7');
  });
});
