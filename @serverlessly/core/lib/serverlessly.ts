import { EventEmitter } from 'events';
import { MiddlewareEngine } from './middleware-engine';
import { PlatformAdapter } from './platform-adapter';
import { validateMiddlewares } from './helpers/validate-middlewares';
import { getProtocolContext } from './helpers/protocol-context';
import { getPlatformHandler } from './helpers/platform-handler';
import {
  Protocol,
  ProtocolServerAdapter,
  protocolServerAdapter,
  ProtocolServerFactory,
} from './protocol';

type ServerlesslyLogsEvent = 'LOG';
type ServerlesslyErrorEvent = 'ERROR';
type ServerlesslyMiddlewaresEvent = 'MIDDLEWARES' | 'NEW_MIDDLEWARES';

export interface Serverlessly<
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  TProtocolContext,
  TMiddleware,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  TProtocolServer,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  TProtocolServerProps = undefined
> {
  emit(event: ServerlesslyLogsEvent, log: string): boolean;
  emit(event: ServerlesslyErrorEvent, error: Error): boolean;
  emit(
    event: ServerlesslyMiddlewaresEvent,
    middlewares: TMiddleware[]
  ): boolean;
  on(event: ServerlesslyLogsEvent, listener: (log: string) => void): this;
  on(event: ServerlesslyErrorEvent, listener: (error: Error) => void): this;
  on(
    event: ServerlesslyMiddlewaresEvent,
    listener: (middlewares: TMiddleware[]) => void
  ): this;
  off(event: ServerlesslyLogsEvent, listener: (log: string) => void): this;
  off(event: ServerlesslyErrorEvent, listener: (error: Error) => void): this;
  off(
    event: ServerlesslyMiddlewaresEvent,
    listener: (middlewares: TMiddleware[]) => void
  ): this;
  once(event: ServerlesslyLogsEvent, listener: (log: string) => void): this;
  once(event: ServerlesslyErrorEvent, listener: (error: Error) => void): this;
  once(
    event: ServerlesslyMiddlewaresEvent,
    listener: (middlewares: TMiddleware[]) => void
  ): this;
  addListener(
    event: ServerlesslyLogsEvent,
    listener: (log: string) => void
  ): this;
  addListener(
    event: ServerlesslyErrorEvent,
    listener: (error: Error) => void
  ): this;
  addListener(
    event: ServerlesslyMiddlewaresEvent,
    listener: (middlewares: TMiddleware[]) => void
  ): this;
  removeListener(
    event: ServerlesslyLogsEvent,
    listener: (log: string) => void
  ): this;
  removeListener(
    event: ServerlesslyErrorEvent,
    listener: (error: Error) => void
  ): this;
  removeListener(
    event: ServerlesslyMiddlewaresEvent,
    listener: (middlewares: TMiddleware[]) => void
  ): this;
  prependListener(
    event: ServerlesslyLogsEvent,
    listener: (log: string) => void
  ): this;
  prependListener(
    event: ServerlesslyErrorEvent,
    listener: (error: Error) => void
  ): this;
  prependListener(
    event: ServerlesslyMiddlewaresEvent,
    listener: (middlewares: TMiddleware[]) => void
  ): this;
  prependOnceListener(
    event: ServerlesslyLogsEvent,
    listener: (log: string) => void
  ): this;
  prependOnceListener(
    event: ServerlesslyErrorEvent,
    listener: (error: Error) => void
  ): this;
  prependOnceListener(
    event: ServerlesslyMiddlewaresEvent,
    listener: (middlewares: TMiddleware[]) => void
  ): this;
  removeAllListeners(event?: ServerlesslyLogsEvent): this;
  removeAllListeners(event?: ServerlesslyErrorEvent): this;
  removeAllListeners(event?: ServerlesslyMiddlewaresEvent): this;
}

/**
 * Options for initializing `Serverlessly` class
 * @typeParam TProtocolContext - Generic type of `Protocol Context`
 * @typeParam TMiddleware - Generic type of middlewares supported by `Serverlessly` instance
 * @typeParam TProtocolServer - Generic type of `Protocol Server` capable of running a `Serverlessly` microservice on self-managed infrastructure
 * @typeParam TProtocolServerProps - Generic type of options used to configure `Protocol Server`
 */
export interface ServerlesslyProps<
  TProtocolContext,
  TMiddleware,
  TProtocolServer,
  TProtocolServerProps = undefined
> {
  /**
   * Serverlessly `Protocol` which represents a network protocol like `http`
   */
  protocol: Protocol<
    TProtocolContext,
    TMiddleware,
    TProtocolServer,
    TProtocolServerProps
  >;
  /**
   * `Middleware Engine` which processes middlewares
   *
   * @defaultValue `protocol.middlewareEngine`
   */
  middlewareEngine?: MiddlewareEngine<TProtocolContext, TMiddleware>;
}

/**
 * Options for `getHandler()` configuration
 * @typeParam TProtocolContext - Generic type of `Protocol Context`
 * @typeParam TPlatformHandler - Generic type of handler returned by `getHandler()`
 */
export interface HandlerProps<TProtocolContext, TPlatformHandler> {
  /**
   * `Platform Adapter` which makes it possible to run a Serverlessly microservice on a specific platform like `AWS Lambda`
   */
  platformAdapter: PlatformAdapter<TProtocolContext, TPlatformHandler>;
}

/**
 * Serverlessly microservice instance
 * @typeParam TProtocolContext - Generic type of `Protocol Context`
 * @typeParam TMiddleware - Generic type of middlewares supported by this microservice
 * @typeParam TProtocolServer - Generic type of `Protocol Server` capable of running a Serverlessly microservice on self-managed infrastructure
 * @typeParam TProtocolServerProps - Generic type of options used to configure `Protocol Server`
 */
export class Serverlessly<
  TProtocolContext,
  TMiddleware,
  TProtocolServer,
  TProtocolServerProps = undefined
> extends EventEmitter {
  /**
   * `Middleware Engine` which processes middlewares
   */
  protected readonly middlewareEngine: MiddlewareEngine<
    TProtocolContext,
    TMiddleware
  >;

  /**
   * `Protocol Server Factory` which can create `Protocol Server` capable of running a Serverlessly microservice on self-managed infrastructure
   */
  protected readonly protocolServerFactory: ProtocolServerFactory<
    TProtocolContext,
    TProtocolServer,
    TProtocolServerProps
  >;

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
   * new Serverlessly({ protocol: http });
   * ```
   * or
   * ```ts
   * new Serverlessly({
   *    protocol: http,
   *    middlewareEngine: myCustomMiddlewareEngine
   * });
   * ```
   */
  constructor(
    props: ServerlesslyProps<
      TProtocolContext,
      TMiddleware,
      TProtocolServer,
      TProtocolServerProps
    >
  ) {
    super();
    this.middlewareEngine =
      props.middlewareEngine || props.protocol.middlewareEngine;
    this.protocolServerFactory = props.protocol.serverFactory;
    setImmediate(() => {
      this.emit(
        'LOG',
        `Serverlessly microservice initialized successfully with ${props.protocol.name} protocol.`
      );
    });
  }

  /**
   * Registers one or more middleware(s)
   * @param middleware - Middleware which represents modular consumer code
   * @returns `this` Serverlessly instance
   *
   * @example
   * ```ts
   * new Serverlessly({ protocol: http })
   *   .pipe(middleware1, middleware2)
   *   .pipe(middleware3);
   * ```
   */
  pipe(...middleware: [TMiddleware, ...TMiddleware[]]): this {
    this.middlewares.push(...middleware);
    this.emit(
      'LOG',
      `pipe: ${middleware.length} ${
        middleware.length === 1 ? 'middleware' : 'middlewares'
      } registered (new global middlewares count: ${this.middlewares.length})`
    );
    this.emit('NEW_MIDDLEWARES', middleware);
    this.emit('MIDDLEWARES', this.middlewares);
    return this;
  }

  /**
   * Generates handler for a specific platform
   * @typeParam TPlatformHandler - Generic type of the generated handler
   * @param props - Configuration object
   * @returns Handler for a specific platform
   *
   * @example
   * ```ts
   * new Serverlessly({ protocol: http })
   *   .pipe(middleware1)
   *   .getHandler({ platformAdapter: awsLambda });
   * ```
   */
  getHandler<TPlatformHandler>(
    props: HandlerProps<TProtocolContext, TPlatformHandler>
  ): TPlatformHandler {
    try {
      validateMiddlewares(this.middlewares);
      this.emit(
        'LOG',
        `getHandler: ${this.middlewares.length} ${
          this.middlewares.length === 1 ? 'middleware' : 'middlewares'
        } found`
      );
      return getPlatformHandler(
        props.platformAdapter,
        getProtocolContext(this.middlewareEngine, this.middlewares)
      );
    } catch (error) {
      this.emit('ERROR', error);
      throw new Error(
        `${
          this.listenerCount('ERROR')
            ? ''
            : 'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
        }`
      );
    }
  }

  /**
   * Generates `Protocol Server` capable of running this Serverlessly microservice on self-managed infrastructure
   * @typeParam TProtocolServerProps - Generic type of options used to configure `Protocol Server`
   * @param props - Object used to configure `Protocol Server`
   * @returns `Protocol Server` e.g. HTTP Server, gRPC Server, Web Socket Server etc.
   *
   * @example
   * ```ts
   * new Serverlessly({ protocol: http })
   *   .pipe(...)
   *   .getServer()
   *   .listen(8080, 'example.com', () => {
   *      console.info('Serverlessly HTTP Server Online');
   *    });
   * ```
   */
  getServer(props?: TProtocolServerProps): TProtocolServer {
    return this.getHandler({
      platformAdapter: this.protocolServerFactory(props),
    });
  }

  /**
   * Returns hydrated `Protocol Context` which can be used with a custom `Protocol Server`
   * @returns `Protocol Context` with all middleware codes properly processed with `Middleware Engine`
   */
  getProtocolContext(): TProtocolContext {
    return this.getHandler({
      platformAdapter: <ProtocolServerAdapter<TProtocolContext>>(
        protocolServerAdapter
      ),
    });
  }
}
