import {
  DummyProtocolContextSync,
  DummyProtocolContextAsync,
  DummyProtocolContextSyncOrAsync,
} from './protocol-contexts';

// Dummy Protocol Servers
export class DummyProtocolServerSync {
  constructor(
    private prefix: string,
    private protocolContext: DummyProtocolContextSync
  ) {}
}
export class DummyProtocolServerAsync {
  constructor(
    private prefix: string,
    private protocolContext:
      | DummyProtocolContextAsync
      | DummyProtocolContextSync
      | DummyProtocolContextSyncOrAsync
  ) {}
}
export class DummyProtocolServerSyncOrAsync {
  constructor(
    private prefix: string,
    private protocolContext: DummyProtocolContextSyncOrAsync
  ) {}
}
