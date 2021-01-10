import { MiddlewareEngine } from './middleware-engine';
import { PlatformAdapter } from './platform-adapter';

/**
 * Type alias for a `Protocol Server Factory`
 * @typeParam TProtocolContext - Generic type of `Protocol Context`
 * @typeParam TProtocolServer - Generic type of `Protocol Server`
 * @typeParam TProtocolServerProps - Optional generic type of options used to configure `Protocol Server`
 */
export type ProtocolServerFactory<
  TProtocolContext extends Function,
  TProtocolServer,
  TProtocolServerProps = undefined
> = (
  serverOptions?: TProtocolServerProps
) => PlatformAdapter<TProtocolContext, TProtocolServer>;

/**
 * Represents a Serverlessly `Protocol`
 * @typeParam TProtocolContext - Generic type of `Protocol Context`
 * @typeParam TMiddleware - Generic type of middlewares supported by this `Protocol`
 * @typeParam TProtocolServer - Generic type of `Protocol Server` capable of running a Serverlessly microservice on self-managed infrastructure
 * @typeParam TProtocolServerProps - Optional generic type of options used to configure `Protocol Server`
 */
export class Protocol<
  TProtocolContext extends Function,
  TMiddleware,
  TProtocolServer,
  TProtocolServerProps = undefined
> {
  /**
   * name of the `Protocol`
   */
  name: string;
  /**
   * `Middleware Engine` available with Serverlessly `Protocol`
   */
  middlewareEngine: MiddlewareEngine<TProtocolContext, TMiddleware>;
  /**
   * `Protocol Server Factory` which can create `Protocol Server` capable of running a Serverlessly microservice on self-managed infrastructure
   */
  serverFactory: ProtocolServerFactory<
    TProtocolContext,
    TProtocolServer,
    TProtocolServerProps
  >;

  /**
   * Creates a new Serverlessly `Protocol`
   * @param props - Options used to initialize `Protocol` class
   *
   * @example
   * ```ts
   * new Protocol({
   *   name: 'MyCustomProtocol',
   *   middlewareEngine: myMiddlewareEngine,
   *   serverFactory: myServerFactory,
   * });
   * ```
   */
  constructor(
    props: Protocol<
      TProtocolContext,
      TMiddleware,
      TProtocolServer,
      TProtocolServerProps
    >
  ) {
    this.name = props.name;
    this.middlewareEngine = props.middlewareEngine;
    this.serverFactory = props.serverFactory;
  }
}

/**
 * Type alias for a `Platform Adapter` meant for `Protocol Server` platform
 * @typeParam TProtocolContext - Generic type of `Protocol Context`
 *
 * @remarks
 * An implementation is already available with `protocolServerAdapter`.
 * No need to implement this unless the user has not control over custom `Protocol Server` for which so code needs to be injected.
 */
export type ProtocolServerAdapter<
  TProtocolContext extends Function
> = PlatformAdapter<TProtocolContext, TProtocolContext>;

/**
 * `Platform Adapter` meant for `Protocol Server` platform
 * @param protocolContext - `Protocol Context`
 * @returns `Protocol Context` without any change
 */
export const protocolServerAdapter: ProtocolServerAdapter<Function> = (
  protocolContext
) => protocolContext;
