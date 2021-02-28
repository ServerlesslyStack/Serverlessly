import { Serverlessly } from '@serverlessly/core';
import {
  DummyMiddlewareSync,
  DummyMiddlewareAsync,
  DummyMiddlewareSyncOrAsync,
} from './middlewares';
import {
  DummyProtocol01,
  DummyProtocol02,
  DummyProtocol12,
  DummyProtocol21,
  DummyProtocolAsync,
  DummyProtocolSync,
  DummyProtocolSyncOrAsync,
} from './protocols';

// Sync=0 Async=1 SyncOrAsync=2
// 001 = 00 Protocol & Async Middleware

// Dummy Serverlessly Instance type alias

// 000
export type ServerlesslySync = Serverlessly<
  DummyProtocolSync,
  DummyMiddlewareSync
>;

// An Impossibility!!!
// export type Serverlessly001 = Serverlessly<
//   DummyProtocolSync,
//   DummyMiddlewareAsync
// >;

// An Impossibility!!!
// export type Serverlessly002 = Serverlessly<
//   DummyProtocolSync,
//   DummyMiddlewareSyncOrAsync
// >;

export type Serverlessly010 = Serverlessly<
  DummyProtocol01,
  DummyMiddlewareSync
>;

// An Impossibility!!!
// export type Serverlessly011 = Serverlessly<
//   DummyProtocol01,
//   DummyMiddlewareAsync
// >;

// An Impossibility!!!
// export type Serverlessly012 = Serverlessly<
//   DummyProtocol01,
//   DummyMiddlewareSyncOrAsync
// >;

export type Serverlessly020 = Serverlessly<
  DummyProtocol02,
  DummyMiddlewareSync
>;

// An Impossibility!!!
// export type Serverlessly021 = Serverlessly<
//   DummyProtocol02,
//   DummyMiddlewareAsync
// >;

// An Impossibility!!!
// export type Serverlessly022 = Serverlessly<
//   DummyProtocol02,
//   DummyMiddlewareSyncOrAsync
// >;

// An Impossibility!!!
// export type Serverlessly110 = Serverlessly<
//   DummyProtocolAsync,
//   DummyMiddlewareSync
// >;

// 111
export type ServerlesslyAsync = Serverlessly<
  DummyProtocolAsync,
  DummyMiddlewareAsync
>;

export type Serverlessly112 = Serverlessly<
  DummyProtocolAsync,
  DummyMiddlewareSyncOrAsync
>;

// An Impossibility!!!
// export type Serverlessly120 = Serverlessly<
//   DummyProtocol12,
//   DummyMiddlewareSync
// >;

export type Serverlessly121 = Serverlessly<
  DummyProtocol12,
  DummyMiddlewareAsync
>;

export type Serverlessly122 = Serverlessly<
  DummyProtocol12,
  DummyMiddlewareSyncOrAsync
>;

export type Serverlessly210 = Serverlessly<
  DummyProtocol21,
  DummyMiddlewareSync
>;

export type Serverlessly211 = Serverlessly<
  DummyProtocol21,
  DummyMiddlewareAsync
>;

export type Serverlessly212 = Serverlessly<
  DummyProtocol21,
  DummyMiddlewareSyncOrAsync
>;

export type Serverlessly220 = Serverlessly<
  DummyProtocolSyncOrAsync,
  DummyMiddlewareSync
>;

export type Serverlessly221 = Serverlessly<
  DummyProtocolSyncOrAsync,
  DummyMiddlewareAsync
>;

// 222
export type ServerlesslySyncOrAsync = Serverlessly<
  DummyProtocolSyncOrAsync,
  DummyMiddlewareSyncOrAsync
>;
