/***********************************************
 * Copyright 2025 Vasiliy Vasilyuk
 * SPDX-License-Identifier: AGPL-3.0-only
 ***********************************************/

import { Command } from "../src/command";
import { CommandKind } from "../src/command.kind";
import { File } from "../src/file";
import { HashKind } from "../src/hash.kind";

describe("Command", () => {
  const f = new File("a.txt", "h", HashKind.sha1, "h512");
  const cmd = new Command(CommandKind.rename, f);

  test("Kind returns the kind", () => {
    expect(cmd.Kind()).toBe(CommandKind.rename);
  });

  test("File returns the file", () => {
    expect(cmd.File()).toBe(f);
  });
});
