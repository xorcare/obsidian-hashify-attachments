/***********************************************
 * Copyright 2025 Vasiliy Vasilyuk
 * SPDX-License-Identifier: AGPL-3.0-only
 ***********************************************/

import {File} from './file';

export class Pair {
  private readonly sourceFile: File;
  private readonly targetFile?: File;

  constructor(sourceFile: File, targetFile?: File) {
    this.sourceFile = sourceFile;
    this.targetFile = targetFile;
  }

  SourceFile(): File {
    return this.sourceFile;
  }

  TargetFile(): File | undefined {
    return this.targetFile;
  }
}
