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
        'build',
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
        'style',
        'test',
      ],
    ],
  },
};

module.exports = commitlintConfig;
