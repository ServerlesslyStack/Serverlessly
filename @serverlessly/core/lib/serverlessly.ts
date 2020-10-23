import { EventEmitter } from 'events';
import { ServerlesslyAPI } from './api';
import { HandlerProps } from './handler';
import { MiddlewareEngine } from './middleware-engine';

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

export class Serverlessly<TProtocol, TMiddleware>
  extends EventEmitter
  implements ServerlesslyAPI<TProtocol, TMiddleware> {
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
      `Pipe: ${middleware.length} ${
        middleware.length === 1 ? 'middleware' : 'middlewares'
      } registered (new global middlewares count: ${this.middlewares.length})`
    );
    this.emit('NEW_MIDDLEWARES', middleware);
    this.emit('MIDDLEWARES', this.middlewares);
    return this;
  }

  getHandler<THandler = TProtocol>(
    props?: HandlerProps<TProtocol, THandler>
  ): THandler | TProtocol {
    let hydratedProtocol: TProtocol;

    if (this.middlewares.length) {
      this.emit(
        'LOG',
        `getHandler: ${this.middlewares.length} ${
          this.middlewares.length === 1 ? 'middleware' : 'middlewares'
        } found`
      );

      try {
        hydratedProtocol = this.middlewareEngine(this.middlewares);
      } catch (error) {
        this.emit('ERROR', new Error(`Faulty Middleware Engine\n${error}`));
        throw new Error(
          `${
            this.listenerCount('ERROR')
              ? ''
              : 'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
          }`
        );
      }
    } else {
      this.emit('ERROR', new Error('No Middleware Found'));
      throw new Error(
        `${this.listenerCount('ERROR') ? '' : 'No Middleware Found'}`
      );
    }

    try {
      if (props?.platformAdapter) {
        this.emit('LOG', 'getHandler: Platform Adapter found');
        return props.platformAdapter(hydratedProtocol);
      } else {
        this.emit(
          'LOG',
          'getHandler: Platform Adapter not found.. using default protocol adapter provided by Middleware Engine'
        );
        return hydratedProtocol;
      }
    } catch (error) {
      this.emit('ERROR', new Error(`Faulty Platform Adapter\n${error}`));
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
