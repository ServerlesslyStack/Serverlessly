import {
  DummyProtocolRequestHandlerSync,
  DummyProtocolRequestHandlerAsync,
  DummyProtocolRequestHandlerSyncOrAsync,
} from './protocol-request-handlers';

// Dummy Protocol Servers
export class DummyProtocolServerSync {
  constructor(
    private protocolRequestHandler: DummyProtocolRequestHandlerSync
  ) {}
}
export class DummyProtocolServerAsync {
  constructor(
    private protocolRequestHandler:
      | DummyProtocolRequestHandlerAsync
      | DummyProtocolRequestHandlerSync
      | DummyProtocolRequestHandlerSyncOrAsync
  ) {}
}
export class DummyProtocolServerSyncOrAsync {
  constructor(
    private protocolRequestHandler: DummyProtocolRequestHandlerSyncOrAsync
  ) {}
}
