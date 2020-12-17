import { ProtocolServerFactory } from '@serverlessly/core';
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

// Dummy Protocol Server Factory interfaces
// 00
export type DummyProtocolServerFactorySync = ProtocolServerFactory<
  DummyProtocolContextSync,
  DummyProtocolServerSync
>;
export type DummyProtocolServerFactory01 = ProtocolServerFactory<
  DummyProtocolContextSync,
  DummyProtocolServerAsync
>;
export type DummyProtocolServerFactory02 = ProtocolServerFactory<
  DummyProtocolContextSync,
  DummyProtocolServerSyncOrAsync
>;
// An Impossibility!!!
// export type DummyProtocolServerFactory10 = ProtocolServerFactory<
//   DummyProtocolContextAsync,
//   DummyProtocolServerSync
// >;
// 11
export type DummyProtocolServerFactoryAsync = ProtocolServerFactory<
  DummyProtocolContextAsync,
  DummyProtocolServerAsync
>;
export type DummyProtocolServerFactory12 = ProtocolServerFactory<
  DummyProtocolContextAsync,
  DummyProtocolServerSyncOrAsync
>;
// An Impossibility!!!
// export type DummyProtocolServerFactory20 = ProtocolServerFactory<
//   DummyProtocolContextSyncOrAsync,
//   DummyProtocolServerSync
// >;
export type DummyProtocolServerFactory21 = ProtocolServerFactory<
  DummyProtocolContextSyncOrAsync,
  DummyProtocolServerAsync
>;
// 22
export type DummyProtocolServerFactorySyncOrAsync = ProtocolServerFactory<
  DummyProtocolContextSyncOrAsync,
  DummyProtocolServerSyncOrAsync
>;

// Concrete Protocol Server Factories
export const dummyProtocolServerFactorySync: DummyProtocolServerFactorySync = (
  protocolContext: DummyProtocolContextSync
) => new DummyProtocolServerSync(protocolContext);

export const dummyProtocolServerFactory01: DummyProtocolServerFactory01 = (
  protocolContext: DummyProtocolContextSync
) => new DummyProtocolServerAsync(protocolContext);

export const dummyProtocolServerFactory02: DummyProtocolServerFactory02 = (
  protocolContext: DummyProtocolContextSync
) => new DummyProtocolServerSyncOrAsync(protocolContext);

export const dummyProtocolServerFactoryAsync: DummyProtocolServerFactoryAsync = (
  protocolContext: DummyProtocolContextAsync
) => new DummyProtocolServerAsync(protocolContext);

export const dummyProtocolServerFactory12: DummyProtocolServerFactory12 = (
  protocolContext: DummyProtocolContextAsync
) => new DummyProtocolServerSyncOrAsync(protocolContext);

export const dummyProtocolServerFactory21: DummyProtocolServerFactory21 = (
  protocolContext: DummyProtocolContextSyncOrAsync
) => new DummyProtocolServerAsync(protocolContext);

export const dummyProtocolServerFactorySyncOrAsync: DummyProtocolServerFactorySyncOrAsync = (
  protocolContext: DummyProtocolContextSyncOrAsync
) => new DummyProtocolServerSyncOrAsync(protocolContext);

// Faulty Protocol Server Factories
export const faultyProtocolServerFactorySync: DummyProtocolServerFactorySync = (
  protocolContext: DummyProtocolContextSync
) => {
  const array = [];
  array.length = -1; // Created "RangeError: Invalid array length"
  return new DummyProtocolServerSync(protocolContext);
};

export const faultyProtocolServerFactory01: DummyProtocolServerFactory01 = (
  protocolContext: DummyProtocolContextSync
) => {
  const array = [];
  array.length = -1; // Created "RangeError: Invalid array length"
  return new DummyProtocolServerAsync(protocolContext);
};

export const faultyProtocolServerFactory02: DummyProtocolServerFactory02 = (
  protocolContext: DummyProtocolContextSync
) => {
  const array = [];
  array.length = -1; // Created "RangeError: Invalid array length"
  return new DummyProtocolServerSyncOrAsync(protocolContext);
};

export const faultyProtocolServerFactoryAsync: DummyProtocolServerFactoryAsync = (
  protocolContext: DummyProtocolContextAsync
) => {
  const array = [];
  array.length = -1; // Created "RangeError: Invalid array length"
  return new DummyProtocolServerAsync(protocolContext);
};

export const faultyProtocolServerFactory12: DummyProtocolServerFactory12 = (
  protocolContext: DummyProtocolContextAsync
) => {
  const array = [];
  array.length = -1; // Created "RangeError: Invalid array length"
  return new DummyProtocolServerSyncOrAsync(protocolContext);
};

export const faultyProtocolServerFactory21: DummyProtocolServerFactory21 = (
  protocolContext: DummyProtocolContextSyncOrAsync
) => {
  const array = [];
  array.length = -1; // Created "RangeError: Invalid array length"
  return new DummyProtocolServerAsync(protocolContext);
};

export const faultyProtocolServerFactorySyncOrAsync: DummyProtocolServerFactorySyncOrAsync = (
  protocolContext: DummyProtocolContextSyncOrAsync
) => {
  const array = [];
  array.length = -1; // Created "RangeError: Invalid array length"
  return new DummyProtocolServerSyncOrAsync(protocolContext);
};
