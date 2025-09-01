# Hashify Attachments for Obsidian

[![plugin](https://img.shields.io/github/v/release/xorcare/obsidian-hashify-attachments?label=plugin&display_name=tag&logo=obsidian&color=purple&logoColor=violet)](https://github.com/xorcare/obsidian-hashify-attachments/releases/latest)
[![downloads](https://img.shields.io/github/downloads/xorcare/obsidian-hashify-attachments/total?logo=github)](https://github.com/xorcare/obsidian-hashify-attachments/releases/latest)
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

## Thank you for your support

If you found this project useful, please support it by giving it a star
on [GitHub](https://github.com/xorcare/obsidian-hashify-attachments).
This will help other users discover the project and will motivate me to continue developing it!
Thank you for your support!

## Usage

1. **Choose hash algorithm:**  
   Open the plugin settings tab and select your preferred hashing algorithm.
2. **Rename files:**  
   Use the command palette or plugin menu to:
    - Rename all attachments in a folder of your choice (recursively).
    - Rename all attachments in the vault  (except `.md` files).
3. **Internal links update:**  
   After renaming, all internal links in your markdown notes to these files are updated automatically.

## Supported Hash Algorithms

- SHA-1
- SHA-256
- SHA-384
- SHA-512

## How it works

- The plugin replaces each file's name with a hash based on the file's actual contents.
- If there are existing files with the same hash name, they are overwritten.
- All links to the affected attachments in your notes are adjusted to point to the new hashed filenames.

## Installation

Briefly: download `obsidian-hashify-attachments-x.y.z.zip` from the latest
[release](https://github.com/xorcare/obsidian-hashify-attachments/releases/latest) on GitHub,
extract it into `vault/.obsidian/plugins/obsidian-hashify-attachments` so that `main.js` and
`manifest.json` are inside that folder, then restart Obsidian and enable the plugin in Community
plugins.

### What to download

- Open the plugin’s GitHub page, go
  to [Releases](https://github.com/xorcare/obsidian-hashify-attachments/releases/latest), and
  download `obsidian-hashify-attachments-x.y.z.zip` — it’s the prebuilt package for manual
  installation.
- Ensure the archive contains at least `main.js` and `manifest.json`, also styles.css or extra files
  may also be included.

### Where to extract

- In Obsidian: Settings → Community plugins → Installed plugins → click the folder icon to open
  `vault/.obsidian/plugins`.
- Extract `obsidian-hashify-attachments-x.y.z.zip` directly into that directory. The result should
  be `vault/.obsidian/plugins/obsidian-hashify-attachments` containing `main.js` and
  `manifest.json` (and, if present, styles.css and other files).

### Activation

- Restart Obsidian or refresh the plugin list in Community plugins so the app rescans the folder.
- Enable the plugin: Settings → Community plugins → Installed plugins → toggle
  obsidian-hashify-attachments. Make sure Restricted Mode is off (**Turn on community plugins**).

### Checks and common pitfalls

- Folder structure: manifest.json must be directly inside plugins/obsidian-hashify-attachments, not
  deeper (e.g., inside dist or an extra nested folder).
- Correct archive: avoid the repository-wide “Download ZIP” (source code only). Use
  the [release](https://github.com/xorcare/obsidian-hashify-attachments/releases/latest) zip
  `obsidian-hashify-attachments-x.y.z.zip`.
- Minimum files: without `main.js` and `manifest.json`, Obsidian will not recognize or enable the
  plugin.
