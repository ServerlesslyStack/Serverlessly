import { Socket } from 'net';
import { promisify } from 'util';
import { pipeline, Transform, PassThrough } from 'stream';

import { MiddlewareEngine } from '@serverlessly/core';
import { TCPContext } from './protocol-context';
import { TCPMiddleware } from './middleware';

export type TCPMiddlewareEngine = MiddlewareEngine<TCPContext, TCPMiddleware>;

export const tcpMiddlewareEngine: TCPMiddlewareEngine = (
  middlewares: TCPMiddleware[]
) => async (socket: Socket) => {
  await promisify(pipeline)([
    socket,
    ...middlewares.map((middleware) =>
      middleware instanceof Transform
        ? middleware
        : middleware(socket) || new PassThrough()
    ),
    socket,
  ]);
};
