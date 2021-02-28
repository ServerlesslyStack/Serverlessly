import { MiddlewareEngine } from './middleware-engine';
import { PlatformAdapter } from './platform-adapter';
import { validateMiddlewares } from './helpers/validate-middlewares';
import { Protocol, ProtocolContext } from './protocol';

/**
 * Options for initializing `Serverlessly` class
 * @typeParam TProtocol - Serverlessly `Protocol` which represents a network protocol like `http`
 * @typeParam TMiddleware - Middlewares supported by `Serverlessly` instance
 */
export interface ServerlesslyProps<
  TProtocol extends Protocol<ProtocolContext>,
  TMiddleware
> {
  /**
   * Serverlessly `Protocol` which represents a network protocol like `http`
   */
  protocol: TProtocol;
  /**
   * `Middleware Engine` which processes middlewares
   */
  middlewareEngine: MiddlewareEngine<TProtocol, TMiddleware>;
}

/**
 * Options for `getHandler()` configuration
 * @typeParam TProtocol - Serverlessly `Protocol` which represents a network protocol like `http`
 * @typeParam TPlatformHandler - Handler (or, Server) for a specific platform like `AWS Lambda`
 */
export interface HandlerProps<
  TProtocol extends Protocol<ProtocolContext>,
  TPlatformHandler
> {
  /**
   * `Platform Adapter` which makes it possible to run a Serverlessly microservice on a specific platform like `AWS Lambda`
   */
  platformAdapter: PlatformAdapter<TProtocol, TPlatformHandler>;
}

/**
 * Serverlessly microservice instance
 * @typeParam TProtocol - Serverlessly `Protocol` which represents a network protocol like `http`
 * @typeParam TMiddleware - Middlewares supported by this microservice
 */
export class Serverlessly<
  TProtocol extends Protocol<ProtocolContext>,
  TMiddleware
> {
  /**
   * Serverlessly `Protocol` which represents a network protocol like `http`
   */
  protected readonly protocol: TProtocol;
  /**
   * `Middleware Engine` which processes middlewares
   */
  protected readonly middlewareEngine: MiddlewareEngine<TProtocol, TMiddleware>;

  /**
   * Array of middlewares
   */
  protected middlewares: TMiddleware[] = [];

  /**
   * Creates a new vendor-neutral Serverlessly microservice
   * @param props - Options used to initialize `Serverlessly` class
   *
   * @example
   * ```ts
   * new Serverlessly({
   *    protocol: http,
   *    middlewareEngine: expressEngine
   * });
   * ```
   */
  constructor(props: ServerlesslyProps<TProtocol, TMiddleware>) {
    this.protocol = props.protocol;
    this.middlewareEngine = props.middlewareEngine;
  }

  /**
   * Registers one or more middleware(s)
   * @param middlewares - Middlewares which represent modular consumer code
   * @returns `this` Serverlessly instance
   *
   * @example
   * ```ts
   * new Serverlessly(...)
   *   .pipe(middleware1, middleware2)
   *   .pipe(middleware3);
   * ```
   */
  pipe(
    ...middlewares: [middleware: TMiddleware, ...middlewares: TMiddleware[]]
  ): this {
    this.middlewares.push(...middlewares);
    return this;
  }

  /**
   * Generates handler for a specific platform
   * @typeParam TPlatformHandler - Handler (or, Server) for a specific platform like `AWS Lambda`
   * @param props - Configuration object
   * @returns Handler (or, Server) for a specific platform like `AWS Lambda`
   *
   * @example
   * ```ts
   * new Serverlessly(...)
   *   .pipe(...)
   *   .getHandler({ platformAdapter: awsLambda });
   * ```
   */
  getHandler<TPlatformHandler>(
    props: HandlerProps<TProtocol, TPlatformHandler>
  ): TPlatformHandler {
    try {
      validateMiddlewares(this.middlewares);
      this.middlewareEngine._run(this.protocol, this.middlewares);
      return props.platformAdapter._run(this.protocol);
    } catch (error) {
      throw new Error(`Something went wrong.\n${error}`);
    }
  }
}
