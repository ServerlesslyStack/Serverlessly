import { MiddlewareEngine } from '../middleware-engine';

export function getProtocolContext<
  TProtocolContext extends Function,
  TMiddleware
>(
  middlewareEngine: MiddlewareEngine<TProtocolContext, TMiddleware>,
  middlewares: TMiddleware[]
): TProtocolContext {
  try {
    return middlewareEngine(middlewares);
  } catch (error) {
    throw new Error(`Faulty Middleware Engine\n${error}`);
  }
}
