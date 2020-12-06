import { MiddlewareEngine } from '@serverlessly/core';
import {
  DummyMiddlewareSync,
  DummyMiddlewareAsync,
  DummyMiddlewareSyncOrAsync,
} from './middlewares';
import {
  DummyProtocolRequestHandlerSync,
  DummyProtocolRequestHandlerAsync,
  DummyProtocolRequestHandlerSyncOrAsync,
} from './protocol-request-handlers';

// Sync=0 Async=1 SyncOrAsync=2

// Dummy Middleware Engine Interfaces
// 00
export type DummyMiddlewareEngineSync = MiddlewareEngine<
  DummyProtocolRequestHandlerSync,
  DummyMiddlewareSync
>;
// An Impossibility!!!
// export type DummyMiddlewareEngine01 = MiddlewareEngine<
//   DummyProtocolRequestHandlerSync,
//   DummyMiddlewareAsync
// >;
// An Impossibility!!!
// export type DummyMiddlewareEngine02 = MiddlewareEngine<
//   DummyProtocolRequestHandlerSync,
//   DummyMiddlewareSyncOrAsync
// >;
export type DummyMiddlewareEngine10 = MiddlewareEngine<
  DummyProtocolRequestHandlerAsync,
  DummyMiddlewareSync
>;
// 11
export type DummyMiddlewareEngineAsync = MiddlewareEngine<
  DummyProtocolRequestHandlerAsync,
  DummyMiddlewareAsync
>;
export type DummyMiddlewareEngine12 = MiddlewareEngine<
  DummyProtocolRequestHandlerAsync,
  DummyMiddlewareSyncOrAsync
>;
export type DummyMiddlewareEngine20 = MiddlewareEngine<
  DummyProtocolRequestHandlerSyncOrAsync,
  DummyMiddlewareSync
>;
export type DummyMiddlewareEngine21 = MiddlewareEngine<
  DummyProtocolRequestHandlerSyncOrAsync,
  DummyMiddlewareAsync
>;
// 22
export type DummyMiddlewareEngineSyncOrAsync = MiddlewareEngine<
  DummyProtocolRequestHandlerSyncOrAsync,
  DummyMiddlewareSyncOrAsync
>;

// Concrete Dummy Middleware Engines
export const dummyMiddlewareEngineSync: DummyMiddlewareEngineSync = (
  middlewares: DummyMiddlewareSync[]
) => (prefix: string) =>
  middlewares.reduce((acc, current) => acc + ' ' + current(), prefix);

export const dummyMiddlewareEngine10: DummyMiddlewareEngine10 = (
  middlewares: DummyMiddlewareSync[]
) => async (prefix: string) =>
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

export const dummyMiddlewareEngine12: DummyMiddlewareEngine12 = (
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

export const dummyMiddlewareEngine20: DummyMiddlewareEngine20 = (
  middlewares: DummyMiddlewareSync[]
) => (prefix: string) =>
  middlewares.reduce((acc, current) => acc + ' ' + current(), prefix);

export const dummyMiddlewareEngine21: DummyMiddlewareEngine21 = (
  middlewares: DummyMiddlewareAsync[]
) => async (prefix: string) =>
  middlewares.reduce(
    (promiseChain, current) =>
      promiseChain.then((chainResult) =>
        current().then((currentResult) => chainResult + ' ' + currentResult)
      ),
    Promise.resolve(prefix)
  );

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

// Faulty Dummy Middleware Engines
export const faultyMiddlewareEngineSync: DummyMiddlewareEngineSync = (
  middlewares: DummyMiddlewareSync[]
) => {
  const array = [];
  array.length = -1; // Created "RangeError: Invalid array length"
  return (prefix: string) =>
    middlewares.reduce((acc, current) => acc + ' ' + current(), prefix);
};

export const faultyMiddlewareEngine10: DummyMiddlewareEngine10 = (
  middlewares: DummyMiddlewareSync[]
) => {
  const array = [];
  array.length = -1; // Created "RangeError: Invalid array length"
  return async (prefix: string) =>
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

export const faultyMiddlewareEngine12: DummyMiddlewareEngine12 = (
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

export const faultyMiddlewareEngine20: DummyMiddlewareEngine20 = (
  middlewares: DummyMiddlewareSync[]
) => {
  const array = [];
  array.length = -1; // Created "RangeError: Invalid array length"
  return (prefix: string) =>
    middlewares.reduce((acc, current) => acc + ' ' + current(), prefix);
};

export const faultyMiddlewareEngine21: DummyMiddlewareEngine21 = (
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
