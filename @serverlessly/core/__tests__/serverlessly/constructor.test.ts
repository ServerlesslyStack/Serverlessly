import { Serverlessly } from '@serverlessly/core';
import {
  dummyMiddlewareEngineAsync,
  dummyMiddlewareEngineAsyncMiddlewareToSyncOrAsyncProtocol,
  dummyMiddlewareEngineSync,
  dummyMiddlewareEngineSyncMiddlewareToAsyncProtocol,
  dummyMiddlewareEngineSyncOrAsync,
  dummyMiddlewareEngineSyncMiddlewareToSyncOrAsyncProtocol,
  ServerlesslyAsync,
  ServerlesslyAsyncToSync,
  ServerlesslySync,
  ServerlesslySyncOrAsync,
  ServerlesslySyncOrAsyncToAsync,
  ServerlesslySyncOrAsyncToSync,
} from '../dummies';

test('Serverlessly instance is successfully created with dummyMiddlewareEngineSync', () => {
  expect<ServerlesslySync>(
    new Serverlessly({
      middlewareEngine: dummyMiddlewareEngineSync,
    })
  ).toBeTruthy();
});

test('Serverlessly instance is successfully created with dummyMiddlewareEngineAsync', () => {
  expect<ServerlesslyAsync>(
    new Serverlessly({
      middlewareEngine: dummyMiddlewareEngineAsync,
    })
  ).toBeTruthy();
});

test('Serverlessly instance is successfully created with dummyMiddlewareEngineSyncMiddlewareToAsyncProtocol', () => {
  expect<ServerlesslyAsyncToSync>(
    new Serverlessly({
      middlewareEngine: dummyMiddlewareEngineSyncMiddlewareToAsyncProtocol,
    })
  ).toBeTruthy();
});

test('Serverlessly instance is successfully created with dummyMiddlewareEngineSyncOrAsync', () => {
  expect<ServerlesslySyncOrAsync>(
    new Serverlessly({
      middlewareEngine: dummyMiddlewareEngineSyncOrAsync,
    })
  ).toBeTruthy();
});

test('Serverlessly instance is successfully created with dummyMiddlewareEngineSyncMiddlewareToSyncOrAsyncProtocol', () => {
  expect<ServerlesslySyncOrAsyncToSync>(
    new Serverlessly({
      middlewareEngine: dummyMiddlewareEngineSyncMiddlewareToSyncOrAsyncProtocol,
    })
  ).toBeTruthy();
});

test('Serverlessly instance is successfully created with dummyMiddlewareEngineAsyncMiddlewareToSyncOrAsyncProtocol', () => {
  expect<ServerlesslySyncOrAsyncToAsync>(
    new Serverlessly({
      middlewareEngine: dummyMiddlewareEngineAsyncMiddlewareToSyncOrAsyncProtocol,
    })
  ).toBeTruthy();
});
