/***********************************************
 * Copyright 2025 Vasiliy Vasilyuk
 * SPDX-License-Identifier: AGPL-3.0-only
 ***********************************************/

import {Pair} from '../src/pair';
import {File} from '../src/file';
import {HashKind} from '../src/hash.kind';

describe('Pair', () => {
  const f1 = new File('a.txt', 'h1', HashKind.sha1, 'h512a');
  const f2 = new File('b.txt', 'h2', HashKind.sha256, 'h512b');
  const pair = new Pair(f1, f2);

  test('SourceFile returns the source', () => {
    expect(pair.SourceFile()).toBe(f1);
  });

  test('TargetFile returns the target', () => {
    expect(pair.TargetFile()).toBe(f2);
  });

  test('TargetFile can be undefined', () => {
    const p = new Pair(f1);
    expect(p.TargetFile()).toBeUndefined();
  });
});
