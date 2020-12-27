import { Protocol } from '@serverlessly/core';
import { TCPContext } from './protocol-context';
import { TCPMiddleware } from './middleware';
import { tcpMiddlewareEngine } from './middleware-engine';
import { TCPServer, tcpServerFactory, TCPServerProps } from './server-factory';

export type TCP = Protocol<
  TCPContext,
  TCPMiddleware,
  TCPServer,
  TCPServerProps
>;

export const tcp: TCP = new Protocol({
  name: 'TCP',
  middlewareEngine: tcpMiddlewareEngine,
  serverFactory: tcpServerFactory,
});
