/**
 * Type alias for a `Middleware Engine`
 * @typeParam TProtocolContext - Generic type of `Protocol Context`
 * @typeParam TMiddleware - Generic type of middlewares supported by `Middleware Engine`
 *
 * @remarks
 * A new `Middleware Engine` needs to adhere to this type alias
 */
export type MiddlewareEngine<TProtocolContext extends Function, TMiddleware> = (
  middlewares: TMiddleware[]
) => TProtocolContext;
