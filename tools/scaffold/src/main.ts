import { prompt, Separator } from 'inquirer';

import { serverlesslyPackage, Package } from './state';
import { askDirectory, askName, askProtocol } from './prompt-helpers';
import scaffold from './scaffold';

export default async function main(): Promise<void> {
  serverlesslyPackage.type = (
    await prompt<Pick<Package, 'type'>>({
      name: 'type',
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
  ).type;

  if (serverlesslyPackage.type === 'Generic Package') {
    await askDirectory();
  }

  if (
    serverlesslyPackage.type === 'Middleware Engine' ||
    serverlesslyPackage.type === 'Platform Adapter'
  ) {
    await askProtocol();
  }

  await askName();
  await scaffold();

  console.info('Scaffolding was successful!');
}
