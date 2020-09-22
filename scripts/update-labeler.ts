import { writeFileSync } from 'fs';
import * as path from 'path';
import { safeDump } from 'js-yaml';
import loadCommitlintConfig from '@commitlint/load';

loadCommitlintConfig(
  {},
  {
    file: path.join(__dirname, '../configs/commitlint.config.js'),
  }
).then((config) => {
  writeFileSync(
    path.join(__dirname, '../.github/labeler.yml'),
    safeDump(
      config.rules['scope-enum']?.[2]?.reduce(
        (acc, scope) => ({
          ...acc,
          [`@serverlessly/${scope}`]: [`@serverlessly/${scope}/**/*`],
        }),
        {}
      )
    )
  );
});
