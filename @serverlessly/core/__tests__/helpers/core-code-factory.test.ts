import { MiddlewareEngine } from '@serverlessly/core';
import { getCoreCodeFactory } from '@serverlessly/core/lib/helpers/core-code-factory';
import {
  DummyMiddlewareSync,
  DummyMiddlewareAsync,
  DummyMiddlewareSyncOrAsync,
  dummyMiddlewareEngineSync,
  dummyMiddlewaresSync,
  dummyMiddlewareEngineAsync,
  dummyMiddlewaresAsync,
  dummyMiddlewareEngineSyncMiddlewareToAsyncProtocol,
  dummyMiddlewareEngineSyncOrAsync,
  dummyMiddlewaresSyncOrAsync,
  dummyMiddlewareEngineSyncMiddlewareToSyncOrAsyncProtocol,
  dummyMiddlewareEngineAsyncMiddlewareToSyncOrAsyncProtocol,
  dummyMiddlewareEngineSyncOrAsyncMiddlewareToAsyncProtocol,
  faultyMiddlewareEngineAsync,
  faultyMiddlewareEngineAsyncMiddlewareToSyncOrAsyncProtocol,
  faultyMiddlewareEngineSync,
  faultyMiddlewareEngineSyncMiddlewareToAsyncProtocol,
  faultyMiddlewareEngineSyncMiddlewareToSyncOrAsyncProtocol,
  faultyMiddlewareEngineSyncOrAsync,
  faultyMiddlewareEngineSyncOrAsyncMiddlewareToAsyncProtocol,
} from '../dummies';

type TestCase = [
  string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  MiddlewareEngine<any, any>,
  DummyMiddlewareSync[] | DummyMiddlewareAsync[] | DummyMiddlewareSyncOrAsync[]
];

const healthyTestCases: TestCase[] = [
  [
    'dummyMiddlewareEngineSync',
    dummyMiddlewareEngineSync,
    dummyMiddlewaresSync.slice(0, 2),
  ],
  [
    'dummyMiddlewareEngineAsync',
    dummyMiddlewareEngineAsync,
    dummyMiddlewaresAsync.slice(0, 2),
  ],
  [
    'dummyMiddlewareEngineSyncMiddlewareToAsyncProtocol',
    dummyMiddlewareEngineSyncMiddlewareToAsyncProtocol,
    dummyMiddlewaresSync.slice(0, 2),
  ],
  [
    'dummyMiddlewareEngineSyncOrAsync',
    dummyMiddlewareEngineSyncOrAsync,
    dummyMiddlewaresSyncOrAsync.slice(0, 2),
  ],
  [
    'dummyMiddlewareEngineSyncMiddlewareToSyncOrAsyncProtocol',
    dummyMiddlewareEngineSyncMiddlewareToSyncOrAsyncProtocol,
    dummyMiddlewaresSync.slice(0, 2),
  ],
  [
    'dummyMiddlewareEngineAsyncMiddlewareToSyncOrAsyncProtocol',
    dummyMiddlewareEngineAsyncMiddlewareToSyncOrAsyncProtocol,
    dummyMiddlewaresAsync.slice(0, 2),
  ],
  [
    'dummyMiddlewareEngineSyncOrAsyncMiddlewareToAsyncProtocol',
    dummyMiddlewareEngineSyncOrAsyncMiddlewareToAsyncProtocol,
    dummyMiddlewaresSyncOrAsync.slice(0, 2),
  ],
];

const faultyTestCases: TestCase[] = [
  [
    'faultyMiddlewareEngineSync',
    faultyMiddlewareEngineSync,
    dummyMiddlewaresSync,
  ],
  [
    'faultyMiddlewareEngineAsync',
    faultyMiddlewareEngineAsync,
    dummyMiddlewaresAsync,
  ],
  [
    'faultyMiddlewareEngineSyncMiddlewareToAsyncProtocol',
    faultyMiddlewareEngineSyncMiddlewareToAsyncProtocol,
    dummyMiddlewaresSync,
  ],
  [
    'faultyMiddlewareEngineSyncOrAsync',
    faultyMiddlewareEngineSyncOrAsync,
    dummyMiddlewaresSyncOrAsync,
  ],
  [
    'faultyMiddlewareEngineSyncMiddlewareToSyncOrAsyncProtocol',
    faultyMiddlewareEngineSyncMiddlewareToSyncOrAsyncProtocol,
    dummyMiddlewaresSync,
  ],
  [
    'faultyMiddlewareEngineAsyncMiddlewareToSyncOrAsyncProtocol',
    faultyMiddlewareEngineAsyncMiddlewareToSyncOrAsyncProtocol,
    dummyMiddlewaresAsync,
  ],
  [
    'faultyMiddlewareEngineSyncOrAsyncMiddlewareToAsyncProtocol',
    faultyMiddlewareEngineSyncOrAsyncMiddlewareToAsyncProtocol,
    dummyMiddlewaresSyncOrAsync,
  ],
];

describe.each(healthyTestCases)(
  'Test with %s Middleware Engine',
  (middlewareEngineName, middlewareEngine, middlewares) => {
    test(`getCoreCodeFactory() should not throw with ${middlewareEngineName} Middleware Engine`, () => {
      expect(() => {
        getCoreCodeFactory(middlewareEngine, middlewares);
      }).not.toThrow();
    });

    test(`getCoreCodeFactory() should return correct value with ${middlewareEngineName} Middleware Engine`, () => {
      const coreCode = getCoreCodeFactory(
        middlewareEngine,
        middlewares
      )('Hulk Says:');

      if (coreCode instanceof Promise) {
        expect(coreCode).resolves.toBe('Hulk Says: Hulk Smash');
      } else {
        expect(coreCode).toBe('Hulk Says: Hulk Smash');
      }
    });
  }
);

describe.each(faultyTestCases)(
  'Test with %s Middleware Engine',
  (middlewareEngineName, middlewareEngine, middlewares) => {
    test(`getCoreCodeFactory() should throw with ${middlewareEngineName} Middleware Engine`, () => {
      expect(() => {
        getCoreCodeFactory(middlewareEngine, middlewares);
      }).toThrow();
    });

    test(`getCoreCodeFactory() should throw correct error with ${middlewareEngineName} Middleware Engine`, () => {
      expect(() => {
        getCoreCodeFactory(middlewareEngine, middlewares);
      }).toThrow(
        new Error('Faulty Middleware Engine\nRangeError: Invalid array length')
      );
    });
  }
);
