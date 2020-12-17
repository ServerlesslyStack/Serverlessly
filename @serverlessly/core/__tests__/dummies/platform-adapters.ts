import { PlatformAdapter } from '@serverlessly/core';
import {
  DummyPlatformHandlerSync,
  DummyPlatformHandlerAsync,
  DummyPlatformHandlerSyncOrAsync,
} from './platform-handlers';
import {
  DummyProtocolContextSync,
  DummyProtocolContextAsync,
  DummyProtocolContextSyncOrAsync,
} from './protocol-contexts';

// Sync=0 Async=1 SyncOrAsync=2

// Dummy Platform Adapter interfaces
// 00
export type DummyPlatformAdapterSync = PlatformAdapter<
  DummyProtocolContextSync,
  DummyPlatformHandlerSync
>;
export type DummyPlatformAdapter01 = PlatformAdapter<
  DummyProtocolContextSync,
  DummyPlatformHandlerAsync
>;
export type DummyPlatformAdapter02 = PlatformAdapter<
  DummyProtocolContextSync,
  DummyPlatformHandlerSyncOrAsync
>;
// An Impossibility!!!
// export type DummyPlatformAdapter10 = PlatformAdapter<
//   DummyProtocolContextAsync,
//   DummyPlatformHandlerSync
// >;
// 11
export type DummyPlatformAdapterAsync = PlatformAdapter<
  DummyProtocolContextAsync,
  DummyPlatformHandlerAsync
>;
export type DummyPlatformAdapter12 = PlatformAdapter<
  DummyProtocolContextAsync,
  DummyPlatformHandlerSyncOrAsync
>;
// An Impossibility!!!
// export type DummyPlatformAdapter20 = PlatformAdapter<
//   DummyProtocolContextSyncOrAsync,
//   DummyPlatformHandlerSync
// >;
export type DummyPlatformAdapter21 = PlatformAdapter<
  DummyProtocolContextSyncOrAsync,
  DummyPlatformHandlerAsync
>;
// 22
export type DummyPlatformAdapterSyncOrAsync = PlatformAdapter<
  DummyProtocolContextSyncOrAsync,
  DummyPlatformHandlerSyncOrAsync
>;

// Concrete Dummy Platform Adapters
export const dummyPlatformAdapterSync: DummyPlatformAdapterSync = (
  protocolContext: DummyProtocolContextSync
) => (prefix: string) => protocolContext(prefix);

export const dummyPlatformAdapter01: DummyPlatformAdapter01 = (
  protocolContext: DummyProtocolContextSync
) => async (prefix: string) => protocolContext(prefix);

export const dummyPlatformAdapter02: DummyPlatformAdapter02 = (
  protocolContext: DummyProtocolContextSync
) => (prefix: string) => protocolContext(prefix);

export const dummyPlatformAdapterAsync: DummyPlatformAdapterAsync = (
  protocolContext: DummyProtocolContextAsync
) => async (prefix: string) => await protocolContext(prefix);

export const dummyPlatformAdapter12: DummyPlatformAdapter12 = (
  protocolContext: DummyProtocolContextAsync
) => async (prefix: string) => await protocolContext(prefix);

export const dummyPlatformAdapter21: DummyPlatformAdapter21 = (
  protocolContext: DummyProtocolContextSyncOrAsync
) => async (prefix: string) => await protocolContext(prefix);

export const dummyPlatformAdapterSyncOrAsync: DummyPlatformAdapterSyncOrAsync = (
  protocolContext: DummyProtocolContextSyncOrAsync
) => async (prefix: string) => await protocolContext(prefix);

// When 'async' keyword is used strictly
export const dummyPlatformAdapterSyncOrAsyncStrict: DummyPlatformAdapterSyncOrAsync = (
  protocolContext: DummyProtocolContextSyncOrAsync
) =>
  protocolContext.constructor.name === 'AsyncFunction'
    ? async (prefix: string) => await protocolContext(prefix)
    : (prefix: string) => protocolContext(prefix);

// Faulty Platform Adapters
export const faultyPlatformAdapterSync: DummyPlatformAdapterSync = (
  protocolContext: DummyProtocolContextSync
) => {
  const array = [];
  array.length = -1; // Created "RangeError: Invalid array length"
  return (prefix: string) => protocolContext(prefix);
};

export const faultyPlatformAdapter01: DummyPlatformAdapter01 = (
  protocolContext: DummyProtocolContextSync
) => {
  const array = [];
  array.length = -1; // Created "RangeError: Invalid array length"
  return async (prefix: string) => protocolContext(prefix);
};

export const faultyPlatformAdapter02: DummyPlatformAdapter02 = (
  protocolContext: DummyProtocolContextSync
) => {
  const array = [];
  array.length = -1; // Created "RangeError: Invalid array length"
  return (prefix: string) => protocolContext(prefix);
};

export const faultyPlatformAdapterAsync: DummyPlatformAdapterAsync = (
  protocolContext: DummyProtocolContextAsync
) => {
  const array = [];
  array.length = -1; // Created "RangeError: Invalid array length"
  return async (prefix: string) => await protocolContext(prefix);
};

export const faultyPlatformAdapter12: DummyPlatformAdapter12 = (
  protocolContext: DummyProtocolContextAsync
) => {
  const array = [];
  array.length = -1; // Created "RangeError: Invalid array length"
  return async (prefix: string) => await protocolContext(prefix);
};

export const faultyPlatformAdapter21: DummyPlatformAdapter21 = (
  protocolContext: DummyProtocolContextSyncOrAsync
) => {
  const array = [];
  array.length = -1; // Created "RangeError: Invalid array length"
  return async (prefix: string) => await protocolContext(prefix);
};

export const faultyPlatformAdapterSyncOrAsync: DummyPlatformAdapterSyncOrAsync = (
  protocolContext: DummyProtocolContextSyncOrAsync
) => {
  const array = [];
  array.length = -1; // Created "RangeError: Invalid array length"
  return async (prefix: string) => await protocolContext(prefix);
};

// When 'async' keyword is used strictly
export const faultyPlatformAdapterSyncOrAsyncStrict: DummyPlatformAdapterSyncOrAsync = (
  protocolContext: DummyProtocolContextSyncOrAsync
) => {
  const array = [];
  array.length = -1; // Created "RangeError: Invalid array length"
  return protocolContext.constructor.name === 'AsyncFunction'
    ? async (prefix: string) => await protocolContext(prefix)
    : (prefix: string) => protocolContext(prefix);
};
