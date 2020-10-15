import { Serverlessly } from '@serverlessly/core';
import {
  dummyMiddlewareEngineAsync,
  dummyMiddlewareEngineSync,
  dummyMiddlewareEngineSyncMiddlewareToAsyncProtocol,
  ServerlesslyAsync,
  ServerlesslyAsyncToSync,
  ServerlesslySync,
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
