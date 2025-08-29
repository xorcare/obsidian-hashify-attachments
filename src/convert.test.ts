/***********************************************
 * Copyright 2025 Vasiliy Vasilyuk
 * SPDX-License-Identifier: AGPL-3.0-only
 ***********************************************/

import {Convert} from '../src/convert';
import {Pair} from '../src/pair';
import {File} from '../src/file';
import {HashKind} from '../src/hash.kind';
import {CommandKind} from '../src/command.kind';

describe('Convert', () => {
  const makeFile = (path: string, hash: string, h512: string) =>
      new File(path, hash, HashKind.sha256, h512);

  test('Skips .md files', () => {
    const pairs = [new Pair(makeFile('note.md', 'abc', 'h512'))];
    expect(Convert(pairs)).toHaveLength(0);
  });

  test('Skips if source filename matches source target filename', () => {
    const src = makeFile('sha256-abc.txt', 'abc', 'h512');
    const cmds = Convert([new Pair(src)]);
    expect(cmds).toHaveLength(0);
  });

  test('Notify if target exists and hash512 differs', () => {
    const src = makeFile('a.txt', 'abc', 'h512a');
    const tgt = makeFile('b.txt', 'zzz', 'h512b');
    const cmds = Convert([new Pair(src, tgt)]);
    expect(cmds[0].Kind()).toBe(CommandKind.notify);
  });

  test('Rename if no target or hash512 same', () => {
    const src1 = makeFile('a.txt', 'abc', 'h512');
    const cmds1 = Convert([new Pair(src1)]);
    expect(cmds1[0].Kind()).toBe(CommandKind.rename);

    const src2 = makeFile('a.txt', 'abc', 'h512');
    const tgt2 = makeFile('b.txt', 'something', 'h512');
    const cmds2 = Convert([new Pair(src2, tgt2)]);
    expect(cmds2[0].Kind()).toBe(CommandKind.rename);
  });
});
