import { Socket } from 'net';

export type TCPContext = (socket: Socket) => void;
