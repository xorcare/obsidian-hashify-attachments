/***********************************************
 * Copyright 2025 Vasiliy Vasilyuk
 * SPDX-License-Identifier: AGPL-3.0-only
 ***********************************************/

import { CommandHandler } from "./command.handler";
import { Command } from "./command";
import { CommandKind } from "./command.kind";

export class CommandDispatcher {
  private handlers: Map<CommandKind, CommandHandler> = new Map();

  RegisterHandler(kind: CommandKind, handler: CommandHandler): void {
    this.handlers.set(kind, handler);
  }

  async Process(commands: Command[]): Promise<void> {
    for (const command of commands) {
      const handler = this.handlers.get(command.Kind());
      if (handler) {
        await handler.Handle(command);
      }
    }
  }
}
