/***********************************************
 * Copyright 2025 Vasiliy Vasilyuk
 * SPDX-License-Identifier: AGPL-3.0-only
 ***********************************************/

import { HashKind } from "./hash.kind";

export class File {
  private readonly path: string;
  private readonly hash: string;
  private readonly hashKind: HashKind;
  private readonly hash512: string;

  constructor(path: string, hash: string, hashKind: HashKind, hash512: string) {
    this.path = path;
    this.hash = hash;
    this.hashKind = hashKind;
    this.hash512 = hash512;
  }

  Path(): string {
    return this.path;
  }

  Hash(): string {
    return this.hash;
  }

  HashKind(): HashKind {
    return this.hashKind;
  }

  Hash512(): string {
    return this.hash512;
  }

  Extension(): string {
    const parts = this.path.split(".");
    return parts.length > 1 ? parts.pop()!.toLowerCase() : "";
  }

  Filename(): string {
    return this.path.split("/").pop() || this.path;
  }

  TargetFilename(): string {
    return `${this.hashKind}-${this.hash}.${this.Extension()}`;
  }

  TargetPath(): string {
    const parts = this.path.split("/");
    parts.pop();
    return parts.length ? `${parts.join("/")}/${this.TargetFilename()}` : this.TargetFilename();
  }
}
