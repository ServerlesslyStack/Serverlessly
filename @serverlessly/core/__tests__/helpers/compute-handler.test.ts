import { PlatformAdapter, protocolPlatformAdapter } from '@serverlessly/core';
import { computeHandler } from '@serverlessly/core/lib/helpers/compute-handler';
import {
  dummyPlatformAdapterSyncOrAsyncStrict,
  dummyPlatformAdapterSyncOrAsync,
  dummyPlatformAdapterSync,
  dummyPlatformAdapterAsync,
  dummyPlatformAdapterAsyncHandlerToSyncProtocol,
  dummyPlatformAdapterSyncOrAsyncHandlerToSyncProtocol,
  dummyPlatformAdapterSyncOrAsyncHandlerToAsyncProtocol,
  dummyPlatformAdapterAsyncHandlerToSyncOrAsyncProtocol,
  faultyPlatformAdapterAsync,
  faultyPlatformAdapterAsyncHandlerToSyncOrAsyncProtocol,
  faultyPlatformAdapterAsyncHandlerToSyncProtocol,
  faultyPlatformAdapterSync,
  faultyPlatformAdapterSyncOrAsync,
  faultyPlatformAdapterSyncOrAsyncHandlerToAsyncProtocol,
  faultyPlatformAdapterSyncOrAsyncHandlerToSyncProtocol,
  faultyPlatformAdapterSyncOrAsyncStrict,
} from '../dummies';

type TestCase = [
  string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  PlatformAdapter<any, any>
];

const healthyTestCases: TestCase[] = [
  ['protocolPlatformAdapter', protocolPlatformAdapter],
  [
    'dummyPlatformAdapterSyncOrAsyncStrict',
    dummyPlatformAdapterSyncOrAsyncStrict,
  ],
  ['dummyPlatformAdapterSyncOrAsync', dummyPlatformAdapterSyncOrAsync],
  ['dummyPlatformAdapterSync', dummyPlatformAdapterSync],
  ['dummyPlatFormAdapterAsync', dummyPlatformAdapterAsync],
  [
    'dummyPlatformAdapterAsyncHandlerToSyncProtocol',
    dummyPlatformAdapterAsyncHandlerToSyncProtocol,
  ],
  [
    'dummyPlatformAdapterSyncOrAsyncHandlerToSyncProtocol',
    dummyPlatformAdapterSyncOrAsyncHandlerToSyncProtocol,
  ],
  [
    'dummyPlatformAdapterSyncOrAsyncHandlerToAsyncProtocol',
    dummyPlatformAdapterSyncOrAsyncHandlerToAsyncProtocol,
  ],
  [
    'dummyPlatformAdapterAsyncHandlerToSyncOrAsyncProtocol',
    dummyPlatformAdapterAsyncHandlerToSyncOrAsyncProtocol,
  ],
];

const faultyTestCases: TestCase[] = [
  [
    'faultyPlatformAdapterSyncOrAsyncStrict',
    faultyPlatformAdapterSyncOrAsyncStrict,
  ],
  ['faultyPlatformAdapterSyncOrAsync', faultyPlatformAdapterSyncOrAsync],
  ['faultyPlatformAdapterSync', faultyPlatformAdapterSync],
  ['faultyPlatFormAdapterAsync', faultyPlatformAdapterAsync],
  [
    'faultyPlatformAdapterAsyncHandlerToSyncProtocol',
    faultyPlatformAdapterAsyncHandlerToSyncProtocol,
  ],
  [
    'faultyPlatformAdapterSyncOrAsyncHandlerToSyncProtocol',
    faultyPlatformAdapterSyncOrAsyncHandlerToSyncProtocol,
  ],
  [
    'faultyPlatformAdapterSyncOrAsyncHandlerToAsyncProtocol',
    faultyPlatformAdapterSyncOrAsyncHandlerToAsyncProtocol,
  ],
  [
    'faultyPlatformAdapterAsyncHandlerToSyncOrAsyncProtocol',
    faultyPlatformAdapterAsyncHandlerToSyncOrAsyncProtocol,
  ],
];

let coreCodeFactory: jest.Mock;

beforeEach(() => {
  coreCodeFactory = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe.each(healthyTestCases)(
  'Test with %s Platform Adapter',
  (platformAdapterName, platformAdapter) => {
    test(`computeHandler() does not throw with ${platformAdapterName} Platform Handler`, () => {
      expect(() => {
        computeHandler(platformAdapter, coreCodeFactory);
      }).not.toThrow();
    });

    test(`computeHandler() returns correct value with ${platformAdapterName} Platform Handler`, () => {
      computeHandler(platformAdapter, coreCodeFactory)('Foo');
      expect(coreCodeFactory).toBeCalledWith('Foo');
    });
  }
);

describe.each(faultyTestCases)(
  'Test with %s Platform Adapter',
  (platformAdapterName, platformAdapter) => {
    test(`computeHandler() throws with ${platformAdapterName} Platform Handler`, () => {
      expect(() => {
        computeHandler(platformAdapter, coreCodeFactory);
      }).toThrow();
    });

    test(`computeHandler() throws correct error with ${platformAdapterName} Platform Handler`, () => {
      expect(() => {
        computeHandler(platformAdapter, coreCodeFactory);
      }).toThrow(
        new Error('Faulty Platform Adapter\nRangeError: Invalid array length')
      );
    });
  }
);
