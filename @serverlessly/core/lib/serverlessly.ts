import { ServerlesslyAPI } from './api';
import { ServerlesslyDebugger } from './debugger';
import { HandlerProps } from './handler';
import { MiddlewareEngine } from './middleware-engine';

export interface ServerlesslyProps<TProtocol, TMiddleware> {
  middlewareEngine: MiddlewareEngine<TProtocol, TMiddleware>;
}

export class Serverlessly<TProtocol, TMiddleware>
  implements ServerlesslyAPI<TProtocol, TMiddleware> {
  readonly middlewareEngine: MiddlewareEngine<TProtocol, TMiddleware>;
  middlewares: TMiddleware[] = [];

  constructor(props: ServerlesslyProps<TProtocol, TMiddleware>) {
    this.middlewareEngine = props.middlewareEngine;
  }

  debug(): ServerlesslyDebugger<TProtocol, TMiddleware> {
    return new ServerlesslyDebugger(this);
  }

  pipe(...middleware: [TMiddleware, ...TMiddleware[]]): this {
    this.middlewares.push(...middleware);
    return this;
  }

  getHandler<THandler = TProtocol>(
    props?: HandlerProps<TProtocol, THandler>
  ): THandler | TProtocol {
    if (!this.middlewares.length) throw new Error('No Middleware Found');

    try {
      return props
        ? props.platformAdapter(this.middlewareEngine(this.middlewares))
        : this.middlewareEngine(this.middlewares);
    } catch (error) {
      throw new Error(
        `Something went wrong. Attach debugger & listen to detailed error & stack trace.`
      );
    }
  }
}
