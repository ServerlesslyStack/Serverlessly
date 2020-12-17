import { MiddlewareEngine } from './middleware-engine';
import { PlatformAdapter } from './platform-adapter';

/**
 * Type alias for a `Protocol Server Factory`
 * @typeParam TProtocolContext - Generic type of `Protocol Context`
 * @typeParam TProtocolServer - Generic type of `Protocol Server`
 */
export type ProtocolServerFactory<
  TProtocolContext,
  TProtocolServer
> = PlatformAdapter<TProtocolContext, TProtocolServer>;

/**
 * Interface for a Serverlessly `Protocol`
 * @typeParam TProtocolContext - Generic type of `Protocol Context`
 * @typeParam TMiddleware - Generic type of middlewares supported by this `Protocol`
 * @typeParam TProtocolServer - Generic type of `Protocol Server` capable of running a Serverlessly microservice on self-managed infrastructure
 *
 * @remarks
 * A new Serverlessly `Protocol` needs to implement this interface
 */
export interface Protocol<TProtocolContext, TMiddleware, TProtocolServer> {
  /**
   * `Middleware Engine` available with Serverlessly `Protocol` by default
   */
  defaultMiddlewareEngine: MiddlewareEngine<TProtocolContext, TMiddleware>;
  /**
   * `Protocol Server Factory` which can create `Protocol Server` capable of running a Serverlessly microservice on self-managed infrastructure
   */
  serverFactory: ProtocolServerFactory<TProtocolContext, TProtocolServer>;
}

/**
 * Type alias for a `Platform Adapter` meant for `Protocol Server` platform
 * @typeParam TProtocolContext - Generic type of `Protocol Context`
 *
 * @remarks
 * An implementation is already available with `protocolServerAdapter`.
 * No need to implement this unless the user has not control over custom `Protocol Server` for which so code needs to be injected.
 */
export type ProtocolServerAdapter<TProtocolContext> = PlatformAdapter<
  TProtocolContext,
  TProtocolContext
>;

/**
 * `Platform Adapter` meant for `Protocol Server` platform
 * @param protocolContext - `Protocol Context`
 * @returns `Protocol Context` without any change
 */
export const protocolServerAdapter: ProtocolServerAdapter<unknown> = (
  protocolContext
) => protocolContext;
