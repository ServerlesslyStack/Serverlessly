// Dummy Platform Handler Interfaces
export type DummyPlatformHandlerSync = (prefix: string) => string;
export type DummyPlatformHandlerAsync = (prefix: string) => Promise<string>;
export type DummyPlatformHandlerSyncOrAsync = (
  prefix: string
) => string | Promise<string>;
