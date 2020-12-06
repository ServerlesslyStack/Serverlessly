export type MiddlewareEngine<TProtocolRequestHandler, TMiddleware> = (
  middlewares: TMiddleware[]
) => TProtocolRequestHandler;
