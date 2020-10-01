const commitlintConfig = {
  extends: [
    '@commitlint/config-conventional',
    '@commitlint/config-lerna-scopes',
  ],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'chore',
        'devops',
        'docs',
        'env',
        'feat',
        'fix',
        'perf',
        'refactor',
        'repo',
        'revert',
        'style',
        'test',
      ],
    ],
  },
};

module.exports = commitlintConfig;
