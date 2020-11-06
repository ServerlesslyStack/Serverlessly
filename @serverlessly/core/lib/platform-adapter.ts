export type PlatformAdapter<TProtocol, THandler> = (
  coreCodeFactory: TProtocol
) => THandler;

export type ProtocolPlatformAdapter = <TProtocol>(
  coreCodeFactory: TProtocol
) => TProtocol;

export const protocolPlatformAdapter: ProtocolPlatformAdapter = <TProtocol>(
  coreCodeFactory: TProtocol
) => coreCodeFactory;
