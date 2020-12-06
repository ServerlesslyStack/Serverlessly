import { PlatformAdapter } from '@serverlessly/core';
import {
  DummyPlatformHandlerSync,
  DummyPlatformHandlerAsync,
  DummyPlatformHandlerSyncOrAsync,
} from './platform-handlers';
import {
  DummyProtocolRequestHandlerSync,
  DummyProtocolRequestHandlerAsync,
  DummyProtocolRequestHandlerSyncOrAsync,
} from './protocol-request-handlers';

// Sync=0 Async=1 SyncOrAsync=2

// Dummy Platform Adapter interfaces
// 00
export type DummyPlatformAdapterSync = PlatformAdapter<
  DummyProtocolRequestHandlerSync,
  DummyPlatformHandlerSync
>;
export type DummyPlatformAdapter01 = PlatformAdapter<
  DummyProtocolRequestHandlerSync,
  DummyPlatformHandlerAsync
>;
export type DummyPlatformAdapter02 = PlatformAdapter<
  DummyProtocolRequestHandlerSync,
  DummyPlatformHandlerSyncOrAsync
>;
// An Impossibility!!!
// export type DummyPlatformAdapter10 = PlatformAdapter<
//   DummyProtocolRequestHandlerAsync,
//   DummyPlatformHandlerSync
// >;
// 11
export type DummyPlatformAdapterAsync = PlatformAdapter<
  DummyProtocolRequestHandlerAsync,
  DummyPlatformHandlerAsync
>;
export type DummyPlatformAdapter12 = PlatformAdapter<
  DummyProtocolRequestHandlerAsync,
  DummyPlatformHandlerSyncOrAsync
>;
// An Impossibility!!!
// export type DummyPlatformAdapter20 = PlatformAdapter<
//   DummyProtocolRequestHandlerSyncOrAsync,
//   DummyPlatformHandlerSync
// >;
export type DummyPlatformAdapter21 = PlatformAdapter<
  DummyProtocolRequestHandlerSyncOrAsync,
  DummyPlatformHandlerAsync
>;
// 22
export type DummyPlatformAdapterSyncOrAsync = PlatformAdapter<
  DummyProtocolRequestHandlerSyncOrAsync,
  DummyPlatformHandlerSyncOrAsync
>;

// Concrete Dummy Platform Adapters
export const dummyPlatformAdapterSync: DummyPlatformAdapterSync = (
  protocolRequestHandler: DummyProtocolRequestHandlerSync
) => (prefix: string) => protocolRequestHandler(prefix);

export const dummyPlatformAdapter01: DummyPlatformAdapter01 = (
  protocolRequestHandler: DummyProtocolRequestHandlerSync
) => async (prefix: string) => protocolRequestHandler(prefix);

export const dummyPlatformAdapter02: DummyPlatformAdapter02 = (
  protocolRequestHandler: DummyProtocolRequestHandlerSync
) => (prefix: string) => protocolRequestHandler(prefix);

export const dummyPlatformAdapterAsync: DummyPlatformAdapterAsync = (
  protocolRequestHandler: DummyProtocolRequestHandlerAsync
) => async (prefix: string) => await protocolRequestHandler(prefix);

export const dummyPlatformAdapter12: DummyPlatformAdapter12 = (
  protocolRequestHandler: DummyProtocolRequestHandlerAsync
) => async (prefix: string) => await protocolRequestHandler(prefix);

export const dummyPlatformAdapter21: DummyPlatformAdapter21 = (
  protocolRequestHandler: DummyProtocolRequestHandlerSyncOrAsync
) => async (prefix: string) => await protocolRequestHandler(prefix);

export const dummyPlatformAdapterSyncOrAsync: DummyPlatformAdapterSyncOrAsync = (
  protocolRequestHandler: DummyProtocolRequestHandlerSyncOrAsync
) => async (prefix: string) => await protocolRequestHandler(prefix);

// When 'async' keyword is used strictly
export const dummyPlatformAdapterSyncOrAsyncStrict: DummyPlatformAdapterSyncOrAsync = (
  protocolRequestHandler: DummyProtocolRequestHandlerSyncOrAsync
) =>
  protocolRequestHandler.constructor.name === 'AsyncFunction'
    ? async (prefix: string) => await protocolRequestHandler(prefix)
    : (prefix: string) => protocolRequestHandler(prefix);

// Faulty Platform Adapters
export const faultyPlatformAdapterSync: DummyPlatformAdapterSync = (
  protocolRequestHandler: DummyProtocolRequestHandlerSync
) => {
  const array = [];
  array.length = -1; // Created "RangeError: Invalid array length"
  return (prefix: string) => protocolRequestHandler(prefix);
};

export const faultyPlatformAdapter01: DummyPlatformAdapter01 = (
  protocolRequestHandler: DummyProtocolRequestHandlerSync
) => {
  const array = [];
  array.length = -1; // Created "RangeError: Invalid array length"
  return async (prefix: string) => protocolRequestHandler(prefix);
};

export const faultyPlatformAdapter02: DummyPlatformAdapter02 = (
  protocolRequestHandler: DummyProtocolRequestHandlerSync
) => {
  const array = [];
  array.length = -1; // Created "RangeError: Invalid array length"
  return (prefix: string) => protocolRequestHandler(prefix);
};

export const faultyPlatformAdapterAsync: DummyPlatformAdapterAsync = (
  protocolRequestHandler: DummyProtocolRequestHandlerAsync
) => {
  const array = [];
  array.length = -1; // Created "RangeError: Invalid array length"
  return async (prefix: string) => await protocolRequestHandler(prefix);
};

export const faultyPlatformAdapter12: DummyPlatformAdapter12 = (
  protocolRequestHandler: DummyProtocolRequestHandlerAsync
) => {
  const array = [];
  array.length = -1; // Created "RangeError: Invalid array length"
  return async (prefix: string) => await protocolRequestHandler(prefix);
};

export const faultyPlatformAdapter21: DummyPlatformAdapter21 = (
  protocolRequestHandler: DummyProtocolRequestHandlerSyncOrAsync
) => {
  const array = [];
  array.length = -1; // Created "RangeError: Invalid array length"
  return async (prefix: string) => await protocolRequestHandler(prefix);
};

export const faultyPlatformAdapterSyncOrAsync: DummyPlatformAdapterSyncOrAsync = (
  protocolRequestHandler: DummyProtocolRequestHandlerSyncOrAsync
) => {
  const array = [];
  array.length = -1; // Created "RangeError: Invalid array length"
  return async (prefix: string) => await protocolRequestHandler(prefix);
};

// When 'async' keyword is used strictly
export const faultyPlatformAdapterSyncOrAsyncStrict: DummyPlatformAdapterSyncOrAsync = (
  protocolRequestHandler: DummyProtocolRequestHandlerSyncOrAsync
) => {
  const array = [];
  array.length = -1; // Created "RangeError: Invalid array length"
  return protocolRequestHandler.constructor.name === 'AsyncFunction'
    ? async (prefix: string) => await protocolRequestHandler(prefix)
    : (prefix: string) => protocolRequestHandler(prefix);
};
