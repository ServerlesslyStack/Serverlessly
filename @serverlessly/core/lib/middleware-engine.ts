import { Protocol, ProtocolContext } from './protocol';

/**
 * `Middleware Engine` which processes middlewares
 * @typeParam TProtocol - Serverlessly `Protocol` which represents a network protocol like `http`
 * @typeParam TMiddleware - Middlewares supported by `Serverlessly` instance
 *
 * @remarks
 * A new `Middleware Engine` needs to extend this abstract class
 */
export abstract class MiddlewareEngine<
  TProtocol extends Protocol<ProtocolContext>,
  TMiddleware
> {
  /**
   * Descriptive name of this `Middleware Engine`
   *
   * @remarks
   * This name is used during debug logging & can be used by external tools for other purposes like search indexing
   */
  abstract readonly name: string;

  /**
   * Core logic of this `Middleware Engine`
   * @param protocol - Serverlessly `Protocol` which represents a network protocol like `http`
   * @param middlewares - Array of middlewares
   *
   * @remarks
   * This method needs to register `Protocol Context` using `protocol.setContext()` API (refer to specific `Protocol` documentation details)
   */
  abstract engine(protocol: TProtocol, middlewares: TMiddleware[]): void;

  /**
   * @internal
   * For internal use. DO NOT OVERRIDE!!!
   */
  _run(protocol: TProtocol, middlewares: TMiddleware[]): void {
    try {
      this.engine(protocol, middlewares);
    } catch (error) {
      throw new Error(`Faulty Middleware Engine\n${error}`);
    }
  }
}
