import * as path from 'path';
import * as shell from 'shelljs';
import { lib } from './state';

const templateRoot = path.join(__dirname, '../templates');

export default async function scaffold(): Promise<void> {
  if (
    lib.type === 'Middleware Engine' ||
    lib.type === 'Platform Adapter' ||
    lib.type === 'Protocol'
  ) {
    console.info(
      `Specific scaffolding for ${lib.type} isn't available yet. It'll be scaffolded as a generic package.`
    );

    //TODO: Implement Protocol, Middleware Engine & Platform Adapter specific scaffolding
    lib.type = 'Generic Package';
  }

  console.info('Scaffolding..');

  const packageRoot = path.join(
    __dirname,
    '../../..',
    lib.directory,
    lib.name.replace('@serverlessly/', '')
  );

  commonScaffold(packageRoot);

  switch (lib.type) {
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

  shell.sed('-i', '\\[\\[PACKAGE_NAME\\]\\]', lib.name, [
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
