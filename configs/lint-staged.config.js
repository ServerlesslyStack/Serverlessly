const mm = require('micromatch');

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

const lintStagedConfig = {
  '*': (stagedFiles) => {
    const codeFiles = mm(stagedFiles, ['*.ts', '*.js'], {
      dot: true,
      matchBase: true,
    });
    const jsonFiles = mm(stagedFiles, ['**/*.json']);
    const docsFiles = mm(stagedFiles, ['**/*.md']);

    return [
      format([...codeFiles, ...jsonFiles, ...docsFiles]),
      lint(codeFiles),
    ];
  },
};

module.exports = lintStagedConfig;
