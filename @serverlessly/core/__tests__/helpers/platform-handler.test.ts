import { PlatformAdapter } from '@serverlessly/core';
import { getPlatformHandler } from '@serverlessly/core/lib/helpers/platform-handler';
import {
  dummyPlatformAdapter01,
  dummyPlatformAdapter02,
  dummyPlatformAdapter12,
  dummyPlatformAdapter21,
  dummyPlatformAdapterAsync,
  dummyPlatformAdapterSync,
  dummyPlatformAdapterSyncOrAsync,
  dummyPlatformAdapterSyncOrAsyncStrict,
  faultyPlatformAdapter01,
  faultyPlatformAdapter02,
  faultyPlatformAdapter12,
  faultyPlatformAdapter21,
  faultyPlatformAdapterAsync,
  faultyPlatformAdapterSync,
  faultyPlatformAdapterSyncOrAsync,
  faultyPlatformAdapterSyncOrAsyncStrict,
} from '../dummies/platform-adapters';

type TestCase = [
  string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  PlatformAdapter<any, any>
];

const healthyTestCases: TestCase[] = [
  ['dummyPlatformAdapterSync', dummyPlatformAdapterSync],
  ['dummyPlatformAdapter01', dummyPlatformAdapter01],
  ['dummyPlatformAdapter02', dummyPlatformAdapter02],
  ['dummyPlatformAdapterAsync', dummyPlatformAdapterAsync],
  ['dummyPlatformAdapter12', dummyPlatformAdapter12],
  ['dummyPlatformAdapter21', dummyPlatformAdapter21],
  ['dummyPlatformAdapterSyncOrAsync', dummyPlatformAdapterSyncOrAsync],
  [
    'dummyPlatformAdapterSyncOrAsyncStrict',
    dummyPlatformAdapterSyncOrAsyncStrict,
  ],
];

const faultyTestCases: TestCase[] = [
  ['faultyPlatformAdapterSync', faultyPlatformAdapterSync],
  ['faultyPlatformAdapter01', faultyPlatformAdapter01],
  ['faultyPlatformAdapter02', faultyPlatformAdapter02],
  ['faultyPlatformAdapterAsync', faultyPlatformAdapterAsync],
  ['faultyPlatformAdapter12', faultyPlatformAdapter12],
  ['faultyPlatformAdapter21', faultyPlatformAdapter21],
  ['faultyPlatformAdapterSyncOrAsync', faultyPlatformAdapterSyncOrAsync],
  [
    'faultyPlatformAdapterSyncOrAsyncStrict',
    faultyPlatformAdapterSyncOrAsyncStrict,
  ],
];

let protocolRequestHandler: jest.Mock;

beforeEach(() => {
  protocolRequestHandler = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe.each(healthyTestCases)(
  'Test with %s Platform Adapter',
  (platformAdapterName, platformAdapter) => {
    test(`getPlatformHandler() does not throw with ${platformAdapterName} Platform Adapter`, () => {
      expect(() => {
        getPlatformHandler(platformAdapter, protocolRequestHandler);
      }).not.toThrow();
    });

    test(`getPlatformHandler() returns correct value with ${platformAdapterName} Platform Adapter`, () => {
      getPlatformHandler(platformAdapter, protocolRequestHandler)('Foo');
      expect(protocolRequestHandler).toBeCalledWith('Foo');
    });
  }
);

describe.each(faultyTestCases)(
  'Test with %s Platform Adapter',
  (platformAdapterName, platformAdapter) => {
    test(`getPlatformHandler() throws with ${platformAdapterName} Platform Adapter`, () => {
      expect(() => {
        getPlatformHandler(platformAdapter, protocolRequestHandler);
      }).toThrow();
    });

    test(`getPlatformHandler() throws correct error with ${platformAdapterName} Platform Adapter`, () => {
      expect(() => {
        getPlatformHandler(platformAdapter, protocolRequestHandler);
      }).toThrow(
        new Error('Faulty Platform Adapter\nRangeError: Invalid array length')
      );
    });
  }
);
