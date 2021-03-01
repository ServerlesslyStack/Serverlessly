import * as path from 'path';
import * as shell from 'shelljs';
import { serverlesslyPackage } from './state';

const templateRoot = path.join(__dirname, '../templates');

export default async function scaffold(): Promise<void> {
  if (
    serverlesslyPackage.type === 'Middleware Engine' ||
    serverlesslyPackage.type === 'Platform Adapter' ||
    serverlesslyPackage.type === 'Protocol'
  ) {
    console.info(
      `Specific scaffolding for ${serverlesslyPackage.type} isn't available yet. It'll be scaffolded as a generic package.`
    );

    //TODO: Implement Protocol, Middleware Engine & Platform Adapter specific scaffolding
    serverlesslyPackage.type = 'Generic Package';
  }

  console.info('Scaffolding..');

  const packageRoot = path.join(
    __dirname,
    '../../..',
    serverlesslyPackage.directory,
    serverlesslyPackage.name.replace('@serverlessly/', '')
  );

  commonScaffold(packageRoot);

  switch (serverlesslyPackage.type) {
    case 'Generic Package':
      genericPackageScaffold(packageRoot);
      break;

    default:
      break;
  }
}

function commonScaffold(packageRoot: string) {
  shell.mkdir(
    packageRoot,
    path.join(packageRoot, 'lib'),
    path.join(packageRoot, '__tests__')
  );

  shell.cp(
    '-R',
    [path.join(templateRoot, 'common/*'), path.join(templateRoot, 'common/.*')],
    packageRoot
  );

  shell.sed('-i', '\\[\\[PACKAGE_NAME\\]\\]', serverlesslyPackage.name, [
    path.join(packageRoot, 'package.json'),
  ]);
}

function genericPackageScaffold(packageRoot: string) {
  shell.touch(
    path.join(packageRoot, 'index.ts'),
    path.join(packageRoot, 'lib/.gitkeep'),
    path.join(packageRoot, '__tests__/.gitkeep')
  );
}
