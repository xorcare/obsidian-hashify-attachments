/***********************************************
 * Copyright 2025 Vasiliy Vasilyuk
 * SPDX-License-Identifier: AGPL-3.0-only
 ***********************************************/

import {App, TFile} from 'obsidian';
import {CommandHandler} from './command.handler';
import {Command} from './command';

export class RenameCommandHandler implements CommandHandler {
  private app: App;

  constructor(app: App) {
    this.app = app;
  }

  async Handle(command: Command): Promise<void> {
    const file = this.app.vault.getAbstractFileByPath(command.File().Path());
    if (file instanceof TFile) {
      const target = this.app.vault.getAbstractFileByPath(command.File().TargetPath());
      if (target instanceof TFile) {
        await this.app.vault.delete(target);
      }
      await this.app.fileManager.renameFile(file, command.File().TargetPath());
    }
  }
}
