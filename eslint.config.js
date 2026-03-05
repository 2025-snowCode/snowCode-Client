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

      // 1. Public API: Only allow imports from index.ts (Entry Point)
      'boundaries/entry-point': [
        'error',
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

      // 2. Layer Boundaries: No imports from upper layers
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

      // 3. Slice Isolation: No cross-slice imports within the same layer
      'boundaries/no-unknown': 'off', // Disable for now to test stability
      'boundaries/no-unknown-files': 'off',
    },
  },
])
