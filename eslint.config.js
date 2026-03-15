import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'
import boundaries from 'eslint-plugin-boundaries'
import steiger from '@feature-sliced/steiger-plugin'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      boundaries,
      steiger,
    },
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    settings: {
      'boundaries/elements': [
        {
          type: 'app',
          pattern: 'src/app/*',
        },
        {
          type: 'pages',
          pattern: 'src/pages/*',
        },
        {
          type: 'widgets',
          pattern: 'src/widgets/*',
        },
        {
          type: 'features',
          pattern: 'src/features/*',
        },
        {
          type: 'entities',
          pattern: 'src/entities/*',
        },
        {
          type: 'shared',
          pattern: 'src/shared/*',
        },
      ],
    },
    rules: {
      ...steiger.configs.recommended.rules,

      'boundaries/entry-point': [
        'off',
        {
          rules: [
            {
              target: [['entities', { slice: '*' }]],
              allow: 'index.ts',
            },
            {
              target: [['features', { slice: '*' }]],
              allow: 'index.ts',
            },
            {
              target: [['widgets', { slice: '*' }]],
              allow: 'index.ts',
            },
            {
              target: [['pages', { slice: '*' }]],
              allow: 'index.ts',
            },
          ],
        },
      ],

      'boundaries/element-types': [
        'error',
        {
          default: 'allow',
          rules: [
            {
              from: 'shared',
              disallow: ['entities', 'features', 'widgets', 'pages', 'app'],
            },
            {
              from: 'entities',
              disallow: ['features', 'widgets', 'pages', 'app'],
            },
            {
              from: 'features',
              disallow: ['widgets', 'pages', 'app'],
            },
            {
              from: 'widgets',
              disallow: ['pages', 'app'],
            },
            {
              from: 'pages',
              disallow: ['app'],
            },
          ],
        },
      ],

      'boundaries/no-unknown': 'off',
      'boundaries/no-unknown-files': 'off',
    },
  },
])
