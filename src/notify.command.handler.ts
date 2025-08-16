/***********************************************
 * Copyright 2025 Vasiliy Vasilyuk
 * SPDX-License-Identifier: AGPL-3.0-only
 ***********************************************/

import {Notice} from 'obsidian';
import {CommandHandler} from './command.handler';
import {Command} from './command';

export class NotifyCommandHandler implements CommandHandler {
  private readonly locale: string;
  private readonly translate: (lang: string, key: string) => string;

  constructor(locale: string, translate: (lang: string, key: string) => string) {
    this.locale = locale;
    this.translate = translate;
  }

  async Handle(command: Command): Promise<void> {
    const title = this.translate(this.locale, 'error.hash_mismatch.title');
    const body = this.translate(this.locale, 'error.hash_mismatch.body').replace('{source}',
        command.File().Path()).replace('{target}', command.File().TargetPath());

    new Notice(`${title}\n\n${body}`);

    const consoleMessage = this.translate(this.locale, 'error.hash_mismatch.console').replace(
        '{source}', command.File().Path()).replace('{target}', command.File().TargetPath()).replace(
        '{source_hash}', command.File().Hash512()).replace('{target_hash}', 'unknown');

    console.error(consoleMessage);
  }
}
