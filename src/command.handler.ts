/***********************************************
 * Copyright 2025 Vasiliy Vasilyuk
 * SPDX-License-Identifier: AGPL-3.0-only
 ***********************************************/

import { Command } from "./command";

export interface CommandHandler {
  Handle(command: Command): Promise<void>;
}
