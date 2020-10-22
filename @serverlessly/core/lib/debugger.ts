import { EventEmitter } from 'events';
import { ServerlesslyAPI } from './api';
import { HandlerProps } from './handler';
import { Serverlessly } from './serverlessly';

export type ServerlesslyLogsEvent = 'logs';
export type ServerlesslyErrorEvent = 'error';
export type ServerlesslyMiddlewaresEvent = 'middlewares' | 'newMiddlewares';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface ServerlesslyDebugger<TProtocol, TMiddleware> {
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

export class ServerlesslyDebugger<TProtocol, TMiddleware>
  extends EventEmitter
  implements ServerlesslyAPI<TProtocol, TMiddleware> {
  constructor(private serverlessly: Serverlessly<TProtocol, TMiddleware>) {
    super();
  }

  pipe(...middleware: [TMiddleware, ...TMiddleware[]]): this {
    this.serverlessly.pipe(...middleware);
    this.emit(
      'logs',
      `Pipe: ${middleware.length} ${
        middleware.length === 1 ? 'middleware' : 'middlewares'
      } registered (new global middlewares count: ${
        this.serverlessly.middlewares.length
      })`
    );
    this.emit('newMiddlewares', middleware);
    this.emit('middlewares', this.serverlessly.middlewares);
    return this;
  }

  getHandler<THandler = TProtocol>(
    props?: HandlerProps<TProtocol, THandler>
  ): THandler | TProtocol {
    this.emit(
      'logs',
      `getHandler: ${this.serverlessly.middlewares.length} ${
        this.serverlessly.middlewares.length === 1
          ? 'middleware'
          : 'middlewares'
      } found`
    );

    this.emit(
      'logs',
      `getHandler: Platform Adapter ${
        props?.platformAdapter ? '' : 'not'
      }found${
        props?.platformAdapter
          ? ''
          : '.. using default protocol adapter provided by Middleware Engine'
      }`
    );

    let hydratedProtocol: TProtocol | undefined;

    try {
      if (this.serverlessly.middlewares.length) {
        hydratedProtocol = this.serverlessly.middlewareEngine(
          this.serverlessly.middlewares
        );
      } else {
        this.emit('error', new Error('No Middleware Found'));
      }
    } catch (error) {
      this.emit('error', new Error(`Faulty Middleware Engine\n${error}`));
    }

    let handler: THandler | undefined;

    try {
      if (props?.platformAdapter && hydratedProtocol) {
        handler = props.platformAdapter(hydratedProtocol);
      }
    } catch (error) {
      this.emit('error', new Error(`Faulty Platform Adapter\n${error}`));
    }

    if (handler) return handler;
    if (hydratedProtocol && !props?.platformAdapter) return hydratedProtocol;
    throw new Error();
  }
}
