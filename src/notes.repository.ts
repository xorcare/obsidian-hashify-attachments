/***********************************************
 * Copyright 2025 Vasiliy Vasilyuk
 * SPDX-License-Identifier: AGPL-3.0-only
 ***********************************************/

import {TFile, TFolder, Vault} from 'obsidian';
import {File} from './file';
import {HashKind} from './hash.kind';

export interface NotesRepository {
  LoadFiles(fileOrFolderPath: string): Promise<File[]>;
}

export class VaultNotesRepository implements NotesRepository {
  private vault: Vault;
  private readonly hashKind: HashKind;

  constructor(vault: Vault, hashKind: HashKind) {
    this.vault = vault;
    this.hashKind = hashKind;
  }

  async LoadFiles(fileOrFolderPath: string): Promise<File[]> {
    const result: File[] = [];
    const abstractFile = this.vault.getAbstractFileByPath(fileOrFolderPath);

    if (!abstractFile) return [];

    if (abstractFile instanceof TFolder) {
      const files = this.collectFiles(abstractFile);
      for (const f of files) {
        const hash = await this.computeHash(f, this.hashKind);
        const hash512 = await this.computeHash(f, HashKind.sha512);
        result.push(new File(f.path, hash, this.hashKind, hash512));
      }
    } else if (abstractFile instanceof TFile) {
      const hash = await this.computeHash(abstractFile, this.hashKind);
      const hash512 = await this.computeHash(abstractFile, HashKind.sha512);
      result.push(new File(abstractFile.path, hash, this.hashKind, hash512));
    }

    return result;
  }

  private collectFiles(folder: TFolder): TFile[] {
    let res: TFile[] = [];
    for (const child of folder.children) {
      if (child instanceof TFolder) res = res.concat(this.collectFiles(child));
      else if (child instanceof TFile) res.push(child);
    }
    return res;
  }

  private async computeHash(file: TFile, kind: HashKind): Promise<string> {
    const algoMap: Record<HashKind, string> = {
      [HashKind.sha1]: 'SHA-1',
      [HashKind.sha256]: 'SHA-256',
      [HashKind.sha384]: 'SHA-384',
      [HashKind.sha512]: 'SHA-512',
    };
    const buf = await this.vault.readBinary(file);
    const hashBuf = await crypto.subtle.digest(algoMap[kind], buf);
    return Array.from(new Uint8Array(hashBuf)).
        map(b => b.toString(16).padStart(2, '0')).
        join('');
  }
}
