const mm = require('micromatch');
const path = require('path');

function format(files) {
  if (!files.length) {
    return 'echo No Files to Format';
  }
  return `prettier --write ${files.join(' ')}`;
}

function lint(files) {
  if (!files.length) {
    return 'echo No Files to Lint';
  }
  return `eslint ${files.join(' ')}`;
}

function updateSemanticConfig() {
  return [
    `ts-node ${path.join(__dirname, '../scripts/update-semantic.ts')}`,
    `git add ${path.join(__dirname, '../.github/semantic.yml')}`,
  ];
}

const lintStagedConfig = (stagedFiles) => {
  const jsFilesInPackages = mm(stagedFiles, [
    '**/@(@serverlessly|packages)/**/*.js',
  ]);
  if (jsFilesInPackages.length) {
    return `node -e "throw 'Javascript files are not allowed. Convert them to Typescript files.'"`;
  }

  const semanticConfig = mm(stagedFiles, ['**/.github/semantic.yml']);
  if (semanticConfig.length) {
    return `node -e "throw 'Editing semantic.yml file manually is not allowed. Update scripts/update-semantic.ts file instead.'"`;
  }

  const codeFiles = mm(stagedFiles, ['*.ts', '*.js'], {
    dot: true,
    matchBase: true,
  });
  const jsonFiles = mm(stagedFiles, ['**/*.json']);
  const docsFiles = mm(stagedFiles, ['**/*.md']);

  return [
    format([...codeFiles, ...jsonFiles, ...docsFiles]),
    lint(codeFiles),
    ...updateSemanticConfig(),
  ];
};

module.exports = lintStagedConfig;
