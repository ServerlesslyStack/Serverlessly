import { Serverlessly } from '@serverlessly/core';
import {
  DummyMiddlewareSync,
  DummyMiddlewareAsync,
  DummyMiddlewareSyncOrAsync,
} from './middlewares';
import {
  DummyProtocolRequestHandlerSync,
  DummyProtocolRequestHandlerAsync,
  DummyProtocolRequestHandlerSyncOrAsync,
} from './protocol-request-handlers';
import {
  DummyProtocolServerSync,
  DummyProtocolServerSyncOrAsync,
  DummyProtocolServerAsync,
} from './protocol-servers';

// Sync=0 Async=1 SyncOrAsync=2

// Dummy Protocol Interfaces
// 000
export type ServerlesslySync = Serverlessly<
  DummyProtocolRequestHandlerSync,
  DummyMiddlewareSync,
  DummyProtocolServerSync
>;
export type Serverlessly001 = Serverlessly<
  DummyProtocolRequestHandlerSync,
  DummyMiddlewareSync,
  DummyProtocolServerAsync
>;
export type Serverlessly002 = Serverlessly<
  DummyProtocolRequestHandlerSync,
  DummyMiddlewareSync,
  DummyProtocolServerSyncOrAsync
>;
// An Impossibility!!!
// export type Serverlessly010 = Serverlessly<
//   DummyProtocolRequestHandlerSync,
//   DummyMiddlewareAsync,
//   DummyProtocolServerSync
// >;
// An Impossibility!!!
// export type Serverlessly011 = Serverlessly<
//   DummyProtocolRequestHandlerSync,
//   DummyMiddlewareAsync,
//   DummyProtocolServerAsync
// >;
// An Impossibility!!!
// export type Serverlessly012 = Serverlessly<
//   DummyProtocolRequestHandlerSync,
//   DummyMiddlewareAsync,
//   DummyProtocolServerSyncOrAsync
// >;
// An Impossibility!!!
// export type Serverlessly020 = Serverlessly<
//   DummyProtocolRequestHandlerSync,
//   DummyMiddlewareSyncOrAsync,
//   DummyProtocolServerSync
// >;
// An Impossibility!!!
// export type Serverlessly021 = Serverlessly<
//   DummyProtocolRequestHandlerSync,
//   DummyMiddlewareSyncOrAsync,
//   DummyProtocolServerAsync
// >;
// An Impossibility!!!
// export type Serverlessly022 = Serverlessly<
//   DummyProtocolRequestHandlerSync,
//   DummyMiddlewareSyncOrAsync,
//   DummyProtocolServerSyncOrAsync
// >;
// An Impossibility!!!
// export type Serverlessly100 = Serverlessly<
//   DummyProtocolRequestHandlerAsync,
//   DummyMiddlewareSync,
//   DummyProtocolServerSync
// >;
export type Serverlessly101 = Serverlessly<
  DummyProtocolRequestHandlerAsync,
  DummyMiddlewareSync,
  DummyProtocolServerAsync
>;
export type Serverlessly102 = Serverlessly<
  DummyProtocolRequestHandlerAsync,
  DummyMiddlewareSync,
  DummyProtocolServerSyncOrAsync
>;
// An Impossibility!!!
// export type Serverlessly110 = Serverlessly<
//   DummyProtocolRequestHandlerAsync,
//   DummyMiddlewareAsync,
//   DummyProtocolServerSync
// >;
//111
export type ServerlesslyAsync = Serverlessly<
  DummyProtocolRequestHandlerAsync,
  DummyMiddlewareAsync,
  DummyProtocolServerAsync
>;
export type Serverlessly112 = Serverlessly<
  DummyProtocolRequestHandlerAsync,
  DummyMiddlewareAsync,
  DummyProtocolServerSyncOrAsync
>;
// An Impossibility!!!
// export type Serverlessly120 = Serverlessly<
//   DummyProtocolRequestHandlerAsync,
//   DummyMiddlewareSyncOrAsync,
//   DummyProtocolServerSync
// >;
export type Serverlessly121 = Serverlessly<
  DummyProtocolRequestHandlerAsync,
  DummyMiddlewareSyncOrAsync,
  DummyProtocolServerAsync
>;
export type Serverlessly122 = Serverlessly<
  DummyProtocolRequestHandlerAsync,
  DummyMiddlewareSyncOrAsync,
  DummyProtocolServerSyncOrAsync
>;
// An Impossibility!!!
// export type Serverlessly200 = Serverlessly<
//   DummyProtocolRequestHandlerSyncOrAsync,
//   DummyMiddlewareSync,
//   DummyProtocolServerSync
// >;
export type Serverlessly201 = Serverlessly<
  DummyProtocolRequestHandlerSyncOrAsync,
  DummyMiddlewareSync,
  DummyProtocolServerAsync
>;
export type Serverlessly202 = Serverlessly<
  DummyProtocolRequestHandlerSyncOrAsync,
  DummyMiddlewareSync,
  DummyProtocolServerSyncOrAsync
>;
// An Impossibility!!!
// export type Serverlessly210 = Serverlessly<
//   DummyProtocolRequestHandlerSyncOrAsync,
//   DummyMiddlewareAsync,
//   DummyProtocolServerSync
// >;
export type Serverlessly211 = Serverlessly<
  DummyProtocolRequestHandlerSyncOrAsync,
  DummyMiddlewareAsync,
  DummyProtocolServerAsync
>;
export type Serverlessly212 = Serverlessly<
  DummyProtocolRequestHandlerSyncOrAsync,
  DummyMiddlewareAsync,
  DummyProtocolServerSyncOrAsync
>;
// An Impossibility!!!
// export type Serverlessly220 = Serverlessly<
//   DummyProtocolRequestHandlerSyncOrAsync,
//   DummyMiddlewareSyncOrAsync,
//   DummyProtocolServerSync
// >;
export type Serverlessly221 = Serverlessly<
  DummyProtocolRequestHandlerSyncOrAsync,
  DummyMiddlewareSyncOrAsync,
  DummyProtocolServerAsync
>;
// 222
export type ServerlesslySyncOrAsync = Serverlessly<
  DummyProtocolRequestHandlerSyncOrAsync,
  DummyMiddlewareSyncOrAsync,
  DummyProtocolServerSyncOrAsync
>;
