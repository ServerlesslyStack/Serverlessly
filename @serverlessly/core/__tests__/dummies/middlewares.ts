// Dummy Middleware Interfaces
export type DummyMiddlewareSync = () => string;
export type DummyMiddlewareAsync = () => Promise<string>;
export type DummyMiddlewareSyncOrAsync = () => string | Promise<string>;

// Dummy Middlewares
export const dummyMiddlewaresSync: DummyMiddlewareSync[] = [
  (): string => 'Hulk',
  (): string => 'Smash',
  (): string => 'I am Groot',
  (): string => 'Avengers, Assemble!',
];
export const dummyMiddlewaresAsync: DummyMiddlewareAsync[] = [
  async (): Promise<string> => 'Hulk',
  (): Promise<string> => Promise.resolve('Smash'),
  async (): Promise<string> => 'I am Groot',
  (): Promise<string> => Promise.resolve('Avengers, Assemble!'),
];
export const dummyMiddlewaresSyncOrAsync: DummyMiddlewareSyncOrAsync[] = [
  (): string => 'Hulk',
  async (): Promise<string> => 'Smash',
  (): string => 'I am Groot',
  (): string => 'Avengers, Assemble!',
];
