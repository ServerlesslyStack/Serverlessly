export type PlatformAdapter<TProtocolContext, TPlatformHandler> = (
  protocolContext: TProtocolContext
) => TPlatformHandler;
