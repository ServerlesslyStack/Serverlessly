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

function updateLabelerConfig() {
  return [
    `ts-node ${path.join(__dirname, '../scripts/update-labeler.ts')}`,
    `git add ${path.join(__dirname, '../.github/labeler.yml')}`,
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
    return `node -e "throw 'Editing .github/semantic.yml file manually is not allowed. Update scripts/update-semantic.ts file instead.'"`;
  }

  const labelerConfig = mm(stagedFiles, ['**/.github/labeler.yml']);
  if (labelerConfig.length) {
    return `node -e "throw 'Editing .github/labeler.yml file manually is not allowed. Update scripts/update-labeler.ts file instead.'"`;
  }

  const codeFiles = mm(stagedFiles, ['*.ts', '*.js'], {
    dot: true,
    matchBase: true,
  });
  const configFiles = mm(stagedFiles, ['*.json', '*.yml', '*.yaml'], {
    dot: true,
    matchBase: true,
  });
  const docsFiles = mm(stagedFiles, ['**/*.md']);

  return [
    format([...codeFiles, ...configFiles, ...docsFiles]),
    lint(codeFiles),
    ...updateSemanticConfig(),
    ...updateLabelerConfig(),
  ];
};

module.exports = lintStagedConfig;
