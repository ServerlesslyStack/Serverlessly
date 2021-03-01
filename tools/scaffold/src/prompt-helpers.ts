import * as fs from 'fs';
import * as path from 'path';
import { prompt } from 'inquirer';

import { serverlesslyPackage, Package } from './state';
import { getPackageNamePrefix, getProtocols } from './helpers';

export async function askDirectory(): Promise<void> {
  serverlesslyPackage.directory = (
    await prompt<Pick<Package, 'directory'>>({
      name: 'directory',
      message: 'Directory where you want to create this generic package:',
      type: 'list',
      choices: ['packages', '@serverlessly'],
    })
  ).directory;
}

export async function askProtocol(): Promise<void> {
  serverlesslyPackage.protocol = (
    await prompt<Pick<Package, 'protocol'>>({
      name: 'protocol',
      message: `Protocol for which you want to create ${serverlesslyPackage.type}`,
      type: 'list',
      choices: getProtocols(),
    })
  ).protocol;
}

export async function askName(): Promise<void> {
  const packageNamePrefix = getPackageNamePrefix();
  const enteredName = (
    await prompt<Pick<Package, 'name'>>({
      name: 'name',
      message: `Name of the ${serverlesslyPackage.type} ('${packageNamePrefix}' will be automatically prefixed):`,
      type: 'input',
    })
  ).name;

  serverlesslyPackage.name = packageNamePrefix + enteredName;

  if (!enteredName) {
    console.error('Name must not be empty.');
    await askName();
  }

  if (
    !serverlesslyPackage.name.match(
      '^(?:@[a-z0-9-*~][a-z0-9-*._~]*/)?[a-z0-9-~][a-z0-9-._~]*$'
    )
  ) {
    console.error('Name must be valid string allowed in npm package name.');
    await askName();
  }

  if (
    fs.existsSync(
      path.join(
        __dirname,
        '../../..',
        serverlesslyPackage.directory,
        serverlesslyPackage.name.replace('@serverlessly/', ''),
        'package.json'
      )
    )
  ) {
    console.error(
      `Package already exists in '${serverlesslyPackage.directory}' directory. Please, enter a new name.`
    );
    await askName();
  }
}
