export type LibType =
  | 'Protocol'
  | 'Middleware Engine'
  | 'Platform Adapter'
  | 'Generic Package';

export type AllowedDir = '@serverlessly' | 'packages';

interface Lib {
  name: string;
  directory: AllowedDir;
  type: LibType;
}

export const lib: Lib = {
  name: '',
  directory: '@serverlessly',
  type: 'Generic Package',
};
