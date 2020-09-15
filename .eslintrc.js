const eslintConfig = {
  root: true,
  extends: ['eslint:recommended', 'prettier'],
  parserOptions: { ecmaVersion: 9 },
  env: { node: true, es6: true, jest: true },
  overrides: [
    {
      files: ['**/*.ts'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'prettier/@typescript-eslint',
      ],
    },
  ],
};

module.exports = eslintConfig;
