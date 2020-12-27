import {
  DummyProtocolContextSync,
  DummyProtocolContextAsync,
  DummyProtocolContextSyncOrAsync,
} from './protocol-contexts';

// Dummy Protocol Servers
export class DummyProtocolServerSync {
  constructor(
    private protocolContext: DummyProtocolContextSync,
    private prefix?: string
  ) {}
}
export class DummyProtocolServerAsync {
  constructor(
    private protocolContext:
      | DummyProtocolContextAsync
      | DummyProtocolContextSync
      | DummyProtocolContextSyncOrAsync,
    private prefix?: string
  ) {}
}
export class DummyProtocolServerSyncOrAsync {
  constructor(
    private protocolContext: DummyProtocolContextSyncOrAsync,
    private prefix?: string
  ) {}
}
