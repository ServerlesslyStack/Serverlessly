import { prompt, Separator } from 'inquirer';

import { lib, LibType } from './state';
import { askDirectory, askName } from './prompt-helpers';
import scaffold from './scaffold';

export default async function main(): Promise<void> {
  lib.type = (
    await prompt<{ packageType: LibType }>({
      name: 'packageType',
      message: 'What are you scaffolding?',
      type: 'list',
      choices: [
        'Protocol',
        'Middleware Engine',
        'Platform Adapter',
        new Separator(),
        'Generic Package',
      ],
    })
  ).packageType;

  if (lib.type === 'Generic Package') {
    await askDirectory();
  }

  await askName();
  await scaffold();

  console.info('Scaffolding was successful!');
}
