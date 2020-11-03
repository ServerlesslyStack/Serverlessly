export type PlatformAdapter<TProtocol, THandler> = (
  coreCodeFactory: TProtocol
) => THandler;

export function protocolPlatformAdapterFactory<TProtocol>(): PlatformAdapter<
  TProtocol,
  TProtocol
> {
  return (coreCodeFactory: TProtocol) => coreCodeFactory;
}
