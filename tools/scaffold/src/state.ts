type PackageType =
  | 'Protocol'
  | 'Middleware Engine'
  | 'Platform Adapter'
  | 'Generic Package';

type AllowedDir = '@serverlessly' | 'packages';

export interface Package {
  name: string;
  directory: AllowedDir;
  type: PackageType;
  protocol?: string;
}

export const serverlesslyPackage: Package = {
  name: '',
  directory: '@serverlessly',
  type: 'Generic Package',
};
