export type MiddlewareEngine<TProtocol, TMiddleware> = (
  middlewares: TMiddleware[]
) => TProtocol;

export interface ServerlesslyProps<TProtocol, TMiddleware> {
  middlewareEngine: MiddlewareEngine<TProtocol, TMiddleware>;
}

export type PlatformAdapter<TProtocol, THandler> = (
  protocolHandler: TProtocol
) => THandler;

export interface HandlerProps<TProtocol, THandler> {
  platformAdapter: PlatformAdapter<TProtocol, THandler>;
}

export class Serverlessly<TProtocol, TMiddleware> {
  readonly middlewareEngine: MiddlewareEngine<TProtocol, TMiddleware>;
  middlewares: TMiddleware[] = [];

  constructor(props: ServerlesslyProps<TProtocol, TMiddleware>) {
    this.middlewareEngine = props.middlewareEngine;
  }

  pipe(
    ...middleware: [TMiddleware, ...TMiddleware[]]
  ): Serverlessly<TProtocol, TMiddleware> {
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
      throw new Error(error);
    }
  }
}
