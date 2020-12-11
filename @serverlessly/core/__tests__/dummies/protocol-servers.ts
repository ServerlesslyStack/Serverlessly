import {
  DummyProtocolContextSync,
  DummyProtocolContextAsync,
  DummyProtocolContextSyncOrAsync,
} from './protocol-contexts';

// Dummy Protocol Servers
export class DummyProtocolServerSync {
  constructor(private protocolContext: DummyProtocolContextSync) {}
}
export class DummyProtocolServerAsync {
  constructor(
    private protocolContext:
      | DummyProtocolContextAsync
      | DummyProtocolContextSync
      | DummyProtocolContextSyncOrAsync
  ) {}
}
export class DummyProtocolServerSyncOrAsync {
  constructor(private protocolContext: DummyProtocolContextSyncOrAsync) {}
}
