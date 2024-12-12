// @ts-check
import stylistic from '@stylistic/eslint-plugin';
import playwright from 'eslint-plugin-playwright';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';

const includedFolders = ['src', 'features'];

const customizedESLint = stylistic.configs.customize({
  indent: 2,
  quotes: 'single',
  semi: true,
  jsx: true,
  commaDangle: 'only-multiline',
  braceStyle: '1tbs',
});

export default tseslint.config(
  {
    ignores: [
      '**/{www,dist,build}/**/*.*',
      'projects/*/!(src)/**/*.*',
      `!(${includedFolders.join(',')})/**/*.*`,
      '!*.{js,ts,mjs,cjs}',
    ],
  },
  {
    name: 'typescript',
    files: ['**/*.{ts,js,tsx,jsx,mjs,cjs,mts}'],
    extends: [...tseslint.configs.recommendedTypeChecked, ...tseslint.configs.stylisticTypeChecked],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@stylistic': stylistic,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      ...customizedESLint.rules,
      '@stylistic/arrow-parens': ['error', 'as-needed'],
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-call': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error'
    },
  },
  {
    name: 'tests',
    ...playwright.configs['flat/recommended'],
    files: ['**/*.test.{ts,js}?(x)', 'e2e/src/**/*.ts'],
    rules: {
      'playwright/no-wait-for-timeout': 'error',
      'playwright/no-wait-for-selector': 'error',
    },
  },
);
