import {
  Serverlessly,
  MiddlewareEngine,
  PlatformAdapter,
} from '@serverlessly/core';

// Dummy Protocol Interfaces
export type DummyProtocolSync = (prefix: string) => string;
export type DummyProtocolAsync = (prefix: string) => Promise<string>;

// Dummy Middleware Interfaces
export type DummyMiddlewareSync = () => string;
export type DummyMiddlewareAsync = () => Promise<string>;

// Dummy Serverlessly Instances
export type ServerlesslySync = Serverlessly<
  DummyProtocolSync,
  DummyMiddlewareSync
>;
export type ServerlesslyAsync = Serverlessly<
  DummyProtocolAsync,
  DummyMiddlewareAsync
>;
// An Impossibility!!!
// export type ServerlesslySyncToAsync = Serverlessly<
//   DummyProtocolSync,
//   DummyMiddlewareAsync
// >;
export type ServerlesslyAsyncToSync = Serverlessly<
  DummyProtocolAsync,
  DummyMiddlewareSync
>;

// Dummy Middleware Engine Interfaces
export type DummyMiddlewareEngineSync = MiddlewareEngine<
  DummyProtocolSync,
  DummyMiddlewareSync
>;
export type DummyMiddlewareEngineAsync = MiddlewareEngine<
  DummyProtocolAsync,
  DummyMiddlewareAsync
>;
// An Impossibility!!!
// export type DummyMiddlewareEngineAsyncMiddlewareToSyncProtocol = MiddlewareEngine<
//   DummyProtocolSync,
//   DummyMiddlewareAsync
// >;
export type DummyMiddlewareEngineSyncMiddlewareToAsyncProtocol = MiddlewareEngine<
  DummyProtocolAsync,
  DummyMiddlewareSync
>;

// Concrete Dummy Middleware Engines
export const dummyMiddlewareEngineSync: DummyMiddlewareEngineSync = (
  middlewares: DummyMiddlewareSync[]
) => (prefix: string) =>
  middlewares.reduce((acc, current) => acc + ' ' + current(), prefix);

export const dummyMiddlewareEngineAsync: DummyMiddlewareEngineAsync = (
  middlewares: DummyMiddlewareAsync[]
) => async (prefix: string) =>
  middlewares.reduce(
    (promiseChain, current) =>
      promiseChain.then((chainResult) =>
        current().then((currentResult) => chainResult + ' ' + currentResult)
      ),
    Promise.resolve(prefix)
  );

export const dummyMiddlewareEngineSyncMiddlewareToAsyncProtocol: DummyMiddlewareEngineSyncMiddlewareToAsyncProtocol = (
  middlewares: DummyMiddlewareSync[]
) => async (prefix: string) =>
  middlewares.reduce((acc, current) => acc + ' ' + current(), prefix);

// Faulty Middleware Engines
export const faultyMiddlewareEngineSync: DummyMiddlewareEngineSync = (
  middlewares: DummyMiddlewareSync[]
) => {
  const array = [];
  array.length = -1; // Created "RangeError: Invalid array length"
  return (prefix: string) =>
    middlewares.reduce((acc, current) => acc + ' ' + current(), prefix);
};

export const faultyMiddlewareEngineAsync: DummyMiddlewareEngineAsync = (
  middlewares: DummyMiddlewareAsync[]
) => {
  const array = [];
  array.length = -1; // Created "RangeError: Invalid array length"
  return async (prefix: string) =>
    middlewares.reduce(
      (promiseChain, current) =>
        promiseChain.then((chainResult) =>
          current().then((currentResult) => chainResult + ' ' + currentResult)
        ),
      Promise.resolve(prefix)
    );
};

export const faultyMiddlewareEngineSyncMiddlewareToAsyncProtocol: DummyMiddlewareEngineSyncMiddlewareToAsyncProtocol = (
  middlewares: DummyMiddlewareSync[]
) => {
  const array = [];
  array.length = -1; // Created "RangeError: Invalid array length"
  return async (prefix: string) =>
    middlewares.reduce((acc, current) => acc + ' ' + current(), prefix);
};

// Dummy Handler Interfaces
export type DummyHandlerSync = (prefix: string) => string;
export type DummyHandlerAsync = (prefix: string) => Promise<string>;

// Dummy Platform Adapter Interfaces
export type DummyPlatformAdapterSync = PlatformAdapter<
  DummyProtocolSync,
  DummyHandlerSync
>;
export type DummyPlatformAdapterAsync = PlatformAdapter<
  DummyProtocolAsync,
  DummyHandlerAsync
>;
// An Impossibility!!!
// export type DummyPlatformAdapterSyncHanderToAsyncProtocol = PlatformAdapter<
//   DummyProtocolAsync,
//   DummyHandlerSync
// >;
export type DummyPlatformAdapterAsyncHandlerToSyncProtocol = PlatformAdapter<
  DummyProtocolSync,
  DummyHandlerAsync
>;

// Concrete Dummy Platform Adapters
export const dummyPlatformAdapterSync: DummyPlatformAdapterSync = (
  protocolHandler: DummyProtocolSync
) => (prefix: string) => protocolHandler(prefix);

export const dummyPlatformAdapterAsync: DummyPlatformAdapterAsync = (
  protocolHandler: DummyProtocolAsync
) => async (prefix: string) => await protocolHandler(prefix);

export const dummyPlatformAdapterAsyncHandlerToSyncProtocol: DummyPlatformAdapterAsyncHandlerToSyncProtocol = (
  protocolHandler: DummyProtocolSync
) => async (prefix: string) => protocolHandler(prefix);

// Faulty Platform Adapters
export const faultyPlatformAdapterSync: DummyPlatformAdapterSync = (
  protocolHandler: DummyProtocolSync
) => {
  const array = [];
  array.length = -1; // Created "RangeError: Invalid array length"
  return (prefix: string) => protocolHandler(prefix);
};

export const faultyPlatformAdapterAsync: DummyPlatformAdapterAsync = (
  protocolHandler: DummyProtocolAsync
) => {
  const array = [];
  array.length = -1; // Created "RangeError: Invalid array length"
  return async (prefix: string) => await protocolHandler(prefix);
};

export const faultyPlatformAdapterAsyncHandlerToSyncProtocol: DummyPlatformAdapterAsyncHandlerToSyncProtocol = (
  protocolHandler: DummyProtocolSync
) => {
  const array = [];
  array.length = -1; // Created "RangeError: Invalid array length"
  return async (prefix: string) => protocolHandler(prefix);
};
