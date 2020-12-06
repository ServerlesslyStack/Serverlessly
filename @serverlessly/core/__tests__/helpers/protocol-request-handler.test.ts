import { MiddlewareEngine } from '@serverlessly/core';
import { getProtocolRequestHandler } from '@serverlessly/core/lib/helpers/protocol-request-handler';
import {
  dummyMiddlewareEngine10,
  dummyMiddlewareEngine12,
  dummyMiddlewareEngine20,
  dummyMiddlewareEngine21,
  dummyMiddlewareEngineAsync,
  dummyMiddlewareEngineSync,
  dummyMiddlewareEngineSyncOrAsync,
  faultyMiddlewareEngine10,
  faultyMiddlewareEngine12,
  faultyMiddlewareEngine20,
  faultyMiddlewareEngine21,
  faultyMiddlewareEngineAsync,
  faultyMiddlewareEngineSync,
  faultyMiddlewareEngineSyncOrAsync,
} from '../dummies/middleware-engines';
import {
  DummyMiddlewareAsync,
  dummyMiddlewaresAsync,
  dummyMiddlewaresSync,
  dummyMiddlewaresSyncOrAsync,
  DummyMiddlewareSync,
  DummyMiddlewareSyncOrAsync,
} from '../dummies/middlewares';

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
    'dummyMiddlewareEngine10',
    dummyMiddlewareEngine10,
    dummyMiddlewaresSync.slice(0, 2),
  ],
  [
    'dummyMiddlewareEngineAsync',
    dummyMiddlewareEngineAsync,
    dummyMiddlewaresAsync.slice(0, 2),
  ],
  [
    'dummyMiddlewareEngine12',
    dummyMiddlewareEngine12,
    dummyMiddlewaresSyncOrAsync.slice(0, 2),
  ],
  [
    'dummyMiddlewareEngine20',
    dummyMiddlewareEngine20,
    dummyMiddlewaresSync.slice(0, 2),
  ],
  [
    'dummyMiddlewareEngine21',
    dummyMiddlewareEngine21,
    dummyMiddlewaresAsync.slice(0, 2),
  ],
  [
    'dummyMiddlewareEngineSyncOrAsync',
    dummyMiddlewareEngineSyncOrAsync,
    dummyMiddlewaresSyncOrAsync.slice(0, 2),
  ],
];

const faultyTestCases: TestCase[] = [
  [
    'faultyMiddlewareEngineSync',
    faultyMiddlewareEngineSync,
    dummyMiddlewaresSync.slice(0, 2),
  ],
  [
    'faultyMiddlewareEngine10',
    faultyMiddlewareEngine10,
    dummyMiddlewaresSync.slice(0, 2),
  ],
  [
    'faultyMiddlewareEngineAsync',
    faultyMiddlewareEngineAsync,
    dummyMiddlewaresAsync.slice(0, 2),
  ],
  [
    'faultyMiddlewareEngine12',
    faultyMiddlewareEngine12,
    dummyMiddlewaresSyncOrAsync.slice(0, 2),
  ],
  [
    'faultyMiddlewareEngine20',
    faultyMiddlewareEngine20,
    dummyMiddlewaresSync.slice(0, 2),
  ],
  [
    'faultyMiddlewareEngine21',
    faultyMiddlewareEngine21,
    dummyMiddlewaresAsync.slice(0, 2),
  ],
  [
    'faultyMiddlewareEngineSyncOrAsync',
    faultyMiddlewareEngineSyncOrAsync,
    dummyMiddlewaresSyncOrAsync.slice(0, 2),
  ],
];

describe.each(healthyTestCases)(
  'Test with %s Middleware Engine',
  (middlewareEngineName, middlewareEngine, middlewares) => {
    test(`getProtocolRequestHandler() does not throw with ${middlewareEngineName} Middleware Engine`, () => {
      expect(() => {
        getProtocolRequestHandler(middlewareEngine, middlewares);
      }).not.toThrow();
    });

    test(`getProtocolRequestHandler() returns correct value with ${middlewareEngineName} Middleware Engine`, () => {
      const protocolRequestHandler = getProtocolRequestHandler(
        middlewareEngine,
        middlewares
      )('Hulk Says:');

      if (protocolRequestHandler instanceof Promise) {
        expect(protocolRequestHandler).resolves.toBe('Hulk Says: Hulk Smash');
      } else {
        expect(protocolRequestHandler).toBe('Hulk Says: Hulk Smash');
      }
    });
  }
);

describe.each(faultyTestCases)(
  'Test with %s Middleware Engine',
  (middlewareEngineName, middlewareEngine, middlewares) => {
    test(`getProtocolRequestHandler() throws with ${middlewareEngineName} Middleware Engine`, () => {
      expect(() => {
        getProtocolRequestHandler(middlewareEngine, middlewares);
      }).toThrow();
    });

    test(`getProtocolRequestHandler() throws correct error with ${middlewareEngineName} Middleware Engine`, () => {
      expect(() => {
        getProtocolRequestHandler(middlewareEngine, middlewares);
      }).toThrow(
        new Error('Faulty Middleware Engine\nRangeError: Invalid array length')
      );
    });
  }
);
