/***********************************************
 * Copyright 2025 Vasiliy Vasilyuk
 * SPDX-License-Identifier: AGPL-3.0-only
 ***********************************************/

export default {
  "settings.title": "Hashify Attachments Settings",
  "settings.hash_algo": "Hash algorithm",
  "settings.hash_algo_desc": "Select which hashing algorithm to use for renaming files.",
  "command.rename-attached-files.name": "Rename all attachments in a folder of your choice",
  "command.rename-all-files.name": "Rename all attachments in the vault",
  "command.rename-folder.name":
    "Replace all file names in a folder with the file hash in Hex format",
  "command.rename-file.name": "Replace file name with file hash in Hex format",
  "error.noRootFound": "Root folder not found.",
  "error.noGetRoot": "Vault.getRoot() is not available.",
  "error.hash_mismatch.title": "Error: Cannot overwrite file because contents differ!",
  "error.hash_mismatch.body": "Source file: {{source}}\nTarget file: {{target}}",
  "error.hash_mismatch.console":
    "Hashify Attachments: Cannot overwrite file due to different content hashes.\nSource: {{source}}\nTarget: {{target}}\nSource SHA-512: {{source_hash}}\nTarget SHA-512: {{target_hash}}",
  "notice.renamedAttached": "Attached files renamed",
  "notice.renamedAll": "All files renamed",
};
