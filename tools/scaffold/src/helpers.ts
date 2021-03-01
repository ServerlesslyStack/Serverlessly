import * as fs from 'fs';
import * as path from 'path';

import * as yml from 'js-yaml';
import { serverlesslyPackage } from './state';

export function getProtocols(): string[] {
  const semanticData = <{ scopes: string[] }>(
    yml.load(
      fs.readFileSync(
        path.join(__dirname, '../../../.github/semantic.yml'),
        'utf-8'
      )
    )
  );

  const protocolPackages = semanticData.scopes.filter((p) =>
    p.startsWith('protocol-')
  );

  return protocolPackages.map((p) => p.replace('protocol-', ''));
}

export function getPackageNamePrefix(): string {
  let prefix = '';
  if (serverlesslyPackage.directory === '@serverlessly') {
    prefix += '@serverlessly/';
  }

  switch (serverlesslyPackage.type) {
    case 'Protocol':
      prefix += 'protocol-';
      break;
    case 'Middleware Engine':
      prefix += `${serverlesslyPackage.protocol}-mengine-`;
      break;
    case 'Platform Adapter':
      prefix += `${serverlesslyPackage.protocol}-platform-`;
      break;
    default:
      prefix += '';
      break;
  }
  return prefix;
}
