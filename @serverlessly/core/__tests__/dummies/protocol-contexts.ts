// Dummy Protocol Context Interfaces
export type DummyProtocolContextSync = (prefix: string) => string;
export type DummyProtocolContextAsync = (prefix: string) => Promise<string>;
export type DummyProtocolContextSyncOrAsync = (
  prefix: string
) => string | Promise<string>;
