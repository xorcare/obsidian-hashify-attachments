/***********************************************
 * Copyright 2025 Vasiliy Vasilyuk
 * SPDX-License-Identifier: AGPL-3.0-only
 ***********************************************/

import {Convert} from './convert';
import {NotesRepository} from './notes.repository';
import {Pair} from './pair';
import {CommandDispatcher} from './command.dispatcher';

export class HashifyController {
  private repo: NotesRepository;
  private dispatcher: CommandDispatcher;

  constructor(repo: NotesRepository, dispatcher: CommandDispatcher) {
    this.repo = repo;
    this.dispatcher = dispatcher;
  }

  async Hashify(folderName: string) {
    const files = await this.repo.LoadFiles(folderName);
    const pairs: Pair[] = [];

    for (const file of files) {
      const target = files.find(f => f.Path() === file.TargetPath());
      pairs.push(new Pair(file, target));
    }

    const commands = Convert(pairs);

    return this.dispatcher.Process(commands);
  }
}
