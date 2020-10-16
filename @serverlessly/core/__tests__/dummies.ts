import {
  Serverlessly,
  MiddlewareEngine,
  PlatformAdapter,
} from '@serverlessly/core';

// Dummy Protocol Interfaces
export type DummyProtocolSync = (prefix: string) => string;
export type DummyProtocolAsync = (prefix: string) => Promise<string>;
export type DummyProtocolSyncOrAsync = (
  prefix: string
) => string | Promise<string>;

// Dummy Middleware Interfaces
export type DummyMiddlewareSync = () => string;
export type DummyMiddlewareAsync = () => Promise<string>;
export type DummyMiddlewareSyncOrAsync = () => string | Promise<string>;

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

export type ServerlesslySyncOrAsync = Serverlessly<
  DummyProtocolSyncOrAsync,
  DummyMiddlewareSyncOrAsync
>;

export type ServerlesslySyncOrAsyncToSync = Serverlessly<
  DummyProtocolSyncOrAsync,
  DummyMiddlewareSync
>;

export type ServerlesslySyncOrAsyncToAsync = Serverlessly<
  DummyProtocolSyncOrAsync,
  DummyMiddlewareAsync
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

export type DummyMiddlewareEngineSyncOrAsync = MiddlewareEngine<
  DummyProtocolSyncOrAsync,
  DummyMiddlewareSyncOrAsync
>;

export type DummyMiddlewareEngineSyncWithSyncOrAsyncProtocol = MiddlewareEngine<
  DummyProtocolSyncOrAsync,
  DummyMiddlewareSync
>;

export type DummyMiddlewareEngineAsyncWithSyncOrAsyncProtocol = MiddlewareEngine<
  DummyProtocolSyncOrAsync,
  DummyMiddlewareAsync
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

export const dummyMiddlewareEngineSyncOrAsync: DummyMiddlewareEngineSyncOrAsync = (
  middlewares: DummyMiddlewareSyncOrAsync[]
) => async (prefix: string) =>
  middlewares.reduce(
    (promiseChain, current) =>
      promiseChain.then((chainResult) => {
        let exec = current();
        exec = exec instanceof Promise ? exec : Promise.resolve(exec);
        return exec.then((currentResult) => chainResult + ' ' + currentResult);
      }),
    Promise.resolve(prefix)
  );

export const dummyMiddlewareEngineSyncWithSyncOrAsyncProtocol: DummyMiddlewareEngineSyncWithSyncOrAsyncProtocol = (
  middlewares: DummyMiddlewareSync[]
) => (prefix: string) =>
  middlewares.reduce((acc, current) => acc + ' ' + current(), prefix);

export const dummyMiddlewareEngineAsyncWithSyncOrAsyncProtocol: DummyMiddlewareEngineAsyncWithSyncOrAsyncProtocol = (
  middlewares: DummyMiddlewareAsync[]
) => async (prefix: string) =>
  middlewares.reduce(
    (promiseChain, current) =>
      promiseChain.then((chainResult) =>
        current().then((currentResult) => chainResult + ' ' + currentResult)
      ),
    Promise.resolve(prefix)
  );

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

export const faultyMiddlewareEngineSyncOrAsync: DummyMiddlewareEngineSyncOrAsync = (
  middlewares: DummyMiddlewareSyncOrAsync[]
) => {
  const array = [];
  array.length = -1; // Created "RangeError: Invalid array length"
  return async (prefix: string) =>
    middlewares.reduce(
      (promiseChain, current) =>
        promiseChain.then((chainResult) => {
          let exec = current();
          exec = exec instanceof Promise ? exec : Promise.resolve(exec);
          return exec.then(
            (currentResult) => chainResult + ' ' + currentResult
          );
        }),
      Promise.resolve(prefix)
    );
};

export const faultyMiddlewareEngineSyncMiddlewareToSyncOrAsyncProtocol: DummyMiddlewareEngineSyncWithSyncOrAsyncProtocol = (
  middlewares: DummyMiddlewareSync[]
) => {
  const array = [];
  array.length = -1; // Created "RangeError: Invalid array length"
  return (prefix: string) =>
    middlewares.reduce((acc, current) => acc + ' ' + current(), prefix);
};

export const faultyMiddlewareEngineAsyncMiddlewareToSyncOrAsyncProtocol: DummyMiddlewareEngineAsyncWithSyncOrAsyncProtocol = (
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

// Dummy Handler Interfaces
export type DummyHandlerSync = (prefix: string) => string;
export type DummyHandlerAsync = (prefix: string) => Promise<string>;
export type DummyHandlerSyncOrAsync = (
  prefix: string
) => string | Promise<string>;

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

export type DummyPlatformAdapterSyncOrAsync = PlatformAdapter<
  DummyProtocolSyncOrAsync,
  DummyHandlerSyncOrAsync
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

export const dummyPlatformAdapterSyncOrAsyncStrict: DummyPlatformAdapterSyncOrAsync = (
  protocolHandler: DummyProtocolSyncOrAsync
) =>
  protocolHandler.constructor.name === 'AsyncFunction'
    ? async (prefix: string) => await protocolHandler(prefix)
    : (prefix: string) => protocolHandler(prefix);

export const dummyPlatformAdapterSyncOrAsync: DummyPlatformAdapterSyncOrAsync = (
  protocolHandler: DummyProtocolSyncOrAsync
) => async (prefix: string) => {
  const coreCode = protocolHandler(prefix);
  return coreCode instanceof Promise ? await coreCode : coreCode;
};

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

export const faultyPlatformAdapterSyncOrAsyncStrict: DummyPlatformAdapterSyncOrAsync = (
  protocolHandler: DummyProtocolSyncOrAsync
) => {
  const array = [];
  array.length = -1; // Created "RangeError: Invalid array length"
  return protocolHandler.constructor.name === 'AsyncFunction'
    ? async (prefix: string) => await protocolHandler(prefix)
    : (prefix: string) => protocolHandler(prefix);
};

export const faultyPlatformAdapterSyncOrAsync: DummyPlatformAdapterSyncOrAsync = (
  protocolHandler: DummyProtocolSyncOrAsync
) => {
  const array = [];
  array.length = -1; // Created "RangeError: Invalid array length"
  return async (prefix: string) => {
    const coreCode = protocolHandler(prefix);
    return coreCode instanceof Promise ? await coreCode : coreCode;
  };
};
