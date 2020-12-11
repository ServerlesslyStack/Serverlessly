import { MiddlewareEngine } from './middleware-engine';
import { PlatformAdapter } from './platform-adapter';

export type ProtocolServerFactory<
  TProtocolContext,
  TProtocolServer
> = PlatformAdapter<TProtocolContext, TProtocolServer>;

export interface Protocol<TProtocolContext, TMiddleware, TProtocolServer> {
  defaultMiddlewareEngine: MiddlewareEngine<TProtocolContext, TMiddleware>;
  serverFactory: ProtocolServerFactory<TProtocolContext, TProtocolServer>;
}

export type ProtocolServerAdapter<TProtocolContext> = PlatformAdapter<
  TProtocolContext,
  TProtocolContext
>;

export const protocolServerAdapter: ProtocolServerAdapter<unknown> = (
  protocolContext
) => protocolContext;
