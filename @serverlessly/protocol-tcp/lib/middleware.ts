import { Socket } from 'net';
import { Transform } from 'stream';

export type TCPMiddleware =
  | Transform
  | ((ctx: Socket) => Transform)
  | ((ctx: Socket) => void);
