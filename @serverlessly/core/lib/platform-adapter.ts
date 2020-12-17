/**
 * Type alias for a `Platform Adapter`
 * @typeParam TProtocolContext - Generic type of `Protocol Context`
 * @typeParam THandler - Generic type of the handler returned by `Platform Adapter`
 *
 * @remarks
 * A new `Platform Adapter` needs to adhere to this type alias
 */
export type PlatformAdapter<TProtocolContext, TPlatformHandler> = (
  protocolContext: TProtocolContext
) => TPlatformHandler;
