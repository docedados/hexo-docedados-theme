import globals from 'globals';
import eslintJsonc from 'eslint-plugin-jsonc';
import * as eslintJsoncParser from 'jsonc-eslint-parser';
import prettier from 'eslint-plugin-prettier';
import * as importPlugin from 'eslint-plugin-import-x';
import js from '@eslint/js';

export default [
  {
    // global ignores
    // folders can only be ignored at the global level, per-cfg you must do: '**/dist/**/*'
    ignores: [
      '**/coverage/',
      '**/node_modules/',
      '**/*.ejs',
      '**/package.json',
      '**/package-lock.json',
      '**/*.min.js',
    ],
  },
  // general defaults
  js.configs.recommended,
  importPlugin.flatConfigs.recommended,
  {
    // disable namespace rule globally: its internal parser doesn't understand
    // ES2025 import attributes used by jsonc-eslint-parser
    rules: {
      'import-x/namespace': 'off',
    },
  },
  {
    files: ['**/*.js'],
    rules: {
      'prettier/prettier': [
        'error',
        {},
        {
          usePrettierrc: true,
        },
      ],
      'no-console': 'warn',
      'import-x/extensions': [
        'warn',
        'always',
        {
          js: 'always',
          json: 'always',
        },
      ],
    },
    plugins: {
      prettier,
      importPlugin,
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        hexo: true,
      },
    },
  },
  {
    files: ['**/*.json'],
    ignores: ['**/package.json', '**/package-lock.json', '**/db.json'],
    plugins: {
      jsonc: eslintJsonc,
      prettier,
    },
    languageOptions: {
      parser: eslintJsoncParser,
      parserOptions: {
        jsonSyntax: 'JSON',
      },
    },
    rules: {
      'prettier/prettier': [
        'error',
        {},
        {
          usePrettierrc: true,
        },
      ],
      'no-console': 'warn',
    },
  },
];
