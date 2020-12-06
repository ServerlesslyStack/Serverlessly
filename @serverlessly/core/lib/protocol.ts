import { MiddlewareEngine } from './middleware-engine';
import { PlatformAdapter } from './platform-adapter';

export type ProtocolServerFactory<
  TProtocolRequestHandler,
  TProtocolServer
> = PlatformAdapter<TProtocolRequestHandler, TProtocolServer>;

export interface Protocol<
  TProtocolRequestHandler,
  TMiddleware,
  TProtocolServer
> {
  defaultMiddlewareEngine: MiddlewareEngine<
    TProtocolRequestHandler,
    TMiddleware
  >;
  serverFactory: ProtocolServerFactory<
    TProtocolRequestHandler,
    TProtocolServer
  >;
}

export type ProtocolServerAdapter<TProtocolRequestHandler> = PlatformAdapter<
  TProtocolRequestHandler,
  TProtocolRequestHandler
>;

export const protocolServerAdapter: ProtocolServerAdapter<unknown> = (
  protocolRequestHandler
) => protocolRequestHandler;
