import * as fs from 'fs';
import * as path from 'path';
import { prompt } from 'inquirer';

import { lib, AllowedDir } from './state';

export async function askDirectory(): Promise<void> {
  lib.directory = (
    await prompt<{ directory: AllowedDir }>({
      name: 'directory',
      message: 'Directory where you want to create this generic package:',
      type: 'list',
      choices: ['packages', '@serverlessly'],
    })
  ).directory;
}

export async function askName(): Promise<void> {
  lib.name = (
    await prompt<{ name: string }>({
      name: 'name',
      message: `Name of the npm package:`,
      type: 'input',
    })
  ).name;

  if (!lib.name) {
    console.error('Name must not be empty.');
    await askName();
  }

  if (
    !lib.name.match('^(?:@[a-z0-9-*~][a-z0-9-*._~]*/)?[a-z0-9-~][a-z0-9-._~]*$')
  ) {
    console.error('Name must be valid npm package name.');
    await askName();
  }

  if (
    fs.existsSync(
      path.join(
        __dirname,
        '../../..',
        lib.directory,
        lib.name.replace('@serverlessly/', ''),
        'package.json'
      )
    )
  ) {
    console.error(
      `Package already exists in '${lib.directory}' directory. Please, enter a new name.`
    );
    await askName();
  }

  if (
    lib.type === 'Protocol' &&
    !lib.name.startsWith('@serverlessly/protocol-')
  ) {
    console.error(
      'Protocol package name must start with "@serverlessly/protocol-".'
    );
    await askName();
  }

  if (
    lib.type === 'Middleware Engine' &&
    !lib.name.startsWith('@serverlessly/me-')
  ) {
    console.error(
      'Middleware Engine package name must start with "@serverlessly/me-".'
    );
    await askName();
  }

  if (
    lib.type === 'Platform Adapter' &&
    !lib.name.startsWith('@serverlessly/pa-')
  ) {
    console.error(
      'Platform Adapter package name must start with "@serverlessly/pa-".'
    );
    await askName();
  }
}
