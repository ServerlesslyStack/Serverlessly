import * as path from 'path';
import * as shell from 'shelljs';
import { lib } from './state';

const templateRoot = path.join(__dirname, '../templates');

export default async function scaffold(): Promise<void> {
  if (lib.type === 'Middleware Engine' || lib.type === 'Platform Adapter') {
    console.info(
      `Specific scaffolding for ${lib.type} isn't available yet. It'll be scaffolded as a generic package.`
    );

    //TODO: Implement Middleware Engine & Platform Adapter specific scaffolding
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

    case 'Protocol':
      protocolScaffold(packageRoot);
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

function protocolScaffold(packageRoot: string) {
  shell.touch(
    path.join(
      packageRoot,
      `lib/${lib.name.replace('@serverlessly/protocol-', '')}.ts`
    ),
    path.join(
      packageRoot,
      `__tests__/${lib.name.replace('@serverlessly/protocol-', '')}.test.ts`
    ),
    path.join(packageRoot, `lib/middleware-engine.ts`),
    path.join(packageRoot, `__tests__/middleware-engine.test.ts`),
    path.join(packageRoot, `lib/middleware.ts`),
    path.join(packageRoot, `__tests__/middleware.test.ts`),
    path.join(packageRoot, `lib/protocol-context.ts`),
    path.join(packageRoot, `__tests__/protocol-context.test.ts`),
    path.join(packageRoot, `lib/server-factory.ts`),
    path.join(packageRoot, `__tests__/server-factory.test.ts`)
  );

  shell.cp(path.join(templateRoot, 'protocol/index.ts'), packageRoot);

  shell.sed(
    '-i',
    '\\[\\[PROTOCOL_NAME\\]\\]',
    lib.name.replace('@serverlessly/protocol-', ''),
    [path.join(packageRoot, 'index.ts')]
  );
}
