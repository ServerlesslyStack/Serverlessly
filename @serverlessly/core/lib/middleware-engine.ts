export type MiddlewareEngine<TProtocol, TMiddleware> = (
  middlewares: TMiddleware[]
) => TProtocol;
