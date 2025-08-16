/***********************************************
 * Copyright 2025 Vasiliy Vasilyuk
 * SPDX-License-Identifier: AGPL-3.0-only
 ***********************************************/

import {Pair} from './pair';
import {Command} from './command';
import {CommandKind} from './command.kind';

export function Convert(pairs: Pair[]): Command[] {
  const commands: Command[] = [];
  for (const pair of pairs) {
    const src = pair.SourceFile();
    const tgt = pair.TargetFile();

    // Only attached files need to be renamed, files with the extension 'md' are not attached.
    if (src.Extension().toLowerCase() === 'md') {
      continue;
    }

    // The file already has the correct name.
    if (src.TargetFilename() === src.Filename()) {
      continue;
    }

    // This is necessary to avoid losing the knowledge base file in case of a collision, for example, SHA-1.
    // Such a situation can arise if, by pure chance, 2 different files have the same hash.
    // Of course, this is unlikely, but still, one should not underestimate such a scenario.
    if (tgt && src.Hash512() !== tgt.Hash512()) {
      commands.push(new Command(CommandKind.notify, src));
      continue;
    }

    commands.push(new Command(CommandKind.rename, src));
  }
  return commands;
}
