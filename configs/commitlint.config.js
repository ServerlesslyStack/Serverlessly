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
        'lint',
        'perf',
        'refactor',
        'repo',
        'revert',
        'test',
      ],
    ],
  },
};

module.exports = commitlintConfig;
