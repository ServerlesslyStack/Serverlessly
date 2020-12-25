import { Protocol } from '@serverlessly/core';
import {
  dummyMiddlewareEngine10,
  dummyMiddlewareEngine12,
  dummyMiddlewareEngine20,
  dummyMiddlewareEngine21,
  dummyMiddlewareEngineAsync,
  dummyMiddlewareEngineSync,
  dummyMiddlewareEngineSyncOrAsync,
  faultyMiddlewareEngine10,
  faultyMiddlewareEngine12,
  faultyMiddlewareEngine20,
  faultyMiddlewareEngine21,
  faultyMiddlewareEngineAsync,
  faultyMiddlewareEngineSync,
  faultyMiddlewareEngineSyncOrAsync,
} from './middleware-engines';
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
  dummyProtocolServerFactory01,
  dummyProtocolServerFactory02,
  dummyProtocolServerFactory12,
  dummyProtocolServerFactory21,
  dummyProtocolServerFactoryAsync,
  dummyProtocolServerFactorySync,
  dummyProtocolServerFactorySyncOrAsync,
  faultyProtocolServerFactory01,
  faultyProtocolServerFactory02,
  faultyProtocolServerFactory12,
  faultyProtocolServerFactory21,
  faultyProtocolServerFactoryAsync,
  faultyProtocolServerFactorySync,
  faultyProtocolServerFactorySyncOrAsync,
} from './protocol-server-factories';
import {
  DummyProtocolServerSync,
  DummyProtocolServerAsync,
  DummyProtocolServerSyncOrAsync,
} from './protocol-servers';

// Sync=0 Async=1 SyncOrAsync=2

// Dummy Protocol Interfaces
// 000
export type DummyProtocolSync = Protocol<
  DummyProtocolContextSync,
  DummyMiddlewareSync,
  DummyProtocolServerSync
>;
export type DummyProtocol001 = Protocol<
  DummyProtocolContextSync,
  DummyMiddlewareSync,
  DummyProtocolServerAsync
>;
export type DummyProtocol002 = Protocol<
  DummyProtocolContextSync,
  DummyMiddlewareSync,
  DummyProtocolServerSyncOrAsync
>;
// An Impossibility!!!
// export type DummyProtocol010 = Protocol<
//   DummyProtocolContextSync,
//   DummyMiddlewareAsync,
//   DummyProtocolServerSync
// >;
// An Impossibility!!!
// export type DummyProtocol011 = Protocol<
//   DummyProtocolContextSync,
//   DummyMiddlewareAsync,
//   DummyProtocolServerAsync
// >;
// An Impossibility!!!
// export type DummyProtocol012 = Protocol<
//   DummyProtocolContextSync,
//   DummyMiddlewareAsync,
//   DummyProtocolServerSyncOrAsync
// >;
// An Impossibility!!!
// export type DummyProtocol020 = Protocol<
//   DummyProtocolContextSync,
//   DummyMiddlewareSyncOrAsync,
//   DummyProtocolServerSync
// >;
// An Impossibility!!!
// export type DummyProtocol021 = Protocol<
//   DummyProtocolContextSync,
//   DummyMiddlewareSyncOrAsync,
//   DummyProtocolServerAsync
// >;
// An Impossibility!!!
// export type DummyProtocol022 = Protocol<
//   DummyProtocolContextSync,
//   DummyMiddlewareSyncOrAsync,
//   DummyProtocolServerSyncOrAsync
// >;
// An Impossibility!!!
// export type DummyProtocol100 = Protocol<
//   DummyProtocolContextAsync,
//   DummyMiddlewareSync,
//   DummyProtocolServerSync
// >;
export type DummyProtocol101 = Protocol<
  DummyProtocolContextAsync,
  DummyMiddlewareSync,
  DummyProtocolServerAsync
>;
export type DummyProtocol102 = Protocol<
  DummyProtocolContextAsync,
  DummyMiddlewareSync,
  DummyProtocolServerSyncOrAsync
>;
// An Impossibility!!!
// export type DummyProtocol110 = Protocol<
//   DummyProtocolContextAsync,
//   DummyMiddlewareAsync,
//   DummyProtocolServerSync
// >;
//111
export type DummyProtocolAsync = Protocol<
  DummyProtocolContextAsync,
  DummyMiddlewareAsync,
  DummyProtocolServerAsync
>;
export type DummyProtocol112 = Protocol<
  DummyProtocolContextAsync,
  DummyMiddlewareAsync,
  DummyProtocolServerSyncOrAsync
>;
// An Impossibility!!!
// export type DummyProtocol120 = Protocol<
//   DummyProtocolContextAsync,
//   DummyMiddlewareSyncOrAsync,
//   DummyProtocolServerSync
// >;
export type DummyProtocol121 = Protocol<
  DummyProtocolContextAsync,
  DummyMiddlewareSyncOrAsync,
  DummyProtocolServerAsync
>;
export type DummyProtocol122 = Protocol<
  DummyProtocolContextAsync,
  DummyMiddlewareSyncOrAsync,
  DummyProtocolServerSyncOrAsync
>;
// An Impossibility!!!
// export type DummyProtocol200 = Protocol<
//   DummyProtocolContextSyncOrAsync,
//   DummyMiddlewareSync,
//   DummyProtocolServerSync
// >;
export type DummyProtocol201 = Protocol<
  DummyProtocolContextSyncOrAsync,
  DummyMiddlewareSync,
  DummyProtocolServerAsync
>;
export type DummyProtocol202 = Protocol<
  DummyProtocolContextSyncOrAsync,
  DummyMiddlewareSync,
  DummyProtocolServerSyncOrAsync
>;
// An Impossibility!!!
// export type DummyProtocol210 = Protocol<
//   DummyProtocolContextSyncOrAsync,
//   DummyMiddlewareAsync,
//   DummyProtocolServerSync
// >;
export type DummyProtocol211 = Protocol<
  DummyProtocolContextSyncOrAsync,
  DummyMiddlewareAsync,
  DummyProtocolServerAsync
>;
export type DummyProtocol212 = Protocol<
  DummyProtocolContextSyncOrAsync,
  DummyMiddlewareAsync,
  DummyProtocolServerSyncOrAsync
>;
// An Impossibility!!!
// export type DummyProtocol220 = Protocol<
//   DummyProtocolContextSyncOrAsync,
//   DummyMiddlewareSyncOrAsync,
//   DummyProtocolServerSync
// >;
export type DummyProtocol221 = Protocol<
  DummyProtocolContextSyncOrAsync,
  DummyMiddlewareSyncOrAsync,
  DummyProtocolServerAsync
>;
// 222
export type DummyProtocolSyncOrAsync = Protocol<
  DummyProtocolContextSyncOrAsync,
  DummyMiddlewareSyncOrAsync,
  DummyProtocolServerSyncOrAsync
>;

// Concrete Dummy Protocols
//000
export const dummyProtocolSync: DummyProtocolSync = {
  name: 'dummyProtocolSync',
  middlewareEngine: dummyMiddlewareEngineSync,
  serverFactory: dummyProtocolServerFactorySync,
};

export const dummyProtocol001: DummyProtocol001 = {
  name: 'dummyProtocol001',
  middlewareEngine: dummyMiddlewareEngineSync,
  serverFactory: dummyProtocolServerFactory01,
};

export const dummyProtocol002: DummyProtocol002 = {
  name: 'dummyProtocol002',
  middlewareEngine: dummyMiddlewareEngineSync,
  serverFactory: dummyProtocolServerFactory02,
};

export const dummyProtocol101: DummyProtocol101 = {
  name: 'dummyProtocol101',
  middlewareEngine: dummyMiddlewareEngine10,
  serverFactory: dummyProtocolServerFactoryAsync,
};

export const dummyProtocol102: DummyProtocol102 = {
  name: 'dummyProtocol102',
  middlewareEngine: dummyMiddlewareEngine10,
  serverFactory: dummyProtocolServerFactory12,
};

//111
export const dummyProtocolAsync: DummyProtocolAsync = {
  name: 'dummyProtocolAsync',
  middlewareEngine: dummyMiddlewareEngineAsync,
  serverFactory: dummyProtocolServerFactoryAsync,
};

export const dummyProtocol112: DummyProtocol112 = {
  name: 'dummyProtocol112',
  middlewareEngine: dummyMiddlewareEngineAsync,
  serverFactory: dummyProtocolServerFactory12,
};

export const dummyProtocol121: DummyProtocol121 = {
  name: 'dummyProtocol121',
  middlewareEngine: dummyMiddlewareEngine12,
  serverFactory: dummyProtocolServerFactoryAsync,
};

export const dummyProtocol122: DummyProtocol122 = {
  name: 'dummyProtocol122',
  middlewareEngine: dummyMiddlewareEngine12,
  serverFactory: dummyProtocolServerFactory12,
};

export const dummyProtocol201: DummyProtocol201 = {
  name: 'dummyProtocol201',
  middlewareEngine: dummyMiddlewareEngine20,
  serverFactory: dummyProtocolServerFactory21,
};

export const dummyProtocol202: DummyProtocol202 = {
  name: 'dummyProtocol202',
  middlewareEngine: dummyMiddlewareEngine20,
  serverFactory: dummyProtocolServerFactorySyncOrAsync,
};

export const dummyProtocol211: DummyProtocol211 = {
  name: 'dummyProtocol211',
  middlewareEngine: dummyMiddlewareEngine21,
  serverFactory: dummyProtocolServerFactory21,
};

export const dummyProtocol212: DummyProtocol212 = {
  name: 'dummyProtocol212',
  middlewareEngine: dummyMiddlewareEngine21,
  serverFactory: dummyProtocolServerFactorySyncOrAsync,
};

export const dummyProtocol221: DummyProtocol221 = {
  name: 'dummyProtocol221',
  middlewareEngine: dummyMiddlewareEngineSyncOrAsync,
  serverFactory: dummyProtocolServerFactory21,
};

//222
export const dummyProtocolSyncOrAsync: DummyProtocolSyncOrAsync = {
  name: 'dummyProtocolSyncOrAsync',
  middlewareEngine: dummyMiddlewareEngineSyncOrAsync,
  serverFactory: dummyProtocolServerFactorySyncOrAsync,
};

// Faulty Dummy Protocols with Faulty middlewareEngine (ME suffix)
//000
export const faultyProtocolSyncME: DummyProtocolSync = {
  name: 'faultyProtocolSyncME',
  middlewareEngine: faultyMiddlewareEngineSync,
  serverFactory: dummyProtocolServerFactorySync,
};

export const faultyProtocol001ME: DummyProtocol001 = {
  name: 'faultyProtocol001ME',
  middlewareEngine: faultyMiddlewareEngineSync,
  serverFactory: dummyProtocolServerFactory01,
};

export const faultyProtocol002ME: DummyProtocol002 = {
  name: 'faultyProtocol002ME',
  middlewareEngine: faultyMiddlewareEngineSync,
  serverFactory: dummyProtocolServerFactory02,
};

export const faultyProtocol101ME: DummyProtocol101 = {
  name: 'faultyProtocol101ME',
  middlewareEngine: faultyMiddlewareEngine10,
  serverFactory: dummyProtocolServerFactoryAsync,
};

export const faultyProtocol102ME: DummyProtocol102 = {
  name: 'faultyProtocol102ME',
  middlewareEngine: faultyMiddlewareEngine10,
  serverFactory: dummyProtocolServerFactory12,
};

//111
export const faultyProtocolAsyncME: DummyProtocolAsync = {
  name: 'faultyProtocolAsyncME',
  middlewareEngine: faultyMiddlewareEngineAsync,
  serverFactory: dummyProtocolServerFactoryAsync,
};

export const faultyProtocol112ME: DummyProtocol112 = {
  name: 'faultyProtocol112ME',
  middlewareEngine: faultyMiddlewareEngineAsync,
  serverFactory: dummyProtocolServerFactory12,
};

export const faultyProtocol121ME: DummyProtocol121 = {
  name: 'faultyProtocol121ME',
  middlewareEngine: faultyMiddlewareEngine12,
  serverFactory: dummyProtocolServerFactoryAsync,
};

export const faultyProtocol122ME: DummyProtocol122 = {
  name: 'faultyProtocol122ME',
  middlewareEngine: faultyMiddlewareEngine12,
  serverFactory: dummyProtocolServerFactory12,
};

export const faultyProtocol201ME: DummyProtocol201 = {
  name: 'faultyProtocol201ME',
  middlewareEngine: faultyMiddlewareEngine20,
  serverFactory: dummyProtocolServerFactory21,
};

export const faultyProtocol202ME: DummyProtocol202 = {
  name: 'faultyProtocol202ME',
  middlewareEngine: faultyMiddlewareEngine20,
  serverFactory: dummyProtocolServerFactorySyncOrAsync,
};

export const faultyProtocol211ME: DummyProtocol211 = {
  name: 'faultyProtocol211ME',
  middlewareEngine: faultyMiddlewareEngine21,
  serverFactory: dummyProtocolServerFactory21,
};

export const faultyProtocol212ME: DummyProtocol212 = {
  name: 'faultyProtocol212ME',
  middlewareEngine: faultyMiddlewareEngine21,
  serverFactory: dummyProtocolServerFactorySyncOrAsync,
};

export const faultyProtocol221ME: DummyProtocol221 = {
  name: 'faultyProtocol221ME',
  middlewareEngine: faultyMiddlewareEngineSyncOrAsync,
  serverFactory: dummyProtocolServerFactory21,
};

//222
export const faultyProtocolSyncOrAsyncME: DummyProtocolSyncOrAsync = {
  name: 'faultyProtocolSyncOrAsyncME',
  middlewareEngine: faultyMiddlewareEngineSyncOrAsync,
  serverFactory: dummyProtocolServerFactorySyncOrAsync,
};

// Faulty Dummy Protocols with Faulty serverFactory (SF suffix)
//000
export const faultyProtocolSyncSF: DummyProtocolSync = {
  name: 'faultyProtocolSyncSF',
  middlewareEngine: dummyMiddlewareEngineSync,
  serverFactory: faultyProtocolServerFactorySync,
};

export const faultyProtocol001SF: DummyProtocol001 = {
  name: 'faultyProtocol001SF',
  middlewareEngine: dummyMiddlewareEngineSync,
  serverFactory: faultyProtocolServerFactory01,
};

export const faultyProtocol002SF: DummyProtocol002 = {
  name: 'faultyProtocol002SF',
  middlewareEngine: dummyMiddlewareEngineSync,
  serverFactory: faultyProtocolServerFactory02,
};

export const faultyProtocol101SF: DummyProtocol101 = {
  name: 'faultyProtocol101SF',
  middlewareEngine: dummyMiddlewareEngine10,
  serverFactory: faultyProtocolServerFactoryAsync,
};

export const faultyProtocol102SF: DummyProtocol102 = {
  name: 'faultyProtocol102SF',
  middlewareEngine: dummyMiddlewareEngine10,
  serverFactory: faultyProtocolServerFactory12,
};

//111
export const faultyProtocolAsyncSF: DummyProtocolAsync = {
  name: 'faultyProtocolAsyncSF',
  middlewareEngine: dummyMiddlewareEngineAsync,
  serverFactory: faultyProtocolServerFactoryAsync,
};

export const faultyProtocol112SF: DummyProtocol112 = {
  name: 'faultyProtocol112SF',
  middlewareEngine: dummyMiddlewareEngineAsync,
  serverFactory: faultyProtocolServerFactory12,
};

export const faultyProtocol121SF: DummyProtocol121 = {
  name: 'faultyProtocol121SF',
  middlewareEngine: dummyMiddlewareEngine12,
  serverFactory: faultyProtocolServerFactoryAsync,
};

export const faultyProtocol122SF: DummyProtocol122 = {
  name: 'faultyProtocol122SF',
  middlewareEngine: dummyMiddlewareEngine12,
  serverFactory: faultyProtocolServerFactory12,
};

export const faultyProtocol201SF: DummyProtocol201 = {
  name: 'faultyProtocol201SF',
  middlewareEngine: dummyMiddlewareEngine20,
  serverFactory: faultyProtocolServerFactory21,
};

export const faultyProtocol202SF: DummyProtocol202 = {
  name: 'faultyProtocol202SF',
  middlewareEngine: dummyMiddlewareEngine20,
  serverFactory: faultyProtocolServerFactorySyncOrAsync,
};

export const faultyProtocol211SF: DummyProtocol211 = {
  name: 'faultyProtocol211SF',
  middlewareEngine: dummyMiddlewareEngine21,
  serverFactory: faultyProtocolServerFactory21,
};

export const faultyProtocol212SF: DummyProtocol212 = {
  name: 'faultyProtocol212SF',
  middlewareEngine: dummyMiddlewareEngine21,
  serverFactory: faultyProtocolServerFactorySyncOrAsync,
};

export const faultyProtocol221SF: DummyProtocol221 = {
  name: 'faultyProtocol221SF',
  middlewareEngine: dummyMiddlewareEngineSyncOrAsync,
  serverFactory: faultyProtocolServerFactory21,
};

//222
export const faultyProtocolSyncOrAsyncSF: DummyProtocolSyncOrAsync = {
  name: 'faultyProtocolSyncOrAsyncSF',
  middlewareEngine: dummyMiddlewareEngineSyncOrAsync,
  serverFactory: faultyProtocolServerFactorySyncOrAsync,
};

// Faulty Dummy Protocols with both Faulty middlewareEngine & serverFactory (B suffix)
//000
export const faultyProtocolSyncB: DummyProtocolSync = {
  name: 'faultyProtocolSyncB',
  middlewareEngine: faultyMiddlewareEngineSync,
  serverFactory: faultyProtocolServerFactorySync,
};

export const faultyProtocol001B: DummyProtocol001 = {
  name: 'faultyProtocol001B',
  middlewareEngine: faultyMiddlewareEngineSync,
  serverFactory: faultyProtocolServerFactory01,
};

export const faultyProtocol002B: DummyProtocol002 = {
  name: 'faultyProtocol002B',
  middlewareEngine: faultyMiddlewareEngineSync,
  serverFactory: faultyProtocolServerFactory02,
};

export const faultyProtocol101B: DummyProtocol101 = {
  name: 'faultyProtocol101B',
  middlewareEngine: faultyMiddlewareEngine10,
  serverFactory: faultyProtocolServerFactoryAsync,
};

export const faultyProtocol102B: DummyProtocol102 = {
  name: 'faultyProtocol102B',
  middlewareEngine: faultyMiddlewareEngine10,
  serverFactory: faultyProtocolServerFactory12,
};

//111
export const faultyProtocolAsyncB: DummyProtocolAsync = {
  name: 'faultyProtocolAsyncB',
  middlewareEngine: faultyMiddlewareEngineAsync,
  serverFactory: faultyProtocolServerFactoryAsync,
};

export const faultyProtocol112B: DummyProtocol112 = {
  name: 'faultyProtocol112B',
  middlewareEngine: faultyMiddlewareEngineAsync,
  serverFactory: faultyProtocolServerFactory12,
};

export const faultyProtocol121B: DummyProtocol121 = {
  name: 'faultyProtocol121B',
  middlewareEngine: faultyMiddlewareEngine12,
  serverFactory: faultyProtocolServerFactoryAsync,
};

export const faultyProtocol122B: DummyProtocol122 = {
  name: 'faultyProtocol122B',
  middlewareEngine: faultyMiddlewareEngine12,
  serverFactory: faultyProtocolServerFactory12,
};

export const faultyProtocol201B: DummyProtocol201 = {
  name: 'faultyProtocol201B',
  middlewareEngine: faultyMiddlewareEngine20,
  serverFactory: faultyProtocolServerFactory21,
};

export const faultyProtocol202B: DummyProtocol202 = {
  name: 'faultyProtocol202B',
  middlewareEngine: faultyMiddlewareEngine20,
  serverFactory: faultyProtocolServerFactorySyncOrAsync,
};

export const faultyProtocol211B: DummyProtocol211 = {
  name: 'faultyProtocol211B',
  middlewareEngine: faultyMiddlewareEngine21,
  serverFactory: faultyProtocolServerFactory21,
};

export const faultyProtocol212B: DummyProtocol212 = {
  name: 'faultyProtocol212B',
  middlewareEngine: faultyMiddlewareEngine21,
  serverFactory: faultyProtocolServerFactorySyncOrAsync,
};

export const faultyProtocol221B: DummyProtocol221 = {
  name: 'faultyProtocol221B',
  middlewareEngine: faultyMiddlewareEngineSyncOrAsync,
  serverFactory: faultyProtocolServerFactory21,
};

//222
export const faultyProtocolSyncOrAsyncB: DummyProtocolSyncOrAsync = {
  name: 'faultyProtocolSyncOrAsyncB',
  middlewareEngine: faultyMiddlewareEngineSyncOrAsync,
  serverFactory: faultyProtocolServerFactorySyncOrAsync,
};
