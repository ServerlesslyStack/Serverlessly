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

// Dummy Middlewares
export const dummyMiddlewaresSync: DummyMiddlewareSync[] = [
  (): string => 'Hulk',
  (): string => 'Smash',
  (): string => 'I am Groot',
  (): string => 'Avengers, Assemble!',
];
export const dummyMiddlewaresAsync: DummyMiddlewareAsync[] = [
  async (): Promise<string> => 'Hulk',
  (): Promise<string> => Promise.resolve('Smash'),
  async (): Promise<string> => 'I am Groot',
  (): Promise<string> => Promise.resolve('Avengers, Assemble!'),
];
export const dummyMiddlewaresSyncOrAsync: DummyMiddlewareSyncOrAsync[] = [
  (): string => 'Hulk',
  async (): Promise<string> => 'Smash',
  (): string => 'I am Groot',
  (): string => 'Avengers, Assemble!',
];

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
// export type ServerlesslySyncProtocolWithAsyncMiddleware = Serverlessly<
//   DummyProtocolSync,
//   DummyMiddlewareAsync
// >;
export type ServerlesslyAsyncProtocolWithSyncMiddlewares = Serverlessly<
  DummyProtocolAsync,
  DummyMiddlewareSync
>;

export type ServerlesslySyncOrAsync = Serverlessly<
  DummyProtocolSyncOrAsync,
  DummyMiddlewareSyncOrAsync
>;

export type ServerlesslySyncOrAsyncProtocolWithSyncMiddlewares = Serverlessly<
  DummyProtocolSyncOrAsync,
  DummyMiddlewareSync
>;

export type ServerlesslySyncOrAsyncProtocolWithAsyncMiddlewares = Serverlessly<
  DummyProtocolSyncOrAsync,
  DummyMiddlewareAsync
>;

// An Impossibility!!!
// export type ServerlesslySyncProtocolWithAsyncMiddlewares = Serverlessly<
//   DummyProtocolSync,
//   DummyMiddlewareSyncOrAsync
// >;

export type ServerlesslyAsyncProtocolWithSyncOrAsyncMiddlewares = Serverlessly<
  DummyProtocolAsync,
  DummyMiddlewareSyncOrAsync
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

export type DummyMiddlewareEngineSyncMiddlewareToSyncOrAsyncProtocol = MiddlewareEngine<
  DummyProtocolSyncOrAsync,
  DummyMiddlewareSync
>;

export type DummyMiddlewareEngineAsyncMiddlewareToSyncOrAsyncProtocol = MiddlewareEngine<
  DummyProtocolSyncOrAsync,
  DummyMiddlewareAsync
>;
// An Impossibility!!!
// export type DummyMiddlewareEngineSyncOrAsyncMiddlewareToSyncProtocol = MiddlewareEngine<
//   DummyProtocolSync,
//   DummyMiddlewareSyncOrAsync
// >;
export type DummyMiddlewareEngineSyncOrAsyncMiddlewareToAsyncProtocol = MiddlewareEngine<
  DummyProtocolAsync,
  DummyMiddlewareSyncOrAsync
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

export const dummyMiddlewareEngineSyncMiddlewareToSyncOrAsyncProtocol: DummyMiddlewareEngineSyncMiddlewareToSyncOrAsyncProtocol = (
  middlewares: DummyMiddlewareSync[]
) => (prefix: string) =>
  middlewares.reduce((acc, current) => acc + ' ' + current(), prefix);

export const dummyMiddlewareEngineAsyncMiddlewareToSyncOrAsyncProtocol: DummyMiddlewareEngineAsyncMiddlewareToSyncOrAsyncProtocol = (
  middlewares: DummyMiddlewareAsync[]
) => async (prefix: string) =>
  middlewares.reduce(
    (promiseChain, current) =>
      promiseChain.then((chainResult) =>
        current().then((currentResult) => chainResult + ' ' + currentResult)
      ),
    Promise.resolve(prefix)
  );

export const dummyMiddlewareEngineSyncOrAsyncMiddlewareToAsyncProtocol: DummyMiddlewareEngineSyncOrAsyncMiddlewareToAsyncProtocol = (
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

export const faultyMiddlewareEngineSyncMiddlewareToSyncOrAsyncProtocol: DummyMiddlewareEngineSyncMiddlewareToSyncOrAsyncProtocol = (
  middlewares: DummyMiddlewareSync[]
) => {
  const array = [];
  array.length = -1; // Created "RangeError: Invalid array length"
  return (prefix: string) =>
    middlewares.reduce((acc, current) => acc + ' ' + current(), prefix);
};

export const faultyMiddlewareEngineAsyncMiddlewareToSyncOrAsyncProtocol: DummyMiddlewareEngineAsyncMiddlewareToSyncOrAsyncProtocol = (
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

export const faultyMiddlewareEngineSyncOrAsyncMiddlewareToAsyncProtocol: DummyMiddlewareEngineSyncOrAsyncMiddlewareToAsyncProtocol = (
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

export type DummyPlatformAdapterSyncOrAsyncHandlerToSyncProtocol = PlatformAdapter<
  DummyProtocolSync,
  DummyHandlerSyncOrAsync
>;

export type DummyPlatformAdapterSyncOrAsyncHandlerToAsyncProtocol = PlatformAdapter<
  DummyProtocolAsync,
  DummyHandlerSyncOrAsync
>;

// An Impossibility!!!
// export type DummyPlatformAdapterSyncHandlerToSyncOrAsyncProtocol = PlatformAdapter<
//   DummyProtocolSyncOrAsync,
//   DummyHandlerSync
// >;

export type DummyPlatformAdapterAsyncHandlerToSyncOrAsyncProtocol = PlatformAdapter<
  DummyProtocolSyncOrAsync,
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

export const dummyPlatformAdapterSyncOrAsyncHandlerToSyncProtocol: DummyPlatformAdapterSyncOrAsyncHandlerToSyncProtocol = (
  protocolHandler: DummyProtocolSync
) => (prefix: string) => protocolHandler(prefix);

export const dummyPlatformAdapterSyncOrAsyncHandlerToAsyncProtocol: DummyPlatformAdapterSyncOrAsyncHandlerToAsyncProtocol = (
  protocolHandler: DummyProtocolAsync
) => async (prefix: string) => await protocolHandler(prefix);

export const dummyPlatformAdapterAsyncHandlerToSyncOrAsyncProtocol: DummyPlatformAdapterAsyncHandlerToSyncOrAsyncProtocol = (
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

export const faultyPlatformAdapterSyncOrAsyncHandlerToSyncProtocol: DummyPlatformAdapterSyncOrAsyncHandlerToSyncProtocol = (
  protocolHandler: DummyProtocolSync
) => {
  const array = [];
  array.length = -1; // Created "RangeError: Invalid array length"
  return (prefix: string) => protocolHandler(prefix);
};

export const faultyPlatformAdapterSyncOrAsyncHandlerToAsyncProtocol: DummyPlatformAdapterSyncOrAsyncHandlerToAsyncProtocol = (
  protocolHandler: DummyProtocolAsync
) => {
  const array = [];
  array.length = -1; // Created "RangeError: Invalid array length"
  return async (prefix: string) => await protocolHandler(prefix);
};

export const faultyPlatformAdapterAsyncHandlerToSyncOrAsyncProtocol: DummyPlatformAdapterAsyncHandlerToSyncOrAsyncProtocol = (
  protocolHandler: DummyProtocolSyncOrAsync
) => {
  const array = [];
  array.length = -1; // Created "RangeError: Invalid array length"
  return async (prefix: string) => {
    const coreCode = protocolHandler(prefix);
    return coreCode instanceof Promise ? await coreCode : coreCode;
  };
};
