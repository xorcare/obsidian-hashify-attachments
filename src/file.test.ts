/***********************************************
 * Copyright 2025 Vasiliy Vasilyuk
 * SPDX-License-Identifier: AGPL-3.0-only
 ***********************************************/

import { File } from "../src/file";
import { HashKind } from "../src/hash.kind";

describe("File", () => {
  const file = new File("folder/test.txt", "abc123", HashKind.sha256, "hash512value");

  test("Extension returns lowercase extension", () => {
    expect(file.Extension()).toBe("txt");
  });

  test("Filename returns last part of path", () => {
    expect(file.Filename()).toBe("test.txt");
  });

  test("TargetFilename formats correctly", () => {
    expect(file.TargetFilename()).toBe("sha256-abc123.txt");
  });

  test("TargetPath includes same folder with new name", () => {
    expect(file.TargetPath()).toBe("folder/sha256-abc123.txt");
  });

  test("Hash getters", () => {
    expect(file.Hash()).toBe("abc123");
    expect(file.Hash512()).toBe("hash512value");
    expect(file.HashKind()).toBe(HashKind.sha256);
  });
});
