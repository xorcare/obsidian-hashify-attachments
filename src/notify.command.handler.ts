/***********************************************
 * Copyright 2025 Vasiliy Vasilyuk
 * SPDX-License-Identifier: AGPL-3.0-only
 ***********************************************/

import {Notice} from 'obsidian';
import {CommandHandler} from './command.handler';
import {Command} from './command';

export class NotifyCommandHandler implements CommandHandler {
  private readonly locale: string;
  private readonly translate: (
      language: string, key: string, values?: Record<string, unknown>) => string;

  constructor(
      locale: string, translate: (
          language: string, key: string,
          values?: Record<string, unknown>) => string) {
    this.locale = locale;
    this.translate = translate;
  }

  Handle(command: Command): Promise<void> {
    const title = this.translate(this.locale, 'error.hash_mismatch.title');
    const body = this.translate(this.locale, 'error.hash_mismatch.body', {
      source: command.File().Path(),
      target: command.File().TargetPath(),
    });

    new Notice(`${title}\n\n${body}`);

    const consoleMessage = this.translate(this.locale, 'error.hash_mismatch.console', {
      source: command.File().Path(),
      target: command.File().TargetPath(),
      source_hash: command.File().Hash512(),
      target_hash: 'unknown',
    });

    console.error(consoleMessage);
  }
}
