/***********************************************
 * Copyright 2025 Vasiliy Vasilyuk
 * SPDX-License-Identifier: AGPL-3.0-only
 ***********************************************/

export default {
  extends: ["@commitlint/config-conventional"],
  ignores: [(message) => message.includes("dependabot[bot]")],
};
