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
  DummyProtocolServerSync,
  string
>;
export type Serverlessly001 = Serverlessly<
  DummyProtocolContextSync,
  DummyMiddlewareSync,
  DummyProtocolServerAsync,
  string
>;
export type Serverlessly002 = Serverlessly<
  DummyProtocolContextSync,
  DummyMiddlewareSync,
  DummyProtocolServerSyncOrAsync,
  string
>;
// An Impossibility!!!
// export type Serverlessly010 = Serverlessly<
//   DummyProtocolContextSync,
//   DummyMiddlewareAsync,
//   DummyProtocolServerSync,
//   string
// >;
// An Impossibility!!!
// export type Serverlessly011 = Serverlessly<
//   DummyProtocolContextSync,
//   DummyMiddlewareAsync,
//   DummyProtocolServerAsync,
//   string
// >;
// An Impossibility!!!
// export type Serverlessly012 = Serverlessly<
//   DummyProtocolContextSync,
//   DummyMiddlewareAsync,
//   DummyProtocolServerSyncOrAsync,
//   string
// >;
// An Impossibility!!!
// export type Serverlessly020 = Serverlessly<
//   DummyProtocolContextSync,
//   DummyMiddlewareSyncOrAsync,
//   DummyProtocolServerSync,
//   string
// >;
// An Impossibility!!!
// export type Serverlessly021 = Serverlessly<
//   DummyProtocolContextSync,
//   DummyMiddlewareSyncOrAsync,
//   DummyProtocolServerAsync,
//   string
// >;
// An Impossibility!!!
// export type Serverlessly022 = Serverlessly<
//   DummyProtocolContextSync,
//   DummyMiddlewareSyncOrAsync,
//   DummyProtocolServerSyncOrAsync,
//   string
// >;
// An Impossibility!!!
// export type Serverlessly100 = Serverlessly<
//   DummyProtocolContextAsync,
//   DummyMiddlewareSync,
//   DummyProtocolServerSync,
//   string
// >;
export type Serverlessly101 = Serverlessly<
  DummyProtocolContextAsync,
  DummyMiddlewareSync,
  DummyProtocolServerAsync,
  string
>;
export type Serverlessly102 = Serverlessly<
  DummyProtocolContextAsync,
  DummyMiddlewareSync,
  DummyProtocolServerSyncOrAsync,
  string
>;
// An Impossibility!!!
// export type Serverlessly110 = Serverlessly<
//   DummyProtocolContextAsync,
//   DummyMiddlewareAsync,
//   DummyProtocolServerSync,
//   string
// >;
//111
export type ServerlesslyAsync = Serverlessly<
  DummyProtocolContextAsync,
  DummyMiddlewareAsync,
  DummyProtocolServerAsync,
  string
>;
export type Serverlessly112 = Serverlessly<
  DummyProtocolContextAsync,
  DummyMiddlewareAsync,
  DummyProtocolServerSyncOrAsync,
  string
>;
// An Impossibility!!!
// export type Serverlessly120 = Serverlessly<
//   DummyProtocolContextAsync,
//   DummyMiddlewareSyncOrAsync,
//   DummyProtocolServerSync,
//   string
// >;
export type Serverlessly121 = Serverlessly<
  DummyProtocolContextAsync,
  DummyMiddlewareSyncOrAsync,
  DummyProtocolServerAsync,
  string
>;
export type Serverlessly122 = Serverlessly<
  DummyProtocolContextAsync,
  DummyMiddlewareSyncOrAsync,
  DummyProtocolServerSyncOrAsync,
  string
>;
// An Impossibility!!!
// export type Serverlessly200 = Serverlessly<
//   DummyProtocolContextSyncOrAsync,
//   DummyMiddlewareSync,
//   DummyProtocolServerSync,
//   string
// >;
export type Serverlessly201 = Serverlessly<
  DummyProtocolContextSyncOrAsync,
  DummyMiddlewareSync,
  DummyProtocolServerAsync,
  string
>;
export type Serverlessly202 = Serverlessly<
  DummyProtocolContextSyncOrAsync,
  DummyMiddlewareSync,
  DummyProtocolServerSyncOrAsync,
  string
>;
// An Impossibility!!!
// export type Serverlessly210 = Serverlessly<
//   DummyProtocolContextSyncOrAsync,
//   DummyMiddlewareAsync,
//   DummyProtocolServerSync,
//   string
// >;
export type Serverlessly211 = Serverlessly<
  DummyProtocolContextSyncOrAsync,
  DummyMiddlewareAsync,
  DummyProtocolServerAsync,
  string
>;
export type Serverlessly212 = Serverlessly<
  DummyProtocolContextSyncOrAsync,
  DummyMiddlewareAsync,
  DummyProtocolServerSyncOrAsync,
  string
>;
// An Impossibility!!!
// export type Serverlessly220 = Serverlessly<
//   DummyProtocolContextSyncOrAsync,
//   DummyMiddlewareSyncOrAsync,
//   DummyProtocolServerSync,
//   string
// >;
export type Serverlessly221 = Serverlessly<
  DummyProtocolContextSyncOrAsync,
  DummyMiddlewareSyncOrAsync,
  DummyProtocolServerAsync,
  string
>;
// 222
export type ServerlesslySyncOrAsync = Serverlessly<
  DummyProtocolContextSyncOrAsync,
  DummyMiddlewareSyncOrAsync,
  DummyProtocolServerSyncOrAsync,
  string
>;
