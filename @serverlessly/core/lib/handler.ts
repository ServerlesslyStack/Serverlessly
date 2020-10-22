export type PlatformAdapter<TProtocol, THandler> = (
  protocolHandler: TProtocol
) => THandler;

export interface HandlerProps<TProtocol, THandler> {
  platformAdapter: PlatformAdapter<TProtocol, THandler>;
}
