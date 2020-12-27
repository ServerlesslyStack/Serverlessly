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
  DummyProtocolServerSync,
  string
>;
export type DummyProtocolServerFactory01 = ProtocolServerFactory<
  DummyProtocolContextSync,
  DummyProtocolServerAsync,
  string
>;
export type DummyProtocolServerFactory02 = ProtocolServerFactory<
  DummyProtocolContextSync,
  DummyProtocolServerSyncOrAsync,
  string
>;
// An Impossibility!!!
// export type DummyProtocolServerFactory10 = ProtocolServerFactory<
//   DummyProtocolContextAsync,
//   DummyProtocolServerSync,
//   string
// >;
// 11
export type DummyProtocolServerFactoryAsync = ProtocolServerFactory<
  DummyProtocolContextAsync,
  DummyProtocolServerAsync,
  string
>;
export type DummyProtocolServerFactory12 = ProtocolServerFactory<
  DummyProtocolContextAsync,
  DummyProtocolServerSyncOrAsync,
  string
>;
// An Impossibility!!!
// export type DummyProtocolServerFactory20 = ProtocolServerFactory<
//   DummyProtocolContextSyncOrAsync,
//   DummyProtocolServerSync,
//   string
// >;
export type DummyProtocolServerFactory21 = ProtocolServerFactory<
  DummyProtocolContextSyncOrAsync,
  DummyProtocolServerAsync,
  string
>;
// 22
export type DummyProtocolServerFactorySyncOrAsync = ProtocolServerFactory<
  DummyProtocolContextSyncOrAsync,
  DummyProtocolServerSyncOrAsync,
  string
>;

// Concrete Protocol Server Factories
export const dummyProtocolServerFactorySync: DummyProtocolServerFactorySync = (
  prefix: string
) => (protocolContext: DummyProtocolContextSync) =>
  new DummyProtocolServerSync(prefix, protocolContext);

export const dummyProtocolServerFactory01: DummyProtocolServerFactory01 = (
  prefix: string
) => (protocolContext: DummyProtocolContextSync) =>
  new DummyProtocolServerAsync(prefix, protocolContext);

export const dummyProtocolServerFactory02: DummyProtocolServerFactory02 = (
  prefix: string
) => (protocolContext: DummyProtocolContextSync) =>
  new DummyProtocolServerSyncOrAsync(prefix, protocolContext);

export const dummyProtocolServerFactoryAsync: DummyProtocolServerFactoryAsync = (
  prefix: string
) => (protocolContext: DummyProtocolContextAsync) =>
  new DummyProtocolServerAsync(prefix, protocolContext);

export const dummyProtocolServerFactory12: DummyProtocolServerFactory12 = (
  prefix: string
) => (protocolContext: DummyProtocolContextAsync) =>
  new DummyProtocolServerSyncOrAsync(prefix, protocolContext);

export const dummyProtocolServerFactory21: DummyProtocolServerFactory21 = (
  prefix: string
) => (protocolContext: DummyProtocolContextSyncOrAsync) =>
  new DummyProtocolServerAsync(prefix, protocolContext);

export const dummyProtocolServerFactorySyncOrAsync: DummyProtocolServerFactorySyncOrAsync = (
  prefix: string
) => (protocolContext: DummyProtocolContextSyncOrAsync) =>
  new DummyProtocolServerSyncOrAsync(prefix, protocolContext);

// Faulty Protocol Server Factories
export const faultyProtocolServerFactorySync: DummyProtocolServerFactorySync = (
  prefix: string
) => (protocolContext: DummyProtocolContextSync) => {
  const array = [];
  array.length = -1; // Created "RangeError: Invalid array length"
  return new DummyProtocolServerSync(prefix, protocolContext);
};

export const faultyProtocolServerFactory01: DummyProtocolServerFactory01 = (
  prefix: string
) => (protocolContext: DummyProtocolContextSync) => {
  const array = [];
  array.length = -1; // Created "RangeError: Invalid array length"
  return new DummyProtocolServerAsync(prefix, protocolContext);
};

export const faultyProtocolServerFactory02: DummyProtocolServerFactory02 = (
  prefix: string
) => (protocolContext: DummyProtocolContextSync) => {
  const array = [];
  array.length = -1; // Created "RangeError: Invalid array length"
  return new DummyProtocolServerSyncOrAsync(prefix, protocolContext);
};

export const faultyProtocolServerFactoryAsync: DummyProtocolServerFactoryAsync = (
  prefix: string
) => (protocolContext: DummyProtocolContextAsync) => {
  const array = [];
  array.length = -1; // Created "RangeError: Invalid array length"
  return new DummyProtocolServerAsync(prefix, protocolContext);
};

export const faultyProtocolServerFactory12: DummyProtocolServerFactory12 = (
  prefix: string
) => (protocolContext: DummyProtocolContextAsync) => {
  const array = [];
  array.length = -1; // Created "RangeError: Invalid array length"
  return new DummyProtocolServerSyncOrAsync(prefix, protocolContext);
};

export const faultyProtocolServerFactory21: DummyProtocolServerFactory21 = (
  prefix: string
) => (protocolContext: DummyProtocolContextSyncOrAsync) => {
  const array = [];
  array.length = -1; // Created "RangeError: Invalid array length"
  return new DummyProtocolServerAsync(prefix, protocolContext);
};

export const faultyProtocolServerFactorySyncOrAsync: DummyProtocolServerFactorySyncOrAsync = (
  prefix: string
) => (protocolContext: DummyProtocolContextSyncOrAsync) => {
  const array = [];
  array.length = -1; // Created "RangeError: Invalid array length"
  return new DummyProtocolServerSyncOrAsync(prefix, protocolContext);
};
