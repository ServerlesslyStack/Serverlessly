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
    const jsFilesInPackages = mm(stagedFiles, [
      '**/@(@serverlessly|packages)/**/*.js',
    ]);
    if (jsFilesInPackages.length) {
      return `node -e "throw 'Javascript files are not allowed. Convert them to Typescript files.'"`;
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
    ];
  },
};

module.exports = lintStagedConfig;
