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
    'no-console': 'warn',
    indent: 'off',
    'sort-imports': ['error', { ignoreDeclarationSort: true, allowSeparatedGroups: true }],
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'import/named': 'off',
    'import/namespace': ['error', { allowComputed: true }],
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
    'import/no-cycle': 'error',
    'react/prop-types': 'off',
    'relay/graphql-syntax': 'error',
    'relay/compat-uses-vars': 'warn',
    'relay/graphql-naming': 'error',
    'relay/generated-flow-types': 'off',
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
