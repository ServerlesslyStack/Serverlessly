export type PlatformAdapter<TProtocolRequestHandler, TPlatformHandler> = (
  protocolRequestHandler: TProtocolRequestHandler
) => TPlatformHandler;
