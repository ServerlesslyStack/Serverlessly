import { Serverlessly } from '@serverlessly/core';
import {
  DummyMiddlewareSync,
  DummyMiddlewareAsync,
  DummyMiddlewareSyncOrAsync,
} from './middlewares';
import {
  DummyProtocolContextSync,
  DummyProtocolContextAsync,
  DummyProtocolContextSyncOrAsync,
} from './protocol-contexts';
import {
  DummyProtocolServerSync,
  DummyProtocolServerSyncOrAsync,
  DummyProtocolServerAsync,
} from './protocol-servers';

// Sync=0 Async=1 SyncOrAsync=2

// Dummy Protocol Interfaces
// 000
export type ServerlesslySync = Serverlessly<
  DummyProtocolContextSync,
  DummyMiddlewareSync,
  DummyProtocolServerSync
>;
export type Serverlessly001 = Serverlessly<
  DummyProtocolContextSync,
  DummyMiddlewareSync,
  DummyProtocolServerAsync
>;
export type Serverlessly002 = Serverlessly<
  DummyProtocolContextSync,
  DummyMiddlewareSync,
  DummyProtocolServerSyncOrAsync
>;
// An Impossibility!!!
// export type Serverlessly010 = Serverlessly<
//   DummyProtocolContextSync,
//   DummyMiddlewareAsync,
//   DummyProtocolServerSync
// >;
// An Impossibility!!!
// export type Serverlessly011 = Serverlessly<
//   DummyProtocolContextSync,
//   DummyMiddlewareAsync,
//   DummyProtocolServerAsync
// >;
// An Impossibility!!!
// export type Serverlessly012 = Serverlessly<
//   DummyProtocolContextSync,
//   DummyMiddlewareAsync,
//   DummyProtocolServerSyncOrAsync
// >;
// An Impossibility!!!
// export type Serverlessly020 = Serverlessly<
//   DummyProtocolContextSync,
//   DummyMiddlewareSyncOrAsync,
//   DummyProtocolServerSync
// >;
// An Impossibility!!!
// export type Serverlessly021 = Serverlessly<
//   DummyProtocolContextSync,
//   DummyMiddlewareSyncOrAsync,
//   DummyProtocolServerAsync
// >;
// An Impossibility!!!
// export type Serverlessly022 = Serverlessly<
//   DummyProtocolContextSync,
//   DummyMiddlewareSyncOrAsync,
//   DummyProtocolServerSyncOrAsync
// >;
// An Impossibility!!!
// export type Serverlessly100 = Serverlessly<
//   DummyProtocolContextAsync,
//   DummyMiddlewareSync,
//   DummyProtocolServerSync
// >;
export type Serverlessly101 = Serverlessly<
  DummyProtocolContextAsync,
  DummyMiddlewareSync,
  DummyProtocolServerAsync
>;
export type Serverlessly102 = Serverlessly<
  DummyProtocolContextAsync,
  DummyMiddlewareSync,
  DummyProtocolServerSyncOrAsync
>;
// An Impossibility!!!
// export type Serverlessly110 = Serverlessly<
//   DummyProtocolContextAsync,
//   DummyMiddlewareAsync,
//   DummyProtocolServerSync
// >;
//111
export type ServerlesslyAsync = Serverlessly<
  DummyProtocolContextAsync,
  DummyMiddlewareAsync,
  DummyProtocolServerAsync
>;
export type Serverlessly112 = Serverlessly<
  DummyProtocolContextAsync,
  DummyMiddlewareAsync,
  DummyProtocolServerSyncOrAsync
>;
// An Impossibility!!!
// export type Serverlessly120 = Serverlessly<
//   DummyProtocolContextAsync,
//   DummyMiddlewareSyncOrAsync,
//   DummyProtocolServerSync
// >;
export type Serverlessly121 = Serverlessly<
  DummyProtocolContextAsync,
  DummyMiddlewareSyncOrAsync,
  DummyProtocolServerAsync
>;
export type Serverlessly122 = Serverlessly<
  DummyProtocolContextAsync,
  DummyMiddlewareSyncOrAsync,
  DummyProtocolServerSyncOrAsync
>;
// An Impossibility!!!
// export type Serverlessly200 = Serverlessly<
//   DummyProtocolContextSyncOrAsync,
//   DummyMiddlewareSync,
//   DummyProtocolServerSync
// >;
export type Serverlessly201 = Serverlessly<
  DummyProtocolContextSyncOrAsync,
  DummyMiddlewareSync,
  DummyProtocolServerAsync
>;
export type Serverlessly202 = Serverlessly<
  DummyProtocolContextSyncOrAsync,
  DummyMiddlewareSync,
  DummyProtocolServerSyncOrAsync
>;
// An Impossibility!!!
// export type Serverlessly210 = Serverlessly<
//   DummyProtocolContextSyncOrAsync,
//   DummyMiddlewareAsync,
//   DummyProtocolServerSync
// >;
export type Serverlessly211 = Serverlessly<
  DummyProtocolContextSyncOrAsync,
  DummyMiddlewareAsync,
  DummyProtocolServerAsync
>;
export type Serverlessly212 = Serverlessly<
  DummyProtocolContextSyncOrAsync,
  DummyMiddlewareAsync,
  DummyProtocolServerSyncOrAsync
>;
// An Impossibility!!!
// export type Serverlessly220 = Serverlessly<
//   DummyProtocolContextSyncOrAsync,
//   DummyMiddlewareSyncOrAsync,
//   DummyProtocolServerSync
// >;
export type Serverlessly221 = Serverlessly<
  DummyProtocolContextSyncOrAsync,
  DummyMiddlewareSyncOrAsync,
  DummyProtocolServerAsync
>;
// 222
export type ServerlesslySyncOrAsync = Serverlessly<
  DummyProtocolContextSyncOrAsync,
  DummyMiddlewareSyncOrAsync,
  DummyProtocolServerSyncOrAsync
>;
