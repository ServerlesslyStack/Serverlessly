// Dummy Protocol Request Handler Interfaces
export type DummyProtocolRequestHandlerSync = (prefix: string) => string;
export type DummyProtocolRequestHandlerAsync = (
  prefix: string
) => Promise<string>;
export type DummyProtocolRequestHandlerSyncOrAsync = (
  prefix: string
) => string | Promise<string>;
