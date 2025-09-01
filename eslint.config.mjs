import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import licenseHeader from 'eslint-plugin-license-header';

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    rules: {
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'linebreak-style': ['error', 'unix'],
      'no-trailing-spaces': 'error',
      '@typescript-eslint/no-var-requires': 'off',
      'eol-last': ['error', 'always'],
    },
  },

  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    ignores: [
      'main.js',
      'eslint.config.mjs',
      'esbuild.config.mjs',
      'jest.config.mjs',
    ],
    plugins: {
      'license-header': licenseHeader,
    },
    rules: {
      'license-header/header': [
        'error',
        [
          '/***********************************************',
          ' * Copyright 2025 Vasiliy Vasilyuk',
          ' * SPDX-License-Identifier: AGPL-3.0-only',
          ' ***********************************************/',
        ],
      ],
    },
  },

  {
    ignores: ['node_modules/', 'main.js'],
  },
];
