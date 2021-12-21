module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'import', 'relay', 'react-hooks'],
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:relay/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  rules: {
    // Eslint
    indent: 'off',
    'no-console': 'warn',
    'sort-imports': ['error', { ignoreDeclarationSort: true, allowSeparatedGroups: true }],

    // Typescript
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-var-requires': 'off',

    // Import
    'import/named': 'off',
    'import/namespace': ['error', { allowComputed: true }],
    'import/no-cycle': 'error',
    'import/no-duplicates': 'error',
    'import/order': [
      'error',
      {
        'newlines-between': 'always-and-inside-groups',
        pathGroups: [{ pattern: '@workspace/**', group: 'external', position: 'after' }],
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],

    // React
    'react/jsx-uses-react': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',

    // Relay
    'relay/compat-uses-vars': 'warn',
    'relay/generated-flow-types': 'off',
    'relay/graphql-naming': 'error',
    'relay/graphql-syntax': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      'eslint-import-resolver-typescript': true,
    },
  },
};
