/***********************************************
 * Copyright 2025 Vasiliy Vasilyuk
 * SPDX-License-Identifier: AGPL-3.0-only
 ***********************************************/

export default {
  "settings.title": "Настройки Hashify Attachments",
  "settings.hash_algo": "Алгоритм хеширования",
  "settings.hash_algo_desc": "Выберите алгоритм хеширования для переименования файлов.",
  "command.rename-attached-files.name": "Переименовать все вложения в каталоге по вашему выбору",
  "command.rename-all-files.name": "Переименовать все вложения в хранилище",
  "command.rename-folder.name": "Заменить имена всех файлов в папке хешем файла в формате Hex",
  "command.rename-file.name": "Заменить имя файла хешем файла в формате Hex",
  "error.noRootFound": "Корневая папка не найдена.",
  "error.noGetRoot": "Метод Vault.getRoot() недоступен.",
  "error.hash_mismatch.title": "Ошибка: Нельзя перезаписать файл, содержимое различается!",
  "error.hash_mismatch.body": "Исходный файл: {{source}}\nЦелевой файл: {{target}}",
  "error.hash_mismatch.console":
    "Hashify Attachments: Нельзя перезаписать файл — хеши содержимого отличаются.\nИсходник: {{source}}\nЦель: {{target}}\nSHA-512 исходника: {{source_hash}}\nSHA-512 цели: {{target_hash}}",
  "notice.renamedAttached": "Вложения переименованы",
  "notice.renamedAll": "Все файлы переименованы",
};
