import { EventEmitter } from 'events';
import { MiddlewareEngine } from './middleware-engine';
import {
  PlatformAdapter,
  protocolPlatformAdapterFactory,
} from './platform-adapter';
import { validateMiddlewares } from './helpers/validate-middlewares';
import { getCoreCodeFactory } from './helpers/core-code-factory';
import { computeHandler } from './helpers/compute-handler';

export type ServerlesslyLogsEvent = 'LOG';
export type ServerlesslyErrorEvent = 'ERROR';
export type ServerlesslyMiddlewaresEvent = 'MIDDLEWARES' | 'NEW_MIDDLEWARES';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface Serverlessly<TProtocol, TMiddleware> {
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

export interface ServerlesslyProps<TProtocol, TMiddleware> {
  middlewareEngine: MiddlewareEngine<TProtocol, TMiddleware>;
}

export interface HandlerProps<TProtocol, THandler> {
  platformAdapter: PlatformAdapter<TProtocol, THandler>;
}

export class Serverlessly<TProtocol, TMiddleware> extends EventEmitter {
  readonly middlewareEngine: MiddlewareEngine<TProtocol, TMiddleware>;
  middlewares: TMiddleware[] = [];

  constructor(props: ServerlesslyProps<TProtocol, TMiddleware>) {
    super();
    this.middlewareEngine = props.middlewareEngine;
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

  getHandler<THandler = TProtocol>(
    props: HandlerProps<TProtocol, THandler> = {
      platformAdapter: (protocolPlatformAdapterFactory() as unknown) as PlatformAdapter<
        TProtocol,
        THandler
      >,
    }
  ): THandler {
    try {
      validateMiddlewares(this.middlewares);
      this.emit(
        'LOG',
        `getHandler: ${this.middlewares.length} ${
          this.middlewares.length === 1 ? 'middleware' : 'middlewares'
        } found`
      );
      return computeHandler(
        props.platformAdapter,
        getCoreCodeFactory(this.middlewareEngine, this.middlewares)
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
}
