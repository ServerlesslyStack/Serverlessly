import { readFileSync, writeFileSync } from 'fs';
import * as path from 'path';

const huskyScriptPath = path.join(__dirname, '../.husky/_/husky.sh');

// If Operating System is Windows, fix Husky for Yarn
if (process.platform === 'win32') {
  const huskyScript = readFileSync(huskyScriptPath, {
    encoding: 'utf-8',
  });
  const fixedHuskyScript = huskyScript.replace(
    'run_command yarn run --silent;;',
    'run_command npx --no-install;;'
  );
  writeFileSync(huskyScriptPath, fixedHuskyScript);
}
