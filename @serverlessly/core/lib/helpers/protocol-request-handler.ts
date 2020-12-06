import { MiddlewareEngine } from '../middleware-engine';

export function getProtocolRequestHandler<TProtocolRequestHandler, TMiddleware>(
  middlewareEngine: MiddlewareEngine<TProtocolRequestHandler, TMiddleware>,
  middlewares: TMiddleware[]
): TProtocolRequestHandler {
  try {
    return middlewareEngine(middlewares);
  } catch (error) {
    throw new Error(`Faulty Middleware Engine\n${error}`);
  }
}
