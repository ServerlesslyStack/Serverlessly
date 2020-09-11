const fs = require('fs');
const path = require('path');

const huskyScriptPath = path.join(__dirname, '../.git/hooks/husky.sh');

// If Operating System is Windows, fix Husky for Yarn
if (process.platform === 'win32') {
  const huskyScript = fs.readFileSync(huskyScriptPath, {
    encoding: 'utf-8',
  });
  const fixedHuskyScript = huskyScript.replace(
    'run_command yarn run --silent;;',
    'run_command npx --no-install;;'
  );
  fs.writeFileSync(huskyScriptPath, fixedHuskyScript);
}
