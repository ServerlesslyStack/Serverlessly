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
  TProtocolServer
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

export interface ServerlesslyProps<
  TProtocolContext,
  TMiddleware,
  TProtocolServer
> {
  protocol: Protocol<TProtocolContext, TMiddleware, TProtocolServer>;
  middlewareEngine?: MiddlewareEngine<TProtocolContext, TMiddleware>;
}

export interface HandlerProps<TProtocolContext, TPlatformHandler> {
  platformAdapter: PlatformAdapter<TProtocolContext, TPlatformHandler>;
}

export class Serverlessly<
  TProtocolContext,
  TMiddleware,
  TProtocolServer
> extends EventEmitter {
  protected readonly middlewareEngine: MiddlewareEngine<
    TProtocolContext,
    TMiddleware
  >;
  protected readonly protocolServerFactory: ProtocolServerFactory<
    TProtocolContext,
    TProtocolServer
  >;
  protected middlewares: TMiddleware[] = [];

  constructor(
    props: ServerlesslyProps<TProtocolContext, TMiddleware, TProtocolServer>
  ) {
    super();
    this.middlewareEngine =
      props.middlewareEngine || props.protocol.defaultMiddlewareEngine;
    this.protocolServerFactory = props.protocol.serverFactory;
  }

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

  getServer(): TProtocolServer {
    return this.getHandler({
      platformAdapter: this.protocolServerFactory,
    });
  }

  getProtocolContext(): TProtocolContext {
    return this.getHandler({
      platformAdapter: <ProtocolServerAdapter<TProtocolContext>>(
        protocolServerAdapter
      ),
    });
  }
}
