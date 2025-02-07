const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');
const nxEslintPlugin = require('@nx/eslint-plugin');
const typescriptEslintEslintPlugin = require('@typescript-eslint/eslint-plugin');
const eslintPluginSonarjs = require('eslint-plugin-sonarjs');
const eslintPluginPrettier = require('eslint-plugin-prettier');
const eslintPluginJsxA11y = require('eslint-plugin-jsx-a11y');
const eslintPluginReactHooks = require('eslint-plugin-react-hooks');
const eslintPluginSimpleImportSort = require('eslint-plugin-simple-import-sort');
const eslintEmotion = require('@emotion/eslint-plugin');
const eslintCypress = require('eslint-plugin-cypress');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  {
    ignores: ['**/*/.next/*'],
  },
  js.configs.recommended,
  ...compat.extends(
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:sonarjs/recommended-legacy',
    'plugin:prettier/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:cypress/recommended',
  ),
  {
    plugins: {
      '@nx': nxEslintPlugin,
      '@typescript-eslint': typescriptEslintEslintPlugin,
      sonarjs: eslintPluginSonarjs,
      prettier: eslintPluginPrettier,
      'jsx-a11y': eslintPluginJsxA11y,
      'react-hooks': eslintPluginReactHooks,
      'simple-import-sort': eslintPluginSimpleImportSort,
      '@emotion': eslintEmotion,
      cypress: eslintCypress,
    },
  },
  {
    settings: {
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
  },
  {
    rules: {
      'react/prop-types': 0,
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'enum',
          format: ['PascalCase'],
          suffix: ['Enum'],
        },
      ],
      'prefer-destructuring': [
        'error',
        {
          array: true,
          object: true,
        },
        { enforceForRenamedProperties: false },
      ],
      '@typescript-eslint/array-type': ['error', { default: 'generic' }],
      '@typescript-eslint/ban-ts-comment': 'error',
      '@typescript-eslint/consistent-generic-constructors': 'error',
      '@typescript-eslint/consistent-indexed-object-style': 'error',
      '@typescript-eslint/indent': 'off',
      '@typescript-eslint/no-duplicate-enum-values': 'error',
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/no-use-before-define': 'error',
      'class-methods-use-this': 'off',
      'no-inline-comments': 'error',
      'no-nested-ternary': 'error',
      'no-shadow': 'off',
      'no-console': 'off',
      'no-explicit-any': 'off',
      'no-unreachable': 'error',
      'no-unused-vars': 'off',
      '@emotion/jsx-import': 'error',
      '@emotion/no-vanilla': 'error',
      '@emotion/import-from-emotion': 'error',
      '@emotion/styled-import': 'error',
      'no-restricted-imports': [
        'warn',
        {
          patterns: [
            {
              group: ['../*'],
              message: 'Usage of relative parent imports is not allowed.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
  },
  ...compat
    .config({
      plugins: ['cypress', 'chai-friendly'],
      extends: [
        'plugin:@nx/typescript',
        'plugin:cypress/recommended',
        'plugin:chai-friendly/recommended',
      ],
    })
    .map((config) => ({
      ...config,
      files: ['**/*.cy.ts', '**/*.cy.tsx'],
      rules: {
        ...config.rules,
      },
    })),
  ...compat
    .config({
      plugins: ['@vitest'],
      extends: ['plugin:@vitest/legacy-recommended'],
    })
    .map((config) => ({
      ...config,
      files: ['**/*.test.ts', '**/*.test.tsx'],
      rules: {
        ...config.rules,
      },
    })),
  ...compat.config({ extends: ['plugin:@nx/typescript'] }).map((config) => ({
    ...config,
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      ...config.rules,
    },
  })),
  ...compat.config({ extends: ['plugin:@nx/javascript'] }).map((config) => ({
    ...config,
    files: ['**/*.js', '**/*.jsx'],
    rules: {
      ...config.rules,
    },
  })),
];
