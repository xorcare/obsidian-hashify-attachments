import eslintJS from "@eslint/js";
import eslintTS from "typescript-eslint";
import licenseHeader from "eslint-plugin-license-header";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default [
  eslintJS.configs.recommended,

  ...eslintTS.config({
    files: ["**/*.{ts,tsx,mts,cts}"],
    extends: [...eslintTS.configs.recommendedTypeChecked],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  }),

  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    rules: {
      semi: ["error", "always"],
      "linebreak-style": ["error", "unix"],
      "no-trailing-spaces": "error",
      "@typescript-eslint/no-var-requires": "off",
      "eol-last": ["error", "always"],
    },
  },

  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    ignores: ["main.js", "eslint.config.mjs", "esbuild.config.mjs", "jest.config.mjs"],
    plugins: {
      "license-header": licenseHeader,
    },
    rules: {
      "license-header/header": [
        "error",
        [
          "/***********************************************",
          " * Copyright 2025 Vasiliy Vasilyuk",
          " * SPDX-License-Identifier: AGPL-3.0-only",
          " ***********************************************/",
        ],
      ],
    },
  },

  {
    ignores: ["node_modules/", "main.js"],
  },

  eslintConfigPrettier,
];
