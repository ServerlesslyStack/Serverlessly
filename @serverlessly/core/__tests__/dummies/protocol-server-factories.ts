import { ProtocolServerFactory } from '@serverlessly/core';
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

// Dummy Protocol Server Factory interfaces
// 00
export type DummyProtocolServerFactorySync = ProtocolServerFactory<
  DummyProtocolRequestHandlerSync,
  DummyProtocolServerSync
>;
export type DummyProtocolServerFactory01 = ProtocolServerFactory<
  DummyProtocolRequestHandlerSync,
  DummyProtocolServerAsync
>;
export type DummyProtocolServerFactory02 = ProtocolServerFactory<
  DummyProtocolRequestHandlerSync,
  DummyProtocolServerSyncOrAsync
>;
// An Impossibility!!!
// export type DummyProtocolServerFactory10 = ProtocolServerFactory<
//   DummyProtocolRequestHandlerAsync,
//   DummyProtocolServerSync
// >;
// 11
export type DummyProtocolServerFactoryAsync = ProtocolServerFactory<
  DummyProtocolRequestHandlerAsync,
  DummyProtocolServerAsync
>;
export type DummyProtocolServerFactory12 = ProtocolServerFactory<
  DummyProtocolRequestHandlerAsync,
  DummyProtocolServerSyncOrAsync
>;
// An Impossibility!!!
// export type DummyProtocolServerFactory20 = ProtocolServerFactory<
//   DummyProtocolRequestHandlerSyncOrAsync,
//   DummyProtocolServerSync
// >;
export type DummyProtocolServerFactory21 = ProtocolServerFactory<
  DummyProtocolRequestHandlerSyncOrAsync,
  DummyProtocolServerAsync
>;
// 22
export type DummyProtocolServerFactorySyncOrAsync = ProtocolServerFactory<
  DummyProtocolRequestHandlerSyncOrAsync,
  DummyProtocolServerSyncOrAsync
>;

// Concrete Protocol Server Factories
export const dummyProtocolServerFactorySync: DummyProtocolServerFactorySync = (
  protocolRequestHandler: DummyProtocolRequestHandlerSync
) => new DummyProtocolServerSync(protocolRequestHandler);

export const dummyProtocolServerFactory01: DummyProtocolServerFactory01 = (
  protocolRequestHandler: DummyProtocolRequestHandlerSync
) => new DummyProtocolServerAsync(protocolRequestHandler);

export const dummyProtocolServerFactory02: DummyProtocolServerFactory02 = (
  protocolRequestHandler: DummyProtocolRequestHandlerSync
) => new DummyProtocolServerSyncOrAsync(protocolRequestHandler);

export const dummyProtocolServerFactoryAsync: DummyProtocolServerFactoryAsync = (
  protocolRequestHandler: DummyProtocolRequestHandlerAsync
) => new DummyProtocolServerAsync(protocolRequestHandler);

export const dummyProtocolServerFactory12: DummyProtocolServerFactory12 = (
  protocolRequestHandler: DummyProtocolRequestHandlerAsync
) => new DummyProtocolServerSyncOrAsync(protocolRequestHandler);

export const dummyProtocolServerFactory21: DummyProtocolServerFactory21 = (
  protocolRequestHandler: DummyProtocolRequestHandlerSyncOrAsync
) => new DummyProtocolServerAsync(protocolRequestHandler);

export const dummyProtocolServerFactorySyncOrAsync: DummyProtocolServerFactorySyncOrAsync = (
  protocolRequestHandler: DummyProtocolRequestHandlerSyncOrAsync
) => new DummyProtocolServerSyncOrAsync(protocolRequestHandler);

// Faulty Protocol Server Factories
export const faultyProtocolServerFactorySync: DummyProtocolServerFactorySync = (
  protocolRequestHandler: DummyProtocolRequestHandlerSync
) => {
  const array = [];
  array.length = -1; // Created "RangeError: Invalid array length"
  return new DummyProtocolServerSync(protocolRequestHandler);
};

export const faultyProtocolServerFactory01: DummyProtocolServerFactory01 = (
  protocolRequestHandler: DummyProtocolRequestHandlerSync
) => {
  const array = [];
  array.length = -1; // Created "RangeError: Invalid array length"
  return new DummyProtocolServerAsync(protocolRequestHandler);
};

export const faultyProtocolServerFactory02: DummyProtocolServerFactory02 = (
  protocolRequestHandler: DummyProtocolRequestHandlerSync
) => {
  const array = [];
  array.length = -1; // Created "RangeError: Invalid array length"
  return new DummyProtocolServerSyncOrAsync(protocolRequestHandler);
};

export const faultyProtocolServerFactoryAsync: DummyProtocolServerFactoryAsync = (
  protocolRequestHandler: DummyProtocolRequestHandlerAsync
) => {
  const array = [];
  array.length = -1; // Created "RangeError: Invalid array length"
  return new DummyProtocolServerAsync(protocolRequestHandler);
};

export const faultyProtocolServerFactory12: DummyProtocolServerFactory12 = (
  protocolRequestHandler: DummyProtocolRequestHandlerAsync
) => {
  const array = [];
  array.length = -1; // Created "RangeError: Invalid array length"
  return new DummyProtocolServerSyncOrAsync(protocolRequestHandler);
};

export const faultyProtocolServerFactory21: DummyProtocolServerFactory21 = (
  protocolRequestHandler: DummyProtocolRequestHandlerSyncOrAsync
) => {
  const array = [];
  array.length = -1; // Created "RangeError: Invalid array length"
  return new DummyProtocolServerAsync(protocolRequestHandler);
};

export const faultyProtocolServerFactorySyncOrAsync: DummyProtocolServerFactorySyncOrAsync = (
  protocolRequestHandler: DummyProtocolRequestHandlerSyncOrAsync
) => {
  const array = [];
  array.length = -1; // Created "RangeError: Invalid array length"
  return new DummyProtocolServerSyncOrAsync(protocolRequestHandler);
};
