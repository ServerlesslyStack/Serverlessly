import { writeFileSync } from 'fs';
import * as path from 'path';
import { dump } from 'js-yaml';
import loadCommitlintConfig from '@commitlint/load';

const semanticConfig = {
  titleOnly: true,
  allowMergeCommits: true,
};

loadCommitlintConfig(
  {},
  {
    file: path.join(__dirname, '../configs/commitlint.config.js'),
  }
).then((config) => {
  writeFileSync(
    path.join(__dirname, '../.github/semantic.yml'),
    dump({
      ...semanticConfig,
      types: config.rules['type-enum']?.[2],
      scopes: config.rules['scope-enum']?.[2],
    })
  );
});
