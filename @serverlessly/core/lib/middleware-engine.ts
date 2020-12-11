export type MiddlewareEngine<TProtocolContext, TMiddleware> = (
  middlewares: TMiddleware[]
) => TProtocolContext;
