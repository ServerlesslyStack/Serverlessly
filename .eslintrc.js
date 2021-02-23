const eslintConfig = {
  root: true,
  extends: ['eslint:recommended', 'prettier'],
  parserOptions: { ecmaVersion: 9 },
  env: { node: true, es6: true, jest: true },
  overrides: [
    {
      files: ['**/*.ts'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint', 'eslint-plugin-tsdoc'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
      ],
      rules: {
        'tsdoc/syntax': 'warn',
        '@typescript-eslint/ban-types': 'off',
      },
    },
  ],
};

module.exports = eslintConfig;
