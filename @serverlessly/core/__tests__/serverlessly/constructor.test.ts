import { Serverlessly } from '@serverlessly/core';
import {
  dummyMiddlewareEngineAsync,
  dummyMiddlewareEngineAsyncWithSyncOrAsyncProtocol,
  dummyMiddlewareEngineSync,
  dummyMiddlewareEngineSyncMiddlewareToAsyncProtocol,
  dummyMiddlewareEngineSyncOrAsync,
  dummyMiddlewareEngineSyncWithSyncOrAsyncProtocol,
  ServerlesslyAsync,
  ServerlesslyAsyncToSync,
  ServerlesslySync,
  ServerlesslySyncOrAsync,
  ServerlesslySyncOrAsyncToAsync,
  ServerlesslySyncOrAsyncToSync,
} from '../dummies';

test('Serverlessly instance is successfully created using sync middlewareEngine', () => {
  expect<ServerlesslySync>(
    new Serverlessly({
      middlewareEngine: dummyMiddlewareEngineSync,
    })
  ).toBeTruthy();
});

test('Serverlessly instance is successfully created using async middlewareEngine', () => {
  expect<ServerlesslyAsync>(
    new Serverlessly({
      middlewareEngine: dummyMiddlewareEngineAsync,
    })
  ).toBeTruthy();
});

test('Serverlessly instance is successfully created using sync middlewareEngine which uses async protocol', () => {
  expect<ServerlesslyAsyncToSync>(
    new Serverlessly({
      middlewareEngine: dummyMiddlewareEngineSyncMiddlewareToAsyncProtocol,
    })
  ).toBeTruthy();
});

test('Serverlessly instance is successfully created using sync or async middlewareEngine', () => {
  expect<ServerlesslySyncOrAsync>(
    new Serverlessly({
      middlewareEngine: dummyMiddlewareEngineSyncOrAsync,
    })
  ).toBeTruthy();
});

test('Serverlessly instance is successfully created using sync middlewareEngine which uses sync or async protocol', () => {
  expect<ServerlesslySyncOrAsyncToSync>(
    new Serverlessly({
      middlewareEngine: dummyMiddlewareEngineSyncWithSyncOrAsyncProtocol,
    })
  ).toBeTruthy();
});

test('Serverlessly instance is successfully created using sync middlewareEngine which uses sync or async protocol', () => {
  expect<ServerlesslySyncOrAsyncToAsync>(
    new Serverlessly({
      middlewareEngine: dummyMiddlewareEngineAsyncWithSyncOrAsyncProtocol,
    })
  ).toBeTruthy();
});
