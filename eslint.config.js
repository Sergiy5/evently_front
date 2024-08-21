import js from '@eslint/js';
import globals from 'globals';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import typescriptEslintParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  {
    'no-restricted-imports': 'off',
    '@typescript-eslint/no-restricted-imports': [
      'warn',
      {
        name: 'react-redux',
        importNames: ['useSelector', 'useDispatch'],
        message:
          'Use typed hooks `useAppDispatch` and `useAppSelector` instead.',
      },
    ],
    files: ['**/*.{ts,tsx}', 'tailwind.config.js'],
    ignores: ['dist', 'build'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
        module: 'readonly',
        __dirname: 'readonly',
        React: true,
      },
      parser: typescriptEslintParser,
      sourceType: 'module',
    },
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
    plugins: {
      react: react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@typescript-eslint': typescriptEslintPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...typescriptEslintPlugin.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
      ],
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'no-undef': 'off',
    },
  },
  js.configs.recommended,
];

// import js from '@eslint/js';
// import globals from 'globals';
// import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
// import typescriptEslintParser from '@typescript-eslint/parser';
// import react from 'eslint-plugin-react'; // Add react plugin
// import reactHooks from 'eslint-plugin-react-hooks';
// import reactRefresh from 'eslint-plugin-react-refresh';

// export default [
//   {
//     files: ['**/*.{ts,tsx}', 'tailwind.config.js'],
//     ignores: ['dist'],
//     languageOptions: {
//       ecmaVersion: 2020,
//       globals: {
//         ...globals.browser,
//         module: 'readonly',
//         __dirname: 'readonly',
//         React: true,
//       },
//       parser: typescriptEslintParser,
//       sourceType: 'module',
//     },
//     parserOptions: {
//       project: ['./tsconfig.node.json', './tsconfig.app.json'],
//       tsconfigRootDir: import.meta.dirname,
//     },
//     plugins: {
//       react: react,
//       'react-hooks': reactHooks,
//       'react-refresh': reactRefresh,
//       '@typescript-eslint': typescriptEslintPlugin,
//     },
//     settings: {
//       react: {
//         version: 'detect', // Automatically detect the React version
//       },
//     },
//     rules: {
//       ...typescriptEslintPlugin.configs.recommended.rules,
//       ...react.configs.recommended.rules,
//       ...reactHooks.configs.recommended.rules,
//       'react-refresh/only-export-components': [
//         'warn',
//         { allowConstantExport: true },
//       ],
//       'padding-line-between-statements': [
//         'error',
//         { blankLine: 'always', prev: '*', next: 'return' },
//       ],
//       'react/react-in-jsx-scope': 'off', // Disable React in scope rule for JSX
//       'react/prop-types': 'off', // Disable prop-types rule for TypeScript
//       'no-undef': 'off', // Disable undefined check, should be handled by TypeScript
//     },
//   },
//   js.configs.recommended,
// ];

// // import js from '@eslint/js';
// // import globals from 'globals';
// // import reactHooks from 'eslint-plugin-react-hooks';
// // import reactRefresh from 'eslint-plugin-react-refresh';
// // import tseslint from 'typescript-eslint';

// // export default tseslint.config({
// //   extends: [js.configs.recommended, ...tseslint.configs.recommended],
// //   files: ['**/*.{ts,tsx}'],
// //   ignores: ['dist'],
// //   languageOptions: {
// //     ecmaVersion: 2020,
// //     globals: globals.browser,
// //   },
// //   plugins: {
// //     'react-hooks': reactHooks,
// //     'react-refresh': reactRefresh,
// //   },
// //   rules: {
// //     ...reactHooks.configs.recommended.rules,
// //     'react-refresh/only-export-components': [
// //       'warn',
// //       { allowConstantExport: true },
// //     ],
// //   },
// //   'padding-line-between-statements': [
// //     'error',
// //     { blankLine: 'always', prev: '*', next: 'return' },
// //   ],
// // });
