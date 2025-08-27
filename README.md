# Hashify Attachments for Obsidian

[![plugin](https://img.shields.io/github/v/release/xorcare/obsidian-hashify-attachments?label=plugin&display_name=tag&logo=obsidian&color=purple&logoColor=violet)](https://github.com/xorcare/obsidian-hashify-attachments/releases/latest)
[![downloads](https://img.shields.io/github/downloads/xorcare/obsidian-hashify-attachments/total?logo=github)](https://github.com/xorcare/obsidian-hashify-attachments)
[![Telegram Channel](https://img.shields.io/badge/Telegram-Channel-blue.svg?logo=telegram)](https://t.me/obsidian_hashify_attachments)

## Description

This Obsidian plugin automatically renames all attached (non-markdown) files in your vault using their unique
cryptographic hash (such as SHA-256 or SHA-512) instead of their original file names.

**Benefits:**

- Ensures each attachment has a unique, content‑based name.
- Automatically updates all internal links in your notes to the renamed files.
- Lets you choose the hashing algorithm (e.g., SHA-1, SHA-256, SHA-384, SHA-512) in plugin settings.

The plugin does **not** rename your notes (`.md` files).
It helps keep attachments organized and unique—even if many files share the same original name.

---

## Usage

1. **Choose hash algorithm:**  
   Open the plugin settings tab and select your preferred hashing algorithm.
2. **Rename files:**  
   Use the command palette or plugin menu to:
    - Rename all attachments in a folder of your choice (recursively).
    - Rename all attachments in the vault  (except `.md` files).
3. **Internal links update:**  
   After renaming, all internal links in your markdown notes to these files are updated automatically.

---

## Supported Hash Algorithms

- SHA-1
- SHA-256
- SHA-384
- SHA-512

---

## How it works

- The plugin replaces each file's name with a hash based on the file's actual contents.
- If there are existing files with the same hash name, they are overwritten.
- All links to the affected attachments in your notes are adjusted to point to the new hashed filenames.

---

## Installation

1. Place `main.js`, `manifest.json`, and any necessary metadata files in your Obsidian plugins folder.
2. Enable **Hashify Attachments** in Obsidian's Community Plugins tab.
3. Configure settings as you wish and enjoy automatic attachment organization!

---
