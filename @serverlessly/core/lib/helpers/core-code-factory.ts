import { MiddlewareEngine } from '../middleware-engine';

export function getCoreCodeFactory<TProtocol, TMiddleware>(
  middlewareEngine: MiddlewareEngine<TProtocol, TMiddleware>,
  middlewares: TMiddleware[]
): TProtocol {
  try {
    return middlewareEngine(middlewares);
  } catch (error) {
    throw new Error(`Faulty Middleware Engine\n${error}`);
  }
}
