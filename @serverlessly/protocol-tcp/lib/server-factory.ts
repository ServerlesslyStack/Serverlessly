import { createServer, Server } from 'net';

import { ProtocolServerFactory } from '@serverlessly/core';
import { TCPContext } from './protocol-context';

export type TCPServer = Server;

export type TCPServerProps =
  | {
      allowHalfOpen?: boolean | undefined;
      pauseOnConnect?: boolean | undefined;
    }
  | undefined;

export type TCPServerFactory = ProtocolServerFactory<
  TCPContext,
  TCPServer,
  TCPServerProps
>;

export const tcpServerFactory: TCPServerFactory = (
  tcpServerProps: TCPServerProps
) => (protocolContext: TCPContext) =>
  createServer(tcpServerProps, protocolContext);
