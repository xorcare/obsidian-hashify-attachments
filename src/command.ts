/***********************************************
 * Copyright 2025 Vasiliy Vasilyuk
 * SPDX-License-Identifier: AGPL-3.0-only
 ***********************************************/

import { CommandKind } from "./command.kind";
import { File } from "./file";

export class Command {
  private readonly kind: CommandKind;
  private readonly file: File;

  constructor(kind: CommandKind, file: File) {
    this.kind = kind;
    this.file = file;
  }

  Kind(): CommandKind {
    return this.kind;
  }

  File(): File {
    return this.file;
  }
}
