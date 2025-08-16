/***********************************************
 * Copyright 2025 Vasiliy Vasilyuk
 * SPDX-License-Identifier: AGPL-3.0-only
 ***********************************************/

import {
  Plugin,
  Notice,
  TFolder,
  normalizePath,
  PluginSettingTab,
  Setting,
  FuzzySuggestModal,
  App,
  getLanguage,
} from 'obsidian';
import {translate} from './lang';
import {HashKind} from './hash.kind';
import {HashifyController} from './hashify.controller';
import {VaultNotesRepository} from './notes.repository';
import {RenameCommandHandler} from './rename.command.handler';
import {NotifyCommandHandler} from './notify.command.handler';
import {CommandKind} from './command.kind';
import {CommandDispatcher} from './command.dispatcher';

interface HashifySettings {
  hashAlgo: string;
}

const DEFAULT_SETTINGS: HashifySettings = {hashAlgo: 'sha512'};

const HASH_OPTIONS = [
  {label: 'SHA-1', value: 'sha1'},
  {label: 'SHA-256', value: 'sha256'},
  {label: 'SHA-384', value: 'sha384'},
  {label: 'SHA-512', value: 'sha512'},
] as const;

class FolderSuggestModal extends FuzzySuggestModal<TFolder> {
  constructor(app: App, private onChooseFolder: (folder: TFolder) => void) {
    super(app);
  }

  getItems() {
    const result: TFolder[] = [];
    const crawl = (folder: TFolder) => {
      result.push(folder);
      folder.children.forEach(ch => ch instanceof TFolder && crawl(ch));
    };
    crawl(this.app.vault.getRoot());
    return result;
  }

  getItemText(item: TFolder) {
    return item.path || '/';
  }

  onChooseItem(item: TFolder) {
    this.onChooseFolder(item);
  }
}

class HashifySettingTab extends PluginSettingTab {
  constructor(
      app: App,
      private plugin: HashifyFilesPlugin,
  ) {
    super(app, plugin);
  }

  display(): void {
    const {containerEl} = this;
    const plugin: HashifyFilesPlugin = this.plugin;

    containerEl.empty();
    containerEl.createEl('h2',
        {text: translate(plugin.locale, 'settings.title')});
    new Setting(containerEl).setName(
        translate(plugin.locale, 'settings.hash_algo')).
        setDesc(translate(plugin.locale, 'settings.hash_algo_desc')).
        addDropdown(dd => {
          HASH_OPTIONS.forEach(opt => dd.addOption(opt.value, opt.label));
          dd.setValue(plugin.settings.hashAlgo).onChange(async val => {
            plugin.settings.hashAlgo = val;
            await plugin.saveSettings();
          });
        });
  }
}

export default class HashifyFilesPlugin extends Plugin {
  settings: HashifySettings = {...DEFAULT_SETTINGS};

  get locale(): string {
    return getLanguage().split('-')[0];
  }

  async onload() {
    await this.loadSettings();
    this.registerCommand('rename-attached-files',
        'command.rename-attached-files.name',
        async () => {
          const folderPath = await this.pickFolder();
          if (folderPath) {
            await this.runHashify(folderPath);
            new Notice(translate(this.locale, 'notice.renamedAttached'));
          }
        });

    this.registerCommand('rename-all-files',
        'command.rename-all-files.name',
        async () => {
          const rootFolder = this.app.vault.getRoot?.();
          if (rootFolder instanceof TFolder) {
            await this.runHashify(rootFolder.path);
            new Notice(translate(this.locale, 'notice.renamedAll'));
          } else {
            new Notice(translate(this.locale, 'error.noRootFound'));
          }
        });

    this.addSettingTab(new HashifySettingTab(this.app, this));
  }

  private registerCommand(
      id: string, nameKey: string, callback: () => Promise<void>) {
    this.addCommand({id, name: translate(this.locale, nameKey), callback});
  }

  async loadSettings() {
    this.settings = {...DEFAULT_SETTINGS, ...(await this.loadData() ?? {})};
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  async pickFolder(): Promise<string | null> {
    return new Promise(resolve => {
      new FolderSuggestModal(this.app, f => resolve(f.path)).open();
    });
  }

  private async runHashify(folderPath: string) {
    const repo = new VaultNotesRepository(
        this.app.vault,
        HashKind[this.settings.hashAlgo as keyof typeof HashKind],
    );

    const dispatcher = new CommandDispatcher();
    dispatcher.RegisterHandler(CommandKind.rename, new RenameCommandHandler(this.app));
    dispatcher.RegisterHandler(CommandKind.notify,
        new NotifyCommandHandler(this.locale, translate));

    await new HashifyController(repo, dispatcher).Hashify(normalizePath(folderPath));
  }
}
