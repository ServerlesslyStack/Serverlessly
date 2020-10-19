import { EventEmitter } from 'events';

export type ServerlesslyLogsEvent = 'logs';
export type ServerlesslyErrorEvent = 'error';
export type ServerlesslyMiddlewaresEvent = 'middlewares' | 'newMiddlewares';

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

export type MiddlewareEngine<TProtocol, TMiddleware> = (
  middlewares: TMiddleware[]
) => TProtocol;

export interface ServerlesslyProps<TProtocol, TMiddleware> {
  middlewareEngine: MiddlewareEngine<TProtocol, TMiddleware>;
  debug?: boolean;
}

export type PlatformAdapter<TProtocol, THandler> = (
  protocolHandler: TProtocol
) => THandler;

export interface HandlerProps<TProtocol, THandler> {
  platformAdapter: PlatformAdapter<TProtocol, THandler>;
}
export class Serverlessly<TProtocol, TMiddleware> extends EventEmitter {
  readonly middlewareEngine: MiddlewareEngine<TProtocol, TMiddleware>;
  readonly debug?: boolean;
  middlewares: TMiddleware[] = [];

  constructor(props: ServerlesslyProps<TProtocol, TMiddleware>) {
    super();
    this.middlewareEngine = props.middlewareEngine;
    this.debug = props.debug;
  }

  pipe(
    ...middleware: [TMiddleware, ...TMiddleware[]]
  ): Serverlessly<TProtocol, TMiddleware> {
    this.middlewares.push(...middleware);

    if (this.debug) {
      this.emit(
        'logs',
        `Pipe: ${middleware.length} ${
          middleware.length === 1 ? 'middleware' : 'middlewares'
        } registered (new global middlewares count: ${this.middlewares.length})`
      );
      this.emit('newMiddlewares', middleware);
      this.emit('middlewares', this.middlewares);
    }

    return this;
  }

  getHandler<THandler = TProtocol>(
    props?: HandlerProps<TProtocol, THandler>
  ): THandler | TProtocol {
    if (this.debug) {
      this.emit('logs', 'getHandler: checking middlewares..');
    }

    if (!this.middlewares.length) {
      if (this.debug) {
        this.emit('error', new Error('getHandler: No Middleware Found'));
        throw new Error();
      } else {
        throw new Error('No Middleware Found');
      }
    }

    if (this.debug) {
      this.emit(
        'logs',
        `getHandler: ${this.middlewares.length} ${
          this.middlewares.length === 1 ? 'middleware' : 'middlewares'
        } found`
      );
    }

    try {
      if (props?.platformAdapter) {
        if (this.debug) {
          this.emit('logs', 'getHandler: platformAdapter found');
        }
        return props.platformAdapter(this.middlewareEngine(this.middlewares));
      } else {
        if (this.debug) {
          this.emit('logs', 'getHandler: platformAdapter not found.');
        }
        return this.middlewareEngine(this.middlewares);
      }
    } catch (error) {
      if (this.debug) {
        this.emit('error', new Error(`getHandler: ${error}`));
        throw new Error();
      } else {
        throw new Error(
          'Something went wrong. Turn on DEBUG mode & listen to detailed error & stack trace.'
        );
      }
    }
  }
}
