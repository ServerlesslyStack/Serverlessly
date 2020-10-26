import { Serverlessly } from '@serverlessly/core';
import {
  DummyHandlerAsync,
  DummyHandlerSync,
  DummyHandlerSyncOrAsync,
  dummyMiddlewareEngineAsync,
  dummyMiddlewareEngineAsyncMiddlewareToSyncOrAsyncProtocol,
  dummyMiddlewareEngineSync,
  dummyMiddlewareEngineSyncMiddlewareToAsyncProtocol,
  dummyMiddlewareEngineSyncOrAsync,
  dummyMiddlewareEngineSyncMiddlewareToSyncOrAsyncProtocol,
  dummyPlatformAdapterAsync,
  dummyPlatformAdapterAsyncHandlerToSyncProtocol,
  dummyPlatformAdapterSync,
  dummyPlatformAdapterSyncOrAsync,
  dummyPlatformAdapterSyncOrAsyncStrict,
  DummyProtocolAsync,
  DummyProtocolSync,
  DummyProtocolSyncOrAsync,
  faultyMiddlewareEngineAsync,
  faultyMiddlewareEngineAsyncMiddlewareToSyncOrAsyncProtocol,
  faultyMiddlewareEngineSync,
  faultyMiddlewareEngineSyncMiddlewareToAsyncProtocol,
  faultyMiddlewareEngineSyncMiddlewareToSyncOrAsyncProtocol,
  faultyMiddlewareEngineSyncOrAsync,
  faultyPlatformAdapterAsync,
  faultyPlatformAdapterAsyncHandlerToSyncProtocol,
  faultyPlatformAdapterSync,
  faultyPlatformAdapterSyncOrAsync,
  faultyPlatformAdapterSyncOrAsyncStrict,
  ServerlesslyAsync,
  ServerlesslyAsyncToSync,
  ServerlesslySync,
  ServerlesslySyncOrAsync,
  ServerlesslySyncOrAsyncToAsync,
  ServerlesslySyncOrAsyncToSync,
} from '../dummies';

describe('No platFormAdapter', () => {
  describe('getHandler() method of ServerlesslySync', () => {
    let serverlessly: ServerlesslySync;
    let logsListener: jest.Mock;
    let errorListener: jest.Mock;

    beforeEach(() => {
      serverlessly = new Serverlessly({
        middlewareEngine: dummyMiddlewareEngineSync,
      });
      logsListener = jest.fn();
      errorListener = jest.fn();
    });

    test('getHandler() throws error if no middleware is found', () => {
      expect(() => {
        serverlessly.getHandler();
      }).toThrowError();
    });

    test('getHandler() throws correct error if no middleware is found & no ERROR event handler is attached', () => {
      expect(() => {
        serverlessly.getHandler();
      }).toThrow(new Error('No Middleware Found'));
    });

    test('getHandler() throws & emits correct error if no middleware is found, but ERROR event handler is attached', () => {
      expect(() => {
        serverlessly.on('ERROR', errorListener).getHandler();
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(new Error('No Middleware Found'));
    });

    test('getHandler() returns handler of correct type', () => {
      expect<DummyProtocolSync>(serverlessly.pipe(() => 'Foo').getHandler());
    });

    test('getHandler() returns correct handler', () => {
      expect(
        serverlessly
          .pipe(
            () => 'Hulk',
            () => 'Smash'
          )
          .getHandler()('Hulk Says:')
      ).toBe('Hulk Says: Hulk Smash');
    });

    test('getHandler() emits logs twice when it encounters no error', () => {
      serverlessly
        .pipe(() => 'Foo')
        .on('LOG', logsListener)
        .getHandler();

      expect(logsListener).toBeCalledTimes(2);
    });

    test('getHandler() emits correct logs when it encounters no error', () => {
      serverlessly
        .pipe(
          () => 'Foo',
          () => 'Bar'
        )
        .on('LOG', logsListener)
        .getHandler();

      expect(logsListener).nthCalledWith(1, 'getHandler: 2 middlewares found');
      expect(logsListener).nthCalledWith(
        2,
        'getHandler: Platform Adapter not found.. using default protocol adapter provided by Middleware Engine'
      );
    });

    test('getHandler() throws error if middlewareEngine throws or encounters error', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineSync })
          .pipe(() => 'Foo')
          .getHandler();
      }).toThrowError();
    });

    test('getHandler() throws correct error if middlewareEngine throws or encounters error & there is no ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineSync })
          .pipe(() => 'Foo')
          .getHandler();
      }).toThrow(
        new Error(
          'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
        )
      );
    });

    test('getHandler() throws and emits correct error if middlewareEngine throws or encounters error & there is an ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineSync })
          .on('ERROR', errorListener)
          .pipe(() => 'Foo')
          .getHandler();
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(
        new Error('Faulty Middleware Engine\nRangeError: Invalid array length')
      );
    });
  });

  describe('getHandler() method of ServerlesslyAsync', () => {
    let serverlessly: ServerlesslyAsync;
    let logsListener: jest.Mock;
    let errorListener: jest.Mock;

    beforeEach(() => {
      serverlessly = new Serverlessly({
        middlewareEngine: dummyMiddlewareEngineAsync,
      });
      logsListener = jest.fn();
      errorListener = jest.fn();
    });

    test('getHandler() throws error if no middleware is found', () => {
      expect(() => {
        serverlessly.getHandler();
      }).toThrowError();
    });

    test('getHandler() throws correct error if no middleware is found & no ERROR event handler is attached', () => {
      expect(() => {
        serverlessly.getHandler();
      }).toThrow(new Error('No Middleware Found'));
    });

    test('getHandler() throws & emits correct error if no middleware is found, but ERROR event handler is attached', () => {
      expect(() => {
        serverlessly.on('ERROR', errorListener).getHandler();
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(new Error('No Middleware Found'));
    });

    test('getHandler() returns handler of correct type', () => {
      expect<DummyProtocolAsync>(
        serverlessly.pipe(async () => 'Foo').getHandler()
      );
    });

    test('getHandler() returns correct handler', () => {
      expect(
        serverlessly
          .pipe(
            async () => 'Hulk',
            async () => 'Smash'
          )
          .getHandler()('Hulk Says:')
      ).resolves.toBe('Hulk Says: Hulk Smash');
    });

    test('getHandler() emits logs twice when it encounters no error', () => {
      serverlessly
        .pipe(async () => 'Foo')
        .on('LOG', logsListener)
        .getHandler();

      expect(logsListener).toBeCalledTimes(2);
    });

    test('getHandler() emits correct logs when it encounters no error', () => {
      serverlessly
        .pipe(
          async () => 'Foo',
          async () => 'Bar'
        )
        .on('LOG', logsListener)
        .getHandler();

      expect(logsListener).nthCalledWith(1, 'getHandler: 2 middlewares found');
      expect(logsListener).nthCalledWith(
        2,
        'getHandler: Platform Adapter not found.. using default protocol adapter provided by Middleware Engine'
      );
    });

    test('getHandler() throws error if middlewareEngine throws or encounters error', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineAsync })
          .pipe(async () => 'Foo')
          .getHandler();
      }).toThrowError();
    });

    test('getHandler() throws correct error if middlewareEngine throws or encounters error & there is no ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineAsync })
          .pipe(async () => 'Foo')
          .getHandler();
      }).toThrow(
        new Error(
          'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
        )
      );
    });

    test('getHandler() throws and emits correct error if middlewareEngine throws or encounters error & there is an ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineAsync })
          .on('ERROR', errorListener)
          .pipe(async () => 'Foo')
          .getHandler();
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(
        new Error('Faulty Middleware Engine\nRangeError: Invalid array length')
      );
    });
  });

  describe('getHandler() method of ServerlesslyAsyncToSync', () => {
    let serverlessly: ServerlesslyAsyncToSync;
    let logsListener: jest.Mock;
    let errorListener: jest.Mock;

    beforeEach(() => {
      serverlessly = new Serverlessly({
        middlewareEngine: dummyMiddlewareEngineSyncMiddlewareToAsyncProtocol,
      });
      logsListener = jest.fn();
      errorListener = jest.fn();
    });

    test('getHandler() throws error if no middleware is found', () => {
      expect(() => {
        serverlessly.getHandler();
      }).toThrowError();
    });

    test('getHandler() throws correct error if no middleware is found & no ERROR event handler is attached', () => {
      expect(() => {
        serverlessly.getHandler();
      }).toThrow(new Error('No Middleware Found'));
    });

    test('getHandler() throws & emits correct error if no middleware is found, but ERROR event handler is attached', () => {
      expect(() => {
        serverlessly.on('ERROR', errorListener).getHandler();
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(new Error('No Middleware Found'));
    });

    test('getHandler() returns handler of correct type', () => {
      expect<DummyProtocolAsync>(serverlessly.pipe(() => 'Foo').getHandler());
    });

    test('getHandler() returns correct handler', () => {
      expect(
        serverlessly
          .pipe(
            () => 'Hulk',
            () => 'Smash'
          )
          .getHandler()('Hulk Says:')
      ).resolves.toBe('Hulk Says: Hulk Smash');
    });

    test('getHandler() emits logs twice when it encounters no error', () => {
      serverlessly
        .pipe(() => 'Foo')
        .on('LOG', logsListener)
        .getHandler();

      expect(logsListener).toBeCalledTimes(2);
    });

    test('getHandler() emits correct logs when it encounters no error', () => {
      serverlessly
        .pipe(
          () => 'Foo',
          () => 'Bar'
        )
        .on('LOG', logsListener)
        .getHandler();

      expect(logsListener).nthCalledWith(1, 'getHandler: 2 middlewares found');
      expect(logsListener).nthCalledWith(
        2,
        'getHandler: Platform Adapter not found.. using default protocol adapter provided by Middleware Engine'
      );
    });

    test('getHandler() throws error if middlewareEngine throws or encounters error', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSyncMiddlewareToAsyncProtocol,
        })
          .pipe(() => 'Foo')
          .getHandler();
      }).toThrowError();
    });

    test('getHandler() throws correct error if middlewareEngine throws or encounters error & there is no ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSyncMiddlewareToAsyncProtocol,
        })
          .pipe(() => 'Foo')
          .getHandler();
      }).toThrow(
        new Error(
          'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
        )
      );
    });

    test('getHandler() throws and emits correct error if middlewareEngine throws or encounters error & there is an ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSyncMiddlewareToAsyncProtocol,
        })
          .on('ERROR', errorListener)
          .pipe(() => 'Foo')
          .getHandler();
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(
        new Error('Faulty Middleware Engine\nRangeError: Invalid array length')
      );
    });
  });

  describe('getHandler() method of ServerlesslySyncOrAsync', () => {
    let serverlessly: ServerlesslySyncOrAsync;
    let logsListener: jest.Mock;
    let errorListener: jest.Mock;

    beforeEach(() => {
      serverlessly = new Serverlessly({
        middlewareEngine: dummyMiddlewareEngineSyncOrAsync,
      });
      logsListener = jest.fn();
      errorListener = jest.fn();
    });

    test('getHandler() throws error if no middleware is found', () => {
      expect(() => {
        serverlessly.getHandler();
      }).toThrowError();
    });

    test('getHandler() throws correct error if no middleware is found & no ERROR event handler is attached', () => {
      expect(() => {
        serverlessly.getHandler();
      }).toThrow(new Error('No Middleware Found'));
    });

    test('getHandler() throws & emits correct error if no middleware is found, but ERROR event handler is attached', () => {
      expect(() => {
        serverlessly.on('ERROR', errorListener).getHandler();
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(new Error('No Middleware Found'));
    });

    test('getHandler() returns handler of correct type', () => {
      expect<DummyProtocolSyncOrAsync>(
        serverlessly
          .pipe(
            async () => 'Foo',
            () => 'Bar'
          )
          .getHandler()
      );
    });

    test('getHandler() returns correct handler', () => {
      expect(
        serverlessly
          .pipe(
            async () => 'Hulk',
            () => 'Smash',
            () => Promise.resolve('!!!')
          )
          .getHandler()('Hulk Says:')
      ).resolves.toBe('Hulk Says: Hulk Smash !!!');
    });

    test('getHandler() emits logs twice when it encounters no error', () => {
      serverlessly
        .pipe(() => 'Foo')
        .on('LOG', logsListener)
        .getHandler();

      expect(logsListener).toBeCalledTimes(2);
    });

    test('getHandler() emits correct logs when it encounters no error', () => {
      serverlessly
        .pipe(
          () => 'Foo',
          () => 'Bar'
        )
        .on('LOG', logsListener)
        .getHandler();

      expect(logsListener).nthCalledWith(1, 'getHandler: 2 middlewares found');
      expect(logsListener).nthCalledWith(
        2,
        'getHandler: Platform Adapter not found.. using default protocol adapter provided by Middleware Engine'
      );
    });

    test('getHandler() throws error if middlewareEngine throws or encounters error', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSyncOrAsync,
        })
          .pipe(async () => 'Foo')
          .getHandler();
      }).toThrowError();
    });

    test('getHandler() throws correct error if middlewareEngine throws or encounters error & there is no ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSyncOrAsync,
        })
          .pipe(() => 'Foo')
          .getHandler();
      }).toThrow(
        new Error(
          'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
        )
      );
    });

    test('getHandler() throws and emits correct error if middlewareEngine throws or encounters error & there is an ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSyncOrAsync,
        })
          .on('ERROR', errorListener)
          .pipe(() => 'Foo')
          .getHandler();
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(
        new Error('Faulty Middleware Engine\nRangeError: Invalid array length')
      );
    });
  });

  describe('getHandler() method of ServerlesslySyncOrAsyncToSync', () => {
    let serverlessly: ServerlesslySyncOrAsyncToSync;
    let logsListener: jest.Mock;
    let errorListener: jest.Mock;

    beforeEach(() => {
      serverlessly = new Serverlessly({
        middlewareEngine: dummyMiddlewareEngineSyncMiddlewareToSyncOrAsyncProtocol,
      });
      logsListener = jest.fn();
      errorListener = jest.fn();
    });

    test('getHandler() throws error if no middleware is found', () => {
      expect(() => {
        serverlessly.getHandler();
      }).toThrowError();
    });

    test('getHandler() throws correct error if no middleware is found & no ERROR event handler is attached', () => {
      expect(() => {
        serverlessly.getHandler();
      }).toThrow(new Error('No Middleware Found'));
    });

    test('getHandler() throws & emits correct error if no middleware is found, but ERROR event handler is attached', () => {
      expect(() => {
        serverlessly.on('ERROR', errorListener).getHandler();
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(new Error('No Middleware Found'));
    });

    test('getHandler() returns handler of correct type', () => {
      expect<DummyProtocolSyncOrAsync>(
        serverlessly.pipe(() => 'Foo').getHandler()
      );
    });

    test('getHandler() returns correct handler', () => {
      expect(
        serverlessly
          .pipe(
            () => 'Hulk',
            () => 'Smash'
          )
          .getHandler()('Hulk Says:')
      ).toBe('Hulk Says: Hulk Smash');
    });

    test('getHandler() emits logs twice when it encounters no error', () => {
      serverlessly
        .pipe(() => 'Foo')
        .on('LOG', logsListener)
        .getHandler();

      expect(logsListener).toBeCalledTimes(2);
    });

    test('getHandler() emits correct logs when it encounters no error', () => {
      serverlessly
        .pipe(
          () => 'Foo',
          () => 'Bar'
        )
        .on('LOG', logsListener)
        .getHandler();

      expect(logsListener).nthCalledWith(1, 'getHandler: 2 middlewares found');
      expect(logsListener).nthCalledWith(
        2,
        'getHandler: Platform Adapter not found.. using default protocol adapter provided by Middleware Engine'
      );
    });

    test('getHandler() throws error if middlewareEngine throws or encounters error', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSyncMiddlewareToSyncOrAsyncProtocol,
        })
          .pipe(() => 'Foo')
          .getHandler();
      }).toThrowError();
    });

    test('getHandler() throws correct error if middlewareEngine throws or encounters error & there is no ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSyncMiddlewareToSyncOrAsyncProtocol,
        })
          .pipe(() => 'Foo')
          .getHandler();
      }).toThrow(
        new Error(
          'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
        )
      );
    });

    test('getHandler() throws and emits correct error if middlewareEngine throws or encounters error & there is an ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSyncMiddlewareToSyncOrAsyncProtocol,
        })
          .on('ERROR', errorListener)
          .pipe(() => 'Foo')
          .getHandler();
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(
        new Error('Faulty Middleware Engine\nRangeError: Invalid array length')
      );
    });
  });

  describe('getHandler() method of ServerlesslySyncOrAsyncToAsync', () => {
    let serverlessly: ServerlesslySyncOrAsyncToAsync;
    let logsListener: jest.Mock;
    let errorListener: jest.Mock;

    beforeEach(() => {
      serverlessly = new Serverlessly({
        middlewareEngine: dummyMiddlewareEngineAsyncMiddlewareToSyncOrAsyncProtocol,
      });
      logsListener = jest.fn();
      errorListener = jest.fn();
    });

    test('getHandler() throws error if no middleware is found', () => {
      expect(() => {
        serverlessly.getHandler();
      }).toThrowError();
    });

    test('getHandler() throws correct error if no middleware is found & no ERROR event handler is attached', () => {
      expect(() => {
        serverlessly.getHandler();
      }).toThrow(new Error('No Middleware Found'));
    });

    test('getHandler() throws & emits correct error if no middleware is found, but ERROR event handler is attached', () => {
      expect(() => {
        serverlessly.on('ERROR', errorListener).getHandler();
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(new Error('No Middleware Found'));
    });

    test('getHandler() returns handler of correct type', () => {
      expect<DummyProtocolSyncOrAsync>(
        serverlessly.pipe(async () => 'Foo').getHandler()
      );
    });

    test('getHandler() returns correct handler', () => {
      expect(
        serverlessly
          .pipe(
            async () => 'Hulk',
            async () => 'Smash'
          )
          .getHandler()('Hulk Says:')
      ).resolves.toBe('Hulk Says: Hulk Smash');
    });

    test('getHandler() emits logs twice when it encounters no error', () => {
      serverlessly
        .pipe(async () => 'Foo')
        .on('LOG', logsListener)
        .getHandler();

      expect(logsListener).toBeCalledTimes(2);
    });

    test('getHandler() emits correct logs when it encounters no error', () => {
      serverlessly
        .pipe(
          async () => 'Foo',
          async () => 'Bar'
        )
        .on('LOG', logsListener)
        .getHandler();

      expect(logsListener).nthCalledWith(1, 'getHandler: 2 middlewares found');
      expect(logsListener).nthCalledWith(
        2,
        'getHandler: Platform Adapter not found.. using default protocol adapter provided by Middleware Engine'
      );
    });

    test('getHandler() throws error if middlewareEngine throws or encounters error', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineAsyncMiddlewareToSyncOrAsyncProtocol,
        })
          .pipe(async () => 'Foo')
          .getHandler();
      }).toThrowError();
    });

    test('getHandler() throws correct error if middlewareEngine throws or encounters error & there is no ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineAsyncMiddlewareToSyncOrAsyncProtocol,
        })
          .pipe(async () => 'Foo')
          .getHandler();
      }).toThrow(
        new Error(
          'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
        )
      );
    });

    test('getHandler() throws and emits correct error if middlewareEngine throws or encounters error & there is an ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineAsyncMiddlewareToSyncOrAsyncProtocol,
        })
          .on('ERROR', errorListener)
          .pipe(async () => 'Foo')
          .getHandler();
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(
        new Error('Faulty Middleware Engine\nRangeError: Invalid array length')
      );
    });
  });
});

describe('dummyPlatFormAdapterSync', () => {
  // dummyPlatformAdapterSync isn't compatible with ServerlesslyAsync, ServerlesslyAsyncToSync, ServerlesslySyncOrAsync, ServerlesslySyncOrAsyncToSync & ServerlesslySyncOrAsyncToAsync
  // Reason: Protocol Incompatibility

  describe('getHandler() method of ServerlesslySync', () => {
    let serverlessly: ServerlesslySync;
    let logsListener: jest.Mock;
    let errorListener: jest.Mock;

    beforeEach(() => {
      serverlessly = new Serverlessly({
        middlewareEngine: dummyMiddlewareEngineSync,
      });
      logsListener = jest.fn();
      errorListener = jest.fn();
    });

    test('getHandler() throws error if no middleware is found', () => {
      expect(() => {
        serverlessly.getHandler({ platformAdapter: dummyPlatformAdapterSync });
      }).toThrowError();
    });

    test('getHandler() throws correct error if no middleware is found & no ERROR event handler is attached', () => {
      expect(() => {
        serverlessly.getHandler({ platformAdapter: dummyPlatformAdapterSync });
      }).toThrow(new Error('No Middleware Found'));
    });

    test('getHandler() throws & emits correct error if no middleware is found, but ERROR event handler is attached', () => {
      expect(() => {
        serverlessly
          .on('ERROR', errorListener)
          .getHandler({ platformAdapter: dummyPlatformAdapterSync });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(new Error('No Middleware Found'));
    });

    test('getHandler() returns handler of correct type', () => {
      expect<DummyHandlerSync>(
        serverlessly
          .pipe(() => 'Foo')
          .getHandler({ platformAdapter: dummyPlatformAdapterSync })
      );
    });

    test('getHandler() returns correct handler', () => {
      expect(
        serverlessly
          .pipe(
            () => 'Hulk',
            () => 'Smash'
          )
          .getHandler({ platformAdapter: dummyPlatformAdapterSync })(
          'Hulk Says:'
        )
      ).toBe('Hulk Says: Hulk Smash');
    });

    test('getHandler() emits logs twice when it encounters no error', () => {
      serverlessly
        .pipe(() => 'Foo')
        .on('LOG', logsListener)
        .getHandler({ platformAdapter: dummyPlatformAdapterSync });

      expect(logsListener).toBeCalledTimes(2);
    });

    test('getHandler() emits correct logs when it encounters no error', () => {
      serverlessly
        .pipe(
          () => 'Foo',
          () => 'Bar'
        )
        .on('LOG', logsListener)
        .getHandler({ platformAdapter: dummyPlatformAdapterSync });

      expect(logsListener).nthCalledWith(1, 'getHandler: 2 middlewares found');
      expect(logsListener).nthCalledWith(
        2,
        'getHandler: Platform Adapter found'
      );
    });

    test('getHandler() throws error if middlewareEngine throws or encounters error', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineSync })
          .pipe(() => 'Foo')
          .getHandler({ platformAdapter: dummyPlatformAdapterSync });
      }).toThrowError();
    });

    test('getHandler() throws correct error if middlewareEngine throws or encounters error & there is no ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineSync })
          .pipe(() => 'Foo')
          .getHandler({ platformAdapter: dummyPlatformAdapterSync });
      }).toThrow(
        new Error(
          'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
        )
      );
    });

    test('getHandler() throws and emits correct error if middlewareEngine throws or encounters error & there is an ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineSync })
          .on('ERROR', errorListener)
          .pipe(() => 'Foo')
          .getHandler({ platformAdapter: dummyPlatformAdapterSync });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(
        new Error('Faulty Middleware Engine\nRangeError: Invalid array length')
      );
    });

    test('getHandler() throws error if platformAdapter throws or encounters error', () => {
      expect(() => {
        serverlessly
          .pipe(() => 'Foo')
          .getHandler({ platformAdapter: faultyPlatformAdapterSync });
      }).toThrowError();
    });

    test('getHandler() throws correct error if platformAdapter throws or encounters error & there is no ERROR event listener attached', () => {
      expect(() => {
        serverlessly
          .pipe(() => 'Foo')
          .getHandler({ platformAdapter: faultyPlatformAdapterSync });
      }).toThrow(
        new Error(
          'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
        )
      );
    });

    test('getHandler() throws and emits correct error if platformAdapter throws or encounters error & there is an ERROR event listener attached', () => {
      expect(() => {
        serverlessly
          .on('ERROR', errorListener)
          .pipe(() => 'Foo')
          .getHandler({ platformAdapter: faultyPlatformAdapterSync });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(
        new Error('Faulty Platform Adapter\nRangeError: Invalid array length')
      );
    });

    test('getHandler() throws error if both middlewareEngine and platformAdapter throws or encounters error', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineSync })
          .pipe(() => 'Foo')
          .getHandler({ platformAdapter: faultyPlatformAdapterSync });
      }).toThrowError();
    });

    test('getHandler() throws correct error if both middlewareEngine and platformAdapter throws or encounters error & there is no ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineSync })
          .pipe(() => 'Foo')
          .getHandler({ platformAdapter: faultyPlatformAdapterSync });
      }).toThrow(
        new Error(
          'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
        )
      );
    });

    test('getHandler() throws and emits correct error if both middlewareEngine and platformAdapter throws or encounters error & there is an ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineSync })
          .on('ERROR', errorListener)
          .pipe(() => 'Foo')
          .getHandler({ platformAdapter: faultyPlatformAdapterSync });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(
        new Error('Faulty Middleware Engine\nRangeError: Invalid array length')
      );
    });
  });
});

describe('dummyPlatFormAdapterAsync', () => {
  // dummyPlatformAdapterAsync isn't compatible with ServerlesslySync, ServerlesslySyncOrAsync, ServerlesslySyncOrAsyncToSync & ServerlesslySyncOrAsyncToAsync
  // Reason: Protocol Incompatibility

  describe('getHandler() method of ServerlesslyAsync', () => {
    let serverlessly: ServerlesslyAsync;
    let logsListener: jest.Mock;
    let errorListener: jest.Mock;

    beforeEach(() => {
      serverlessly = new Serverlessly({
        middlewareEngine: dummyMiddlewareEngineAsync,
      });
      logsListener = jest.fn();
      errorListener = jest.fn();
    });

    test('getHandler() throws error if no middleware is found', () => {
      expect(() => {
        serverlessly.getHandler({ platformAdapter: dummyPlatformAdapterAsync });
      }).toThrowError();
    });

    test('getHandler() throws correct error if no middleware is found & no ERROR event handler is attached', () => {
      expect(() => {
        serverlessly.getHandler({ platformAdapter: dummyPlatformAdapterAsync });
      }).toThrow(new Error('No Middleware Found'));
    });

    test('getHandler() throws & emits correct error if no middleware is found, but ERROR event handler is attached', () => {
      expect(() => {
        serverlessly
          .on('ERROR', errorListener)
          .getHandler({ platformAdapter: dummyPlatformAdapterAsync });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(new Error('No Middleware Found'));
    });

    test('getHandler() returns handler of correct type', () => {
      expect<DummyHandlerAsync>(
        serverlessly
          .pipe(async () => 'Foo')
          .getHandler({ platformAdapter: dummyPlatformAdapterAsync })
      );
    });

    test('getHandler() returns correct handler', () => {
      expect(
        serverlessly
          .pipe(
            async () => 'Hulk',
            async () => 'Smash'
          )
          .getHandler({ platformAdapter: dummyPlatformAdapterAsync })(
          'Hulk Says:'
        )
      ).resolves.toBe('Hulk Says: Hulk Smash');
    });

    test('getHandler() emits logs twice when it encounters no error', () => {
      serverlessly
        .pipe(async () => 'Foo')
        .on('LOG', logsListener)
        .getHandler({ platformAdapter: dummyPlatformAdapterAsync });

      expect(logsListener).toBeCalledTimes(2);
    });

    test('getHandler() emits correct logs when it encounters no error', () => {
      serverlessly
        .pipe(
          async () => 'Foo',
          async () => 'Bar'
        )
        .on('LOG', logsListener)
        .getHandler({ platformAdapter: dummyPlatformAdapterAsync });

      expect(logsListener).nthCalledWith(1, 'getHandler: 2 middlewares found');
      expect(logsListener).nthCalledWith(
        2,
        'getHandler: Platform Adapter found'
      );
    });

    test('getHandler() throws error if middlewareEngine throws or encounters error', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineAsync })
          .pipe(async () => 'Foo')
          .getHandler({ platformAdapter: dummyPlatformAdapterAsync });
      }).toThrowError();
    });

    test('getHandler() throws correct error if middlewareEngine throws or encounters error & there is no ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineAsync })
          .pipe(async () => 'Foo')
          .getHandler({ platformAdapter: dummyPlatformAdapterAsync });
      }).toThrow(
        new Error(
          'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
        )
      );
    });

    test('getHandler() throws and emits correct error if middlewareEngine throws or encounters error & there is an ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineAsync })
          .on('ERROR', errorListener)
          .pipe(async () => 'Foo')
          .getHandler({ platformAdapter: dummyPlatformAdapterAsync });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(
        new Error('Faulty Middleware Engine\nRangeError: Invalid array length')
      );
    });

    test('getHandler() throws error if platformAdapter throws or encounters error', () => {
      expect(() => {
        serverlessly
          .pipe(async () => 'Foo')
          .getHandler({ platformAdapter: faultyPlatformAdapterAsync });
      }).toThrowError();
    });

    test('getHandler() throws correct error if platformAdapter throws or encounters error & there is no ERROR event listener attached', () => {
      expect(() => {
        serverlessly
          .pipe(async () => 'Foo')
          .getHandler({ platformAdapter: faultyPlatformAdapterAsync });
      }).toThrow(
        new Error(
          'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
        )
      );
    });

    test('getHandler() throws and emits correct error if platformAdapter throws or encounters error & there is an ERROR event listener attached', () => {
      expect(() => {
        serverlessly
          .on('ERROR', errorListener)
          .pipe(async () => 'Foo')
          .getHandler({ platformAdapter: faultyPlatformAdapterAsync });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(
        new Error('Faulty Platform Adapter\nRangeError: Invalid array length')
      );
    });

    test('getHandler() throws error if both middlewareEngine and platformAdapter throws or encounters error', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineAsync })
          .pipe(async () => 'Foo')
          .getHandler({ platformAdapter: faultyPlatformAdapterAsync });
      }).toThrowError();
    });

    test('getHandler() throws correct error if both middlewareEngine and platformAdapter throws or encounters error & there is no ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineAsync })
          .pipe(async () => 'Foo')
          .getHandler({ platformAdapter: faultyPlatformAdapterAsync });
      }).toThrow(
        new Error(
          'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
        )
      );
    });

    test('getHandler() throws and emits correct error if both middlewareEngine and platformAdapter throws or encounters error & there is an ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineAsync })
          .on('ERROR', errorListener)
          .pipe(async () => 'Foo')
          .getHandler({ platformAdapter: faultyPlatformAdapterAsync });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(
        new Error('Faulty Middleware Engine\nRangeError: Invalid array length')
      );
    });
  });

  describe('getHandler() method of ServerlesslyAsyncToSync', () => {
    let serverlessly: ServerlesslyAsyncToSync;
    let logsListener: jest.Mock;
    let errorListener: jest.Mock;

    beforeEach(() => {
      serverlessly = new Serverlessly({
        middlewareEngine: dummyMiddlewareEngineSyncMiddlewareToAsyncProtocol,
      });
      logsListener = jest.fn();
      errorListener = jest.fn();
    });

    test('getHandler() throws error if no middleware is found', () => {
      expect(() => {
        serverlessly.getHandler({ platformAdapter: dummyPlatformAdapterAsync });
      }).toThrowError();
    });

    test('getHandler() throws correct error if no middleware is found & no ERROR event handler is attached', () => {
      expect(() => {
        serverlessly.getHandler({ platformAdapter: dummyPlatformAdapterAsync });
      }).toThrow(new Error('No Middleware Found'));
    });

    test('getHandler() throws & emits correct error if no middleware is found, but ERROR event handler is attached', () => {
      expect(() => {
        serverlessly
          .on('ERROR', errorListener)
          .getHandler({ platformAdapter: dummyPlatformAdapterAsync });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(new Error('No Middleware Found'));
    });

    test('getHandler() returns handler of correct type', () => {
      expect<DummyHandlerAsync>(
        serverlessly
          .pipe(() => 'Foo')
          .getHandler({ platformAdapter: dummyPlatformAdapterAsync })
      );
    });

    test('getHandler() returns correct handler', () => {
      expect(
        serverlessly
          .pipe(
            () => 'Hulk',
            () => 'Smash'
          )
          .getHandler({ platformAdapter: dummyPlatformAdapterAsync })(
          'Hulk Says:'
        )
      ).resolves.toBe('Hulk Says: Hulk Smash');
    });

    test('getHandler() emits logs twice when it encounters no error', () => {
      serverlessly
        .pipe(() => 'Foo')
        .on('LOG', logsListener)
        .getHandler({ platformAdapter: dummyPlatformAdapterAsync });

      expect(logsListener).toBeCalledTimes(2);
    });

    test('getHandler() emits correct logs when it encounters no error', () => {
      serverlessly
        .pipe(
          () => 'Foo',
          () => 'Bar'
        )
        .on('LOG', logsListener)
        .getHandler({ platformAdapter: dummyPlatformAdapterAsync });

      expect(logsListener).nthCalledWith(1, 'getHandler: 2 middlewares found');
      expect(logsListener).nthCalledWith(
        2,
        'getHandler: Platform Adapter found'
      );
    });

    test('getHandler() throws error if middlewareEngine throws or encounters error', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSyncMiddlewareToAsyncProtocol,
        })
          .pipe(() => 'Foo')
          .getHandler({ platformAdapter: dummyPlatformAdapterAsync });
      }).toThrowError();
    });

    test('getHandler() throws correct error if middlewareEngine throws or encounters error & there is no ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSyncMiddlewareToAsyncProtocol,
        })
          .pipe(() => 'Foo')
          .getHandler({ platformAdapter: dummyPlatformAdapterAsync });
      }).toThrow(
        new Error(
          'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
        )
      );
    });

    test('getHandler() throws and emits correct error if middlewareEngine throws or encounters error & there is an ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSyncMiddlewareToAsyncProtocol,
        })
          .on('ERROR', errorListener)
          .pipe(() => 'Foo')
          .getHandler({ platformAdapter: dummyPlatformAdapterAsync });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(
        new Error('Faulty Middleware Engine\nRangeError: Invalid array length')
      );
    });

    test('getHandler() throws error if platformAdapter throws or encounters error', () => {
      expect(() => {
        serverlessly
          .pipe(() => 'Foo')
          .getHandler({ platformAdapter: faultyPlatformAdapterAsync });
      }).toThrowError();
    });

    test('getHandler() throws correct error if platformAdapter throws or encounters error & there is no ERROR event listener attached', () => {
      expect(() => {
        serverlessly
          .pipe(() => 'Foo')
          .getHandler({ platformAdapter: faultyPlatformAdapterAsync });
      }).toThrow(
        new Error(
          'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
        )
      );
    });

    test('getHandler() throws and emits correct error if platformAdapter throws or encounters error & there is an ERROR event listener attached', () => {
      expect(() => {
        serverlessly
          .on('ERROR', errorListener)
          .pipe(() => 'Foo')
          .getHandler({ platformAdapter: faultyPlatformAdapterAsync });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(
        new Error('Faulty Platform Adapter\nRangeError: Invalid array length')
      );
    });

    test('getHandler() throws error if both middlewareEngine and platformAdapter throws or encounters error', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSyncMiddlewareToAsyncProtocol,
        })
          .pipe(() => 'Foo')
          .getHandler({ platformAdapter: faultyPlatformAdapterAsync });
      }).toThrowError();
    });

    test('getHandler() throws correct error if both middlewareEngine and platformAdapter throws or encounters error & there is no ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSyncMiddlewareToAsyncProtocol,
        })
          .pipe(() => 'Foo')
          .getHandler({ platformAdapter: faultyPlatformAdapterAsync });
      }).toThrow(
        new Error(
          'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
        )
      );
    });

    test('getHandler() throws and emits correct error if both middlewareEngine and platformAdapter throws or encounters error & there is an ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSyncMiddlewareToAsyncProtocol,
        })
          .on('ERROR', errorListener)
          .pipe(() => 'Foo')
          .getHandler({ platformAdapter: faultyPlatformAdapterAsync });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(
        new Error('Faulty Middleware Engine\nRangeError: Invalid array length')
      );
    });
  });
});

describe('dummyPlatformAdapterAsyncHandlerToSyncProtocol', () => {
  // dummyPlatformAdapterAsyncHanderToSyncProtocol isn't compatible with ServerlesslyAsync, ServerlesslyAsyncToSync, ServerlesslySyncOrAsync, ServerlesslySyncOrAsyncToSync & ServerlesslySyncOrAsyncToAsync
  // Reason: Protocol Incompatibility

  describe('getHandler() method of ServerlesslySync', () => {
    let serverlessly: ServerlesslySync;
    let logsListener: jest.Mock;
    let errorListener: jest.Mock;

    beforeEach(() => {
      serverlessly = new Serverlessly({
        middlewareEngine: dummyMiddlewareEngineSync,
      });
      logsListener = jest.fn();
      errorListener = jest.fn();
    });

    test('getHandler() throws error if no middleware is found', () => {
      expect(() => {
        serverlessly.getHandler({
          platformAdapter: dummyPlatformAdapterAsyncHandlerToSyncProtocol,
        });
      }).toThrowError();
    });

    test('getHandler() throws correct error if no middleware is found & no ERROR event handler is attached', () => {
      expect(() => {
        serverlessly.getHandler({
          platformAdapter: dummyPlatformAdapterAsyncHandlerToSyncProtocol,
        });
      }).toThrow(new Error('No Middleware Found'));
    });

    test('getHandler() throws & emits correct error if no middleware is found, but ERROR event handler is attached', () => {
      expect(() => {
        serverlessly.on('ERROR', errorListener).getHandler({
          platformAdapter: dummyPlatformAdapterAsyncHandlerToSyncProtocol,
        });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(new Error('No Middleware Found'));
    });

    test('getHandler() returns handler of correct type', () => {
      expect<DummyHandlerSync>(
        serverlessly
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: dummyPlatformAdapterAsyncHandlerToSyncProtocol,
          }) as DummyHandlerSync
      );
    });

    test('getHandler() returns correct handler', () => {
      expect(
        serverlessly
          .pipe(
            () => 'Hulk',
            () => 'Smash'
          )
          .getHandler({
            platformAdapter: dummyPlatformAdapterAsyncHandlerToSyncProtocol,
          })('Hulk Says:')
      ).resolves.toBe('Hulk Says: Hulk Smash');
    });

    test('getHandler() emits logs twice when it encounters no error', () => {
      serverlessly
        .pipe(() => 'Foo')
        .on('LOG', logsListener)
        .getHandler({
          platformAdapter: dummyPlatformAdapterAsyncHandlerToSyncProtocol,
        });

      expect(logsListener).toBeCalledTimes(2);
    });

    test('getHandler() emits correct logs when it encounters no error', () => {
      serverlessly
        .pipe(
          () => 'Foo',
          () => 'Bar'
        )
        .on('LOG', logsListener)
        .getHandler({
          platformAdapter: dummyPlatformAdapterAsyncHandlerToSyncProtocol,
        });

      expect(logsListener).nthCalledWith(1, 'getHandler: 2 middlewares found');
      expect(logsListener).nthCalledWith(
        2,
        'getHandler: Platform Adapter found'
      );
    });

    test('getHandler() throws error if middlewareEngine throws or encounters error', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineSync })
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: dummyPlatformAdapterAsyncHandlerToSyncProtocol,
          });
      }).toThrowError();
    });

    test('getHandler() throws correct error if middlewareEngine throws or encounters error & there is no ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineSync })
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: dummyPlatformAdapterAsyncHandlerToSyncProtocol,
          });
      }).toThrow(
        new Error(
          'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
        )
      );
    });

    test('getHandler() throws and emits correct error if middlewareEngine throws or encounters error & there is an ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineSync })
          .on('ERROR', errorListener)
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: dummyPlatformAdapterAsyncHandlerToSyncProtocol,
          });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(
        new Error('Faulty Middleware Engine\nRangeError: Invalid array length')
      );
    });

    test('getHandler() throws error if platformAdapter throws or encounters error', () => {
      expect(() => {
        serverlessly
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterAsyncHandlerToSyncProtocol,
          });
      }).toThrowError();
    });

    test('getHandler() throws correct error if platformAdapter throws or encounters error & there is no ERROR event listener attached', () => {
      expect(() => {
        serverlessly
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterAsyncHandlerToSyncProtocol,
          });
      }).toThrow(
        new Error(
          'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
        )
      );
    });

    test('getHandler() throws and emits correct error if platformAdapter throws or encounters error & there is an ERROR event listener attached', () => {
      expect(() => {
        serverlessly
          .on('ERROR', errorListener)
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterAsyncHandlerToSyncProtocol,
          });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(
        new Error('Faulty Platform Adapter\nRangeError: Invalid array length')
      );
    });

    test('getHandler() throws error if both middlewareEngine and platformAdapter throws or encounters error', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineSync })
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterAsyncHandlerToSyncProtocol,
          });
      }).toThrowError();
    });

    test('getHandler() throws correct error if both middlewareEngine and platformAdapter throws or encounters error & there is no ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineSync })
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterAsyncHandlerToSyncProtocol,
          });
      }).toThrow(
        new Error(
          'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
        )
      );
    });

    test('getHandler() throws and emits correct error if both middlewareEngine and platformAdapter throws or encounters error & there is an ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineSync })
          .on('ERROR', errorListener)
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterAsyncHandlerToSyncProtocol,
          });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(
        new Error('Faulty Middleware Engine\nRangeError: Invalid array length')
      );
    });
  });
});

describe('dummyPlatformAdapterSyncOrAsyncStrict', () => {
  describe('getHandler() method of ServerlesslySync', () => {
    let serverlessly: ServerlesslySync;
    let logsListener: jest.Mock;
    let errorListener: jest.Mock;

    beforeEach(() => {
      serverlessly = new Serverlessly({
        middlewareEngine: dummyMiddlewareEngineSync,
      });
      logsListener = jest.fn();
      errorListener = jest.fn();
    });

    test('getHandler() throws error if no middleware is found', () => {
      expect(() => {
        serverlessly.getHandler({
          platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
        });
      }).toThrowError();
    });

    test('getHandler() throws correct error if no middleware is found & no ERROR event handler is attached', () => {
      expect(() => {
        serverlessly.getHandler({
          platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
        });
      }).toThrow(new Error('No Middleware Found'));
    });

    test('getHandler() throws & emits correct error if no middleware is found, but ERROR event handler is attached', () => {
      expect(() => {
        serverlessly.on('ERROR', errorListener).getHandler({
          platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
        });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(new Error('No Middleware Found'));
    });

    test('getHandler() returns handler of correct type', () => {
      expect<DummyHandlerSyncOrAsync>(
        serverlessly
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
          })
      );
    });

    test('getHandler() returns correct handler', () => {
      expect(
        serverlessly
          .pipe(
            () => 'Hulk',
            () => 'Smash'
          )
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
          })('Hulk Says:')
      ).toBe('Hulk Says: Hulk Smash');
    });

    test('getHandler() emits logs twice when it encounters no error', () => {
      serverlessly
        .pipe(() => 'Foo')
        .on('LOG', logsListener)
        .getHandler({ platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict });

      expect(logsListener).toBeCalledTimes(2);
    });

    test('getHandler() emits correct logs when it encounters no error', () => {
      serverlessly
        .pipe(
          () => 'Foo',
          () => 'Bar'
        )
        .on('LOG', logsListener)
        .getHandler({ platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict });

      expect(logsListener).nthCalledWith(1, 'getHandler: 2 middlewares found');
      expect(logsListener).nthCalledWith(
        2,
        'getHandler: Platform Adapter found'
      );
    });

    test('getHandler() throws error if middlewareEngine throws or encounters error', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineSync })
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrowError();
    });

    test('getHandler() throws correct error if middlewareEngine throws or encounters error & there is no ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineSync })
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrow(
        new Error(
          'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
        )
      );
    });

    test('getHandler() throws and emits correct error if middlewareEngine throws or encounters error & there is an ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineSync })
          .on('ERROR', errorListener)
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(
        new Error('Faulty Middleware Engine\nRangeError: Invalid array length')
      );
    });

    test('getHandler() throws error if platformAdapter throws or encounters error', () => {
      expect(() => {
        serverlessly
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrowError();
    });

    test('getHandler() throws correct error if platformAdapter throws or encounters error & there is no ERROR event listener attached', () => {
      expect(() => {
        serverlessly
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrow(
        new Error(
          'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
        )
      );
    });

    test('getHandler() throws and emits correct error if platformAdapter throws or encounters error & there is an ERROR event listener attached', () => {
      expect(() => {
        serverlessly
          .on('ERROR', errorListener)
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(
        new Error('Faulty Platform Adapter\nRangeError: Invalid array length')
      );
    });

    test('getHandler() throws error if both middlewareEngine and platformAdapter throws or encounters error', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineSync })
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrowError();
    });

    test('getHandler() throws correct error if both middlewareEngine and platformAdapter throws or encounters error & there is no ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineSync })
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrow(
        new Error(
          'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
        )
      );
    });

    test('getHandler() throws and emits correct error if both middlewareEngine and platformAdapter throws or encounters error & there is an ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineSync })
          .on('ERROR', errorListener)
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(
        new Error('Faulty Middleware Engine\nRangeError: Invalid array length')
      );
    });
  });

  describe('getHandler() method of ServerlesslyAsync', () => {
    let serverlessly: ServerlesslyAsync;
    let logsListener: jest.Mock;
    let errorListener: jest.Mock;

    beforeEach(() => {
      serverlessly = new Serverlessly({
        middlewareEngine: dummyMiddlewareEngineAsync,
      });
      logsListener = jest.fn();
      errorListener = jest.fn();
    });

    test('getHandler() throws error if no middleware is found', () => {
      expect(() => {
        serverlessly.getHandler({
          platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
        });
      }).toThrowError();
    });

    test('getHandler() throws correct error if no middleware is found & no ERROR event handler is attached', () => {
      expect(() => {
        serverlessly.getHandler({
          platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
        });
      }).toThrow(new Error('No Middleware Found'));
    });

    test('getHandler() throws & emits correct error if no middleware is found, but ERROR event handler is attached', () => {
      expect(() => {
        serverlessly.on('ERROR', errorListener).getHandler({
          platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
        });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(new Error('No Middleware Found'));
    });

    test('getHandler() returns handler of correct type', () => {
      expect<DummyHandlerSyncOrAsync>(
        serverlessly
          .pipe(async () => 'Foo')
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
          })
      );
    });

    test('getHandler() returns correct handler', () => {
      expect(
        serverlessly
          .pipe(
            async () => 'Hulk',
            () => Promise.resolve('Smash')
          )
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
          })('Hulk Says:')
      ).resolves.toBe('Hulk Says: Hulk Smash');
    });

    test('getHandler() emits logs twice when it encounters no error', () => {
      serverlessly
        .pipe(async () => 'Foo')
        .on('LOG', logsListener)
        .getHandler({ platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict });

      expect(logsListener).toBeCalledTimes(2);
    });

    test('getHandler() emits correct logs when it encounters no error', () => {
      serverlessly
        .pipe(
          async () => 'Foo',
          async () => 'Bar'
        )
        .on('LOG', logsListener)
        .getHandler({ platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict });

      expect(logsListener).nthCalledWith(1, 'getHandler: 2 middlewares found');
      expect(logsListener).nthCalledWith(
        2,
        'getHandler: Platform Adapter found'
      );
    });

    test('getHandler() throws error if middlewareEngine throws or encounters error', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineAsync })
          .pipe(async () => 'Foo')
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrowError();
    });

    test('getHandler() throws correct error if middlewareEngine throws or encounters error & there is no ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineAsync })
          .pipe(async () => 'Foo')
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrow(
        new Error(
          'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
        )
      );
    });

    test('getHandler() throws and emits correct error if middlewareEngine throws or encounters error & there is an ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineAsync })
          .on('ERROR', errorListener)
          .pipe(async () => 'Foo')
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(
        new Error('Faulty Middleware Engine\nRangeError: Invalid array length')
      );
    });

    test('getHandler() throws error if platformAdapter throws or encounters error', () => {
      expect(() => {
        serverlessly
          .pipe(async () => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrowError();
    });

    test('getHandler() throws correct error if platformAdapter throws or encounters error & there is no ERROR event listener attached', () => {
      expect(() => {
        serverlessly
          .pipe(async () => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrow(
        new Error(
          'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
        )
      );
    });

    test('getHandler() throws and emits correct error if platformAdapter throws or encounters error & there is an ERROR event listener attached', () => {
      expect(() => {
        serverlessly
          .on('ERROR', errorListener)
          .pipe(async () => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(
        new Error('Faulty Platform Adapter\nRangeError: Invalid array length')
      );
    });

    test('getHandler() throws error if both middlewareEngine and platformAdapter throws or encounters error', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineAsync })
          .pipe(async () => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrowError();
    });

    test('getHandler() throws correct error if both middlewareEngine and platformAdapter throws or encounters error & there is no ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineAsync })
          .pipe(async () => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrow(
        new Error(
          'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
        )
      );
    });

    test('getHandler() throws and emits correct error if both middlewareEngine and platformAdapter throws or encounters error & there is an ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineAsync })
          .on('ERROR', errorListener)
          .pipe(async () => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(
        new Error('Faulty Middleware Engine\nRangeError: Invalid array length')
      );
    });
  });

  describe('getHandler() method of ServerlesslyAsyncToSync', () => {
    let serverlessly: ServerlesslyAsyncToSync;
    let logsListener: jest.Mock;
    let errorListener: jest.Mock;

    beforeEach(() => {
      serverlessly = new Serverlessly({
        middlewareEngine: dummyMiddlewareEngineSyncMiddlewareToAsyncProtocol,
      });
      logsListener = jest.fn();
      errorListener = jest.fn();
    });

    test('getHandler() throws error if no middleware is found', () => {
      expect(() => {
        serverlessly.getHandler({
          platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
        });
      }).toThrowError();
    });

    test('getHandler() throws correct error if no middleware is found & no ERROR event handler is attached', () => {
      expect(() => {
        serverlessly.getHandler({
          platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
        });
      }).toThrow(new Error('No Middleware Found'));
    });

    test('getHandler() throws & emits correct error if no middleware is found, but ERROR event handler is attached', () => {
      expect(() => {
        serverlessly.on('ERROR', errorListener).getHandler({
          platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
        });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(new Error('No Middleware Found'));
    });

    test('getHandler() returns handler of correct type', () => {
      expect<DummyHandlerSyncOrAsync>(
        serverlessly
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
          })
      );
    });

    test('getHandler() returns correct handler', () => {
      expect(
        serverlessly
          .pipe(
            () => 'Hulk',
            () => 'Smash'
          )
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
          })('Hulk Says:')
      ).resolves.toBe('Hulk Says: Hulk Smash');
    });

    test('getHandler() emits logs twice when it encounters no error', () => {
      serverlessly
        .pipe(() => 'Foo')
        .on('LOG', logsListener)
        .getHandler({ platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict });

      expect(logsListener).toBeCalledTimes(2);
    });

    test('getHandler() emits correct logs when it encounters no error', () => {
      serverlessly
        .pipe(
          () => 'Foo',
          () => 'Bar'
        )
        .on('LOG', logsListener)
        .getHandler({ platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict });

      expect(logsListener).nthCalledWith(1, 'getHandler: 2 middlewares found');
      expect(logsListener).nthCalledWith(
        2,
        'getHandler: Platform Adapter found'
      );
    });

    test('getHandler() throws error if middlewareEngine throws or encounters error', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSyncMiddlewareToAsyncProtocol,
        })
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrowError();
    });

    test('getHandler() throws correct error if middlewareEngine throws or encounters error & there is no ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSyncMiddlewareToAsyncProtocol,
        })
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrow(
        new Error(
          'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
        )
      );
    });

    test('getHandler() throws and emits correct error if middlewareEngine throws or encounters error & there is an ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSyncMiddlewareToAsyncProtocol,
        })
          .on('ERROR', errorListener)
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(
        new Error('Faulty Middleware Engine\nRangeError: Invalid array length')
      );
    });

    test('getHandler() throws error if platformAdapter throws or encounters error', () => {
      expect(() => {
        serverlessly
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrowError();
    });

    test('getHandler() throws correct error if platformAdapter throws or encounters error & there is no ERROR event listener attached', () => {
      expect(() => {
        serverlessly
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrow(
        new Error(
          'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
        )
      );
    });

    test('getHandler() throws and emits correct error if platformAdapter throws or encounters error & there is an ERROR event listener attached', () => {
      expect(() => {
        serverlessly
          .on('ERROR', errorListener)
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(
        new Error('Faulty Platform Adapter\nRangeError: Invalid array length')
      );
    });

    test('getHandler() throws error if both middlewareEngine and platformAdapter throws or encounters error', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSyncMiddlewareToAsyncProtocol,
        })
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrowError();
    });

    test('getHandler() throws correct error if both middlewareEngine and platformAdapter throws or encounters error & there is no ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSyncMiddlewareToAsyncProtocol,
        })
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrow(
        new Error(
          'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
        )
      );
    });

    test('getHandler() throws and emits correct error if both middlewareEngine and platformAdapter throws or encounters error & there is an ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSyncMiddlewareToAsyncProtocol,
        })
          .on('ERROR', errorListener)
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(
        new Error('Faulty Middleware Engine\nRangeError: Invalid array length')
      );
    });
  });

  describe('getHandler() method of ServerlesslySyncOrAsync', () => {
    let serverlessly: ServerlesslySyncOrAsync;
    let logsListener: jest.Mock;
    let errorListener: jest.Mock;

    beforeEach(() => {
      serverlessly = new Serverlessly({
        middlewareEngine: dummyMiddlewareEngineSyncOrAsync,
      });
      logsListener = jest.fn();
      errorListener = jest.fn();
    });

    test('getHandler() throws error if no middleware is found', () => {
      expect(() => {
        serverlessly.getHandler({
          platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
        });
      }).toThrowError();
    });

    test('getHandler() throws correct error if no middleware is found & no ERROR event handler is attached', () => {
      expect(() => {
        serverlessly.getHandler({
          platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
        });
      }).toThrow(new Error('No Middleware Found'));
    });

    test('getHandler() throws & emits correct error if no middleware is found, but ERROR event handler is attached', () => {
      expect(() => {
        serverlessly.on('ERROR', errorListener).getHandler({
          platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
        });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(new Error('No Middleware Found'));
    });

    test('getHandler() returns handler of correct type', () => {
      expect<DummyHandlerSyncOrAsync>(
        serverlessly
          .pipe(
            async () => 'Foo',
            () => 'Bar'
          )
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
          })
      );
    });

    test('getHandler() returns correct handler', () => {
      expect(
        serverlessly
          .pipe(
            async () => 'Hulk',
            () => 'Smash',
            () => Promise.resolve('!!!')
          )
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
          })('Hulk Says:')
      ).resolves.toBe('Hulk Says: Hulk Smash !!!');
    });

    test('getHandler() emits logs twice when it encounters no error', () => {
      serverlessly
        .pipe(() => 'Foo')
        .on('LOG', logsListener)
        .getHandler({ platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict });

      expect(logsListener).toBeCalledTimes(2);
    });

    test('getHandler() emits correct logs when it encounters no error', () => {
      serverlessly
        .pipe(
          () => 'Foo',
          () => 'Bar'
        )
        .on('LOG', logsListener)
        .getHandler({ platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict });

      expect(logsListener).nthCalledWith(1, 'getHandler: 2 middlewares found');
      expect(logsListener).nthCalledWith(
        2,
        'getHandler: Platform Adapter found'
      );
    });

    test('getHandler() throws error if middlewareEngine throws or encounters error', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSyncOrAsync,
        })
          .pipe(
            async () => 'Foo',
            () => 'Bar'
          )
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrowError();
    });

    test('getHandler() throws correct error if middlewareEngine throws or encounters error & there is no ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSyncOrAsync,
        })
          .pipe(
            async () => 'Foo',
            () => 'Bar'
          )
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrow(
        new Error(
          'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
        )
      );
    });

    test('getHandler() throws and emits correct error if middlewareEngine throws or encounters error & there is an ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSyncOrAsync,
        })
          .on('ERROR', errorListener)
          .pipe(
            async () => 'Foo',
            () => 'Bar'
          )
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(
        new Error('Faulty Middleware Engine\nRangeError: Invalid array length')
      );
    });

    test('getHandler() throws error if platformAdapter throws or encounters error', () => {
      expect(() => {
        serverlessly
          .pipe(
            async () => 'Foo',
            () => 'Bar'
          )
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrowError();
    });

    test('getHandler() throws correct error if platformAdapter throws or encounters error & there is no ERROR event listener attached', () => {
      expect(() => {
        serverlessly
          .pipe(
            async () => 'Foo',
            () => 'Bar'
          )
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrow(
        new Error(
          'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
        )
      );
    });

    test('getHandler() throws and emits correct error if platformAdapter throws or encounters error & there is an ERROR event listener attached', () => {
      expect(() => {
        serverlessly
          .on('ERROR', errorListener)
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(
        new Error('Faulty Platform Adapter\nRangeError: Invalid array length')
      );
    });

    test('getHandler() throws error if both middlewareEngine and platformAdapter throws or encounters error', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSyncOrAsync,
        })
          .pipe(
            async () => 'Foo',
            () => 'Bar'
          )
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrowError();
    });

    test('getHandler() throws correct error if both middlewareEngine and platformAdapter throws or encounters error & there is no ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSyncOrAsync,
        })
          .pipe(
            async () => 'Foo',
            () => 'Bar'
          )
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrow(
        new Error(
          'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
        )
      );
    });

    test('getHandler() throws and emits correct error if both middlewareEngine and platformAdapter throws or encounters error & there is an ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSyncOrAsync,
        })
          .on('ERROR', errorListener)
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(
        new Error('Faulty Middleware Engine\nRangeError: Invalid array length')
      );
    });
  });

  describe('getHandler() method of ServerlesslySyncOrAsyncToSync', () => {
    let serverlessly: ServerlesslySyncOrAsyncToSync;
    let logsListener: jest.Mock;
    let errorListener: jest.Mock;

    beforeEach(() => {
      serverlessly = new Serverlessly({
        middlewareEngine: dummyMiddlewareEngineSyncMiddlewareToSyncOrAsyncProtocol,
      });
      logsListener = jest.fn();
      errorListener = jest.fn();
    });

    test('getHandler() throws error if no middleware is found', () => {
      expect(() => {
        serverlessly.getHandler({
          platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
        });
      }).toThrowError();
    });

    test('getHandler() throws correct error if no middleware is found & no ERROR event handler is attached', () => {
      expect(() => {
        serverlessly.getHandler({
          platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
        });
      }).toThrow(new Error('No Middleware Found'));
    });

    test('getHandler() throws & emits correct error if no middleware is found, but ERROR event handler is attached', () => {
      expect(() => {
        serverlessly.on('ERROR', errorListener).getHandler({
          platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
        });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(new Error('No Middleware Found'));
    });

    test('getHandler() returns handler of correct type', () => {
      expect<DummyHandlerSyncOrAsync>(
        serverlessly
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
          })
      );
    });

    test('getHandler() returns correct handler', () => {
      expect(
        serverlessly
          .pipe(
            () => 'Hulk',
            () => 'Smash'
          )
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
          })('Hulk Says:')
      ).toBe('Hulk Says: Hulk Smash');
    });

    test('getHandler() emits logs twice when it encounters no error', () => {
      serverlessly
        .pipe(() => 'Foo')
        .on('LOG', logsListener)
        .getHandler({ platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict });

      expect(logsListener).toBeCalledTimes(2);
    });

    test('getHandler() emits correct logs when it encounters no error', () => {
      serverlessly
        .pipe(
          () => 'Foo',
          () => 'Bar'
        )
        .on('LOG', logsListener)
        .getHandler({ platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict });

      expect(logsListener).nthCalledWith(1, 'getHandler: 2 middlewares found');
      expect(logsListener).nthCalledWith(
        2,
        'getHandler: Platform Adapter found'
      );
    });

    test('getHandler() throws error if middlewareEngine throws or encounters error', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSyncMiddlewareToSyncOrAsyncProtocol,
        })
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrowError();
    });

    test('getHandler() throws correct error if middlewareEngine throws or encounters error & there is no ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSyncMiddlewareToSyncOrAsyncProtocol,
        })
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrow(
        new Error(
          'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
        )
      );
    });

    test('getHandler() throws and emits correct error if middlewareEngine throws or encounters error & there is an ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSyncMiddlewareToSyncOrAsyncProtocol,
        })
          .on('ERROR', errorListener)
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(
        new Error('Faulty Middleware Engine\nRangeError: Invalid array length')
      );
    });

    test('getHandler() throws error if platformAdapter throws or encounters error', () => {
      expect(() => {
        serverlessly
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrowError();
    });

    test('getHandler() throws correct error if platformAdapter throws or encounters error & there is no ERROR event listener attached', () => {
      expect(() => {
        serverlessly
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrow(
        new Error(
          'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
        )
      );
    });

    test('getHandler() throws and emits correct error if platformAdapter throws or encounters error & there is an ERROR event listener attached', () => {
      expect(() => {
        serverlessly
          .on('ERROR', errorListener)
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(
        new Error('Faulty Platform Adapter\nRangeError: Invalid array length')
      );
    });

    test('getHandler() throws error if both middlewareEngine and platformAdapter throws or encounters error', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSyncMiddlewareToSyncOrAsyncProtocol,
        })
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrowError();
    });

    test('getHandler() throws correct error if both middlewareEngine and platformAdapter throws or encounters error & there is no ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSyncMiddlewareToSyncOrAsyncProtocol,
        })
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrow(
        new Error(
          'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
        )
      );
    });

    test('getHandler() throws and emits correct error if both middlewareEngine and platformAdapter throws or encounters error & there is an ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSyncMiddlewareToSyncOrAsyncProtocol,
        })
          .on('ERROR', errorListener)
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(
        new Error('Faulty Middleware Engine\nRangeError: Invalid array length')
      );
    });
  });

  describe('getHandler() method of ServerlesslySyncOrAsyncToAsync', () => {
    let serverlessly: ServerlesslySyncOrAsyncToAsync;
    let logsListener: jest.Mock;
    let errorListener: jest.Mock;

    beforeEach(() => {
      serverlessly = new Serverlessly({
        middlewareEngine: dummyMiddlewareEngineAsyncMiddlewareToSyncOrAsyncProtocol,
      });
      logsListener = jest.fn();
      errorListener = jest.fn();
    });

    test('getHandler() throws error if no middleware is found', () => {
      expect(() => {
        serverlessly.getHandler({
          platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
        });
      }).toThrowError();
    });

    test('getHandler() throws correct error if no middleware is found & no ERROR event handler is attached', () => {
      expect(() => {
        serverlessly.getHandler({
          platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
        });
      }).toThrow(new Error('No Middleware Found'));
    });

    test('getHandler() throws & emits correct error if no middleware is found, but ERROR event handler is attached', () => {
      expect(() => {
        serverlessly.on('ERROR', errorListener).getHandler({
          platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
        });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(new Error('No Middleware Found'));
    });

    test('getHandler() returns handler of correct type', () => {
      expect<DummyHandlerSyncOrAsync>(
        serverlessly
          .pipe(async () => 'Foo')
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
          })
      );
    });

    test('getHandler() returns correct handler', () => {
      expect(
        serverlessly
          .pipe(
            async () => 'Hulk',
            async () => 'Smash'
          )
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
          })('Hulk Says:')
      ).resolves.toBe('Hulk Says: Hulk Smash');
    });

    test('getHandler() emits logs twice when it encounters no error', () => {
      serverlessly
        .pipe(async () => 'Foo')
        .on('LOG', logsListener)
        .getHandler({ platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict });

      expect(logsListener).toBeCalledTimes(2);
    });

    test('getHandler() emits correct logs when it encounters no error', () => {
      serverlessly
        .pipe(
          async () => 'Foo',
          async () => 'Bar'
        )
        .on('LOG', logsListener)
        .getHandler({ platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict });

      expect(logsListener).nthCalledWith(1, 'getHandler: 2 middlewares found');
      expect(logsListener).nthCalledWith(
        2,
        'getHandler: Platform Adapter found'
      );
    });

    test('getHandler() throws error if middlewareEngine throws or encounters error', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineAsyncMiddlewareToSyncOrAsyncProtocol,
        })
          .pipe(async () => 'Foo')
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrowError();
    });

    test('getHandler() throws correct error if middlewareEngine throws or encounters error & there is no ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineAsyncMiddlewareToSyncOrAsyncProtocol,
        })
          .pipe(async () => 'Foo')
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrow(
        new Error(
          'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
        )
      );
    });

    test('getHandler() throws and emits correct error if middlewareEngine throws or encounters error & there is an ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineAsyncMiddlewareToSyncOrAsyncProtocol,
        })
          .on('ERROR', errorListener)
          .pipe(async () => 'Foo')
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(
        new Error('Faulty Middleware Engine\nRangeError: Invalid array length')
      );
    });

    test('getHandler() throws error if platformAdapter throws or encounters error', () => {
      expect(() => {
        serverlessly
          .pipe(async () => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrowError();
    });

    test('getHandler() throws correct error if platformAdapter throws or encounters error & there is no ERROR event listener attached', () => {
      expect(() => {
        serverlessly
          .pipe(async () => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrow(
        new Error(
          'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
        )
      );
    });

    test('getHandler() throws and emits correct error if platformAdapter throws or encounters error & there is an ERROR event listener attached', () => {
      expect(() => {
        serverlessly
          .on('ERROR', errorListener)
          .pipe(async () => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(
        new Error('Faulty Platform Adapter\nRangeError: Invalid array length')
      );
    });

    test('getHandler() throws error if both middlewareEngine and platformAdapter throws or encounters error', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineAsyncMiddlewareToSyncOrAsyncProtocol,
        })
          .pipe(async () => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrowError();
    });

    test('getHandler() throws correct error if both middlewareEngine and platformAdapter throws or encounters error & there is no ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineAsyncMiddlewareToSyncOrAsyncProtocol,
        })
          .pipe(async () => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrow(
        new Error(
          'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
        )
      );
    });

    test('getHandler() throws and emits correct error if both middlewareEngine and platformAdapter throws or encounters error & there is an ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineAsyncMiddlewareToSyncOrAsyncProtocol,
        })
          .on('ERROR', errorListener)
          .pipe(async () => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(
        new Error('Faulty Middleware Engine\nRangeError: Invalid array length')
      );
    });
  });
});

describe('dummyPlatformAdapterSyncOrAsync', () => {
  describe('getHandler() method of ServerlesslySync', () => {
    let serverlessly: ServerlesslySync;
    let logsListener: jest.Mock;
    let errorListener: jest.Mock;

    beforeEach(() => {
      serverlessly = new Serverlessly({
        middlewareEngine: dummyMiddlewareEngineSync,
      });
      logsListener = jest.fn();
      errorListener = jest.fn();
    });

    test('getHandler() throws error if no middleware is found', () => {
      expect(() => {
        serverlessly.getHandler({
          platformAdapter: dummyPlatformAdapterSyncOrAsync,
        });
      }).toThrowError();
    });

    test('getHandler() throws correct error if no middleware is found & no ERROR event handler is attached', () => {
      expect(() => {
        serverlessly.getHandler({
          platformAdapter: dummyPlatformAdapterSyncOrAsync,
        });
      }).toThrow(new Error('No Middleware Found'));
    });

    test('getHandler() throws & emits correct error if no middleware is found, but ERROR event handler is attached', () => {
      expect(() => {
        serverlessly.on('ERROR', errorListener).getHandler({
          platformAdapter: dummyPlatformAdapterSyncOrAsync,
        });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(new Error('No Middleware Found'));
    });

    test('getHandler() returns handler of correct type', () => {
      expect<DummyHandlerSyncOrAsync>(
        serverlessly
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsync,
          })
      );
    });

    test('getHandler() returns correct handler', () => {
      expect(
        serverlessly
          .pipe(
            () => 'Hulk',
            () => 'Smash'
          )
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsync,
          })('Hulk Says:')
      ).resolves.toBe('Hulk Says: Hulk Smash');
    });

    test('getHandler() emits logs twice when it encounters no error', () => {
      serverlessly
        .pipe(() => 'Foo')
        .on('LOG', logsListener)
        .getHandler({ platformAdapter: dummyPlatformAdapterSyncOrAsync });

      expect(logsListener).toBeCalledTimes(2);
    });

    test('getHandler() emits correct logs when it encounters no error', () => {
      serverlessly
        .pipe(
          () => 'Foo',
          () => 'Bar'
        )
        .on('LOG', logsListener)
        .getHandler({ platformAdapter: dummyPlatformAdapterSyncOrAsync });

      expect(logsListener).nthCalledWith(1, 'getHandler: 2 middlewares found');
      expect(logsListener).nthCalledWith(
        2,
        'getHandler: Platform Adapter found'
      );
    });

    test('getHandler() throws error if middlewareEngine throws or encounters error', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineSync })
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsync,
          });
      }).toThrowError();
    });

    test('getHandler() throws correct error if middlewareEngine throws or encounters error & there is no ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineSync })
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsync,
          });
      }).toThrow(
        new Error(
          'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
        )
      );
    });

    test('getHandler() throws and emits correct error if middlewareEngine throws or encounters error & there is an ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineSync })
          .on('ERROR', errorListener)
          .pipe(() => 'Foo')
          .getHandler({ platformAdapter: dummyPlatformAdapterSyncOrAsync });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(
        new Error('Faulty Middleware Engine\nRangeError: Invalid array length')
      );
    });

    test('getHandler() throws error if platformAdapter throws or encounters error', () => {
      expect(() => {
        serverlessly
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsync,
          });
      }).toThrowError();
    });

    test('getHandler() throws correct error if platformAdapter throws or encounters error & there is no ERROR event listener attached', () => {
      expect(() => {
        serverlessly
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsync,
          });
      }).toThrow(
        new Error(
          'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
        )
      );
    });

    test('getHandler() throws and emits correct error if platformAdapter throws or encounters error & there is an ERROR event listener attached', () => {
      expect(() => {
        serverlessly
          .on('ERROR', errorListener)
          .pipe(() => 'Foo')
          .getHandler({ platformAdapter: faultyPlatformAdapterSyncOrAsync });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(
        new Error('Faulty Platform Adapter\nRangeError: Invalid array length')
      );
    });

    test('getHandler() throws error if both middlewareEngine and platformAdapter throws or encounters error', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineSync })
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsync,
          });
      }).toThrowError();
    });

    test('getHandler() throws correct error if both middlewareEngine and platformAdapter throws or encounters error & there is no ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineSync })
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsync,
          });
      }).toThrow(
        new Error(
          'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
        )
      );
    });

    test('getHandler() throws and emits correct error if both middlewareEngine and platformAdapter throws or encounters error & there is an ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineSync })
          .on('ERROR', errorListener)
          .pipe(() => 'Foo')
          .getHandler({ platformAdapter: faultyPlatformAdapterSyncOrAsync });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(
        new Error('Faulty Middleware Engine\nRangeError: Invalid array length')
      );
    });
  });

  describe('getHandler() method of ServerlesslyAsync', () => {
    let serverlessly: ServerlesslyAsync;
    let logsListener: jest.Mock;
    let errorListener: jest.Mock;

    beforeEach(() => {
      serverlessly = new Serverlessly({
        middlewareEngine: dummyMiddlewareEngineAsync,
      });
      logsListener = jest.fn();
      errorListener = jest.fn();
    });

    test('getHandler() throws error if no middleware is found', () => {
      expect(() => {
        serverlessly.getHandler({
          platformAdapter: dummyPlatformAdapterSyncOrAsync,
        });
      }).toThrowError();
    });

    test('getHandler() throws correct error if no middleware is found & no ERROR event handler is attached', () => {
      expect(() => {
        serverlessly.getHandler({
          platformAdapter: dummyPlatformAdapterSyncOrAsync,
        });
      }).toThrow(new Error('No Middleware Found'));
    });

    test('getHandler() throws & emits correct error if no middleware is found, but ERROR event handler is attached', () => {
      expect(() => {
        serverlessly.on('ERROR', errorListener).getHandler({
          platformAdapter: dummyPlatformAdapterSyncOrAsync,
        });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(new Error('No Middleware Found'));
    });

    test('getHandler() returns handler of correct type', () => {
      expect<DummyHandlerSyncOrAsync>(
        serverlessly
          .pipe(async () => 'Foo')
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsync,
          })
      );
    });

    test('getHandler() returns correct handler', () => {
      expect(
        serverlessly
          .pipe(
            async () => 'Hulk',
            () => Promise.resolve('Smash')
          )
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsync,
          })('Hulk Says:')
      ).resolves.toBe('Hulk Says: Hulk Smash');
    });

    test('getHandler() emits logs twice when it encounters no error', () => {
      serverlessly
        .pipe(async () => 'Foo')
        .on('LOG', logsListener)
        .getHandler({ platformAdapter: dummyPlatformAdapterSyncOrAsync });

      expect(logsListener).toBeCalledTimes(2);
    });

    test('getHandler() emits correct logs when it encounters no error', () => {
      serverlessly
        .pipe(
          async () => 'Foo',
          async () => 'Bar'
        )
        .on('LOG', logsListener)
        .getHandler({ platformAdapter: dummyPlatformAdapterSyncOrAsync });

      expect(logsListener).nthCalledWith(1, 'getHandler: 2 middlewares found');
      expect(logsListener).nthCalledWith(
        2,
        'getHandler: Platform Adapter found'
      );
    });

    test('getHandler() throws error if middlewareEngine throws or encounters error', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineAsync })
          .pipe(async () => 'Foo')
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsync,
          });
      }).toThrowError();
    });

    test('getHandler() throws correct error if middlewareEngine throws or encounters error & there is no ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineAsync })
          .pipe(async () => 'Foo')
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsync,
          });
      }).toThrow(
        new Error(
          'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
        )
      );
    });

    test('getHandler() throws and emits correct error if middlewareEngine throws or encounters error & there is an ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineAsync })
          .on('ERROR', errorListener)
          .pipe(async () => 'Foo')
          .getHandler({ platformAdapter: dummyPlatformAdapterSyncOrAsync });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(
        new Error('Faulty Middleware Engine\nRangeError: Invalid array length')
      );
    });

    test('getHandler() throws error if platformAdapter throws or encounters error', () => {
      expect(() => {
        serverlessly
          .pipe(async () => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsync,
          });
      }).toThrowError();
    });

    test('getHandler() throws correct error if platformAdapter throws or encounters error & there is no ERROR event listener attached', () => {
      expect(() => {
        serverlessly
          .pipe(async () => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsync,
          });
      }).toThrow(
        new Error(
          'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
        )
      );
    });

    test('getHandler() throws and emits correct error if platformAdapter throws or encounters error & there is an ERROR event listener attached', () => {
      expect(() => {
        serverlessly
          .on('ERROR', errorListener)
          .pipe(async () => 'Foo')
          .getHandler({ platformAdapter: faultyPlatformAdapterSyncOrAsync });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(
        new Error('Faulty Platform Adapter\nRangeError: Invalid array length')
      );
    });

    test('getHandler() throws error if both middlewareEngine and platformAdapter throws or encounters error', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineAsync })
          .pipe(async () => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsync,
          });
      }).toThrowError();
    });

    test('getHandler() throws correct error if both middlewareEngine and platformAdapter throws or encounters error & there is no ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineAsync })
          .pipe(async () => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsync,
          });
      }).toThrow(
        new Error(
          'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
        )
      );
    });

    test('getHandler() throws and emits correct error if both middlewareEngine and platformAdapter throws or encounters error & there is an ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineAsync })
          .on('ERROR', errorListener)
          .pipe(async () => 'Foo')
          .getHandler({ platformAdapter: faultyPlatformAdapterSyncOrAsync });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(
        new Error('Faulty Middleware Engine\nRangeError: Invalid array length')
      );
    });
  });

  describe('getHandler() method of ServerlesslyAsyncToSync', () => {
    let serverlessly: ServerlesslyAsyncToSync;
    let logsListener: jest.Mock;
    let errorListener: jest.Mock;

    beforeEach(() => {
      serverlessly = new Serverlessly({
        middlewareEngine: dummyMiddlewareEngineSyncMiddlewareToAsyncProtocol,
      });
      logsListener = jest.fn();
      errorListener = jest.fn();
    });

    test('getHandler() throws error if no middleware is found', () => {
      expect(() => {
        serverlessly.getHandler({
          platformAdapter: dummyPlatformAdapterSyncOrAsync,
        });
      }).toThrowError();
    });

    test('getHandler() throws correct error if no middleware is found & no ERROR event handler is attached', () => {
      expect(() => {
        serverlessly.getHandler({
          platformAdapter: dummyPlatformAdapterSyncOrAsync,
        });
      }).toThrow(new Error('No Middleware Found'));
    });

    test('getHandler() throws & emits correct error if no middleware is found, but ERROR event handler is attached', () => {
      expect(() => {
        serverlessly.on('ERROR', errorListener).getHandler({
          platformAdapter: dummyPlatformAdapterSyncOrAsync,
        });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(new Error('No Middleware Found'));
    });

    test('getHandler() returns handler of correct type', () => {
      expect<DummyHandlerSyncOrAsync>(
        serverlessly
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsync,
          })
      );
    });

    test('getHandler() returns correct handler', () => {
      expect(
        serverlessly
          .pipe(
            () => 'Hulk',
            () => 'Smash'
          )
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsync,
          })('Hulk Says:')
      ).resolves.toBe('Hulk Says: Hulk Smash');
    });

    test('getHandler() emits logs twice when it encounters no error', () => {
      serverlessly
        .pipe(() => 'Foo')
        .on('LOG', logsListener)
        .getHandler({ platformAdapter: dummyPlatformAdapterSyncOrAsync });

      expect(logsListener).toBeCalledTimes(2);
    });

    test('getHandler() emits correct logs when it encounters no error', () => {
      serverlessly
        .pipe(
          () => 'Foo',
          () => 'Bar'
        )
        .on('LOG', logsListener)
        .getHandler({ platformAdapter: dummyPlatformAdapterSyncOrAsync });

      expect(logsListener).nthCalledWith(1, 'getHandler: 2 middlewares found');
      expect(logsListener).nthCalledWith(
        2,
        'getHandler: Platform Adapter found'
      );
    });

    test('getHandler() throws error if middlewareEngine throws or encounters error', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSyncMiddlewareToAsyncProtocol,
        })
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsync,
          });
      }).toThrowError();
    });

    test('getHandler() throws correct error if middlewareEngine throws or encounters error & there is no ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSyncMiddlewareToAsyncProtocol,
        })
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsync,
          });
      }).toThrow(
        new Error(
          'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
        )
      );
    });

    test('getHandler() throws and emits correct error if middlewareEngine throws or encounters error & there is an ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSyncMiddlewareToAsyncProtocol,
        })
          .on('ERROR', errorListener)
          .pipe(() => 'Foo')
          .getHandler({ platformAdapter: dummyPlatformAdapterSyncOrAsync });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(
        new Error('Faulty Middleware Engine\nRangeError: Invalid array length')
      );
    });

    test('getHandler() throws error if platformAdapter throws or encounters error', () => {
      expect(() => {
        serverlessly
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsync,
          });
      }).toThrowError();
    });

    test('getHandler() throws correct error if platformAdapter throws or encounters error & there is no ERROR event listener attached', () => {
      expect(() => {
        serverlessly
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsync,
          });
      }).toThrow(
        new Error(
          'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
        )
      );
    });

    test('getHandler() throws and emits correct error if platformAdapter throws or encounters error & there is an ERROR event listener attached', () => {
      expect(() => {
        serverlessly
          .on('ERROR', errorListener)
          .pipe(() => 'Foo')
          .getHandler({ platformAdapter: faultyPlatformAdapterSyncOrAsync });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(
        new Error('Faulty Platform Adapter\nRangeError: Invalid array length')
      );
    });

    test('getHandler() throws error if both middlewareEngine and platformAdapter throws or encounters error', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSyncMiddlewareToAsyncProtocol,
        })
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsync,
          });
      }).toThrowError();
    });

    test('getHandler() throws correct error if both middlewareEngine and platformAdapter throws or encounters error & there is no ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSyncMiddlewareToAsyncProtocol,
        })
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsync,
          });
      }).toThrow(
        new Error(
          'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
        )
      );
    });

    test('getHandler() throws and emits correct error if both middlewareEngine and platformAdapter throws or encounters error & there is an ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSyncMiddlewareToAsyncProtocol,
        })
          .on('ERROR', errorListener)
          .pipe(() => 'Foo')
          .getHandler({ platformAdapter: faultyPlatformAdapterSyncOrAsync });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(
        new Error('Faulty Middleware Engine\nRangeError: Invalid array length')
      );
    });
  });

  describe('getHandler() method of ServerlesslySyncOrAsync', () => {
    let serverlessly: ServerlesslySyncOrAsync;
    let logsListener: jest.Mock;
    let errorListener: jest.Mock;

    beforeEach(() => {
      serverlessly = new Serverlessly({
        middlewareEngine: dummyMiddlewareEngineSyncOrAsync,
      });
      logsListener = jest.fn();
      errorListener = jest.fn();
    });

    test('getHandler() throws error if no middleware is found', () => {
      expect(() => {
        serverlessly.getHandler({
          platformAdapter: dummyPlatformAdapterSyncOrAsync,
        });
      }).toThrowError();
    });

    test('getHandler() throws correct error if no middleware is found & no ERROR event handler is attached', () => {
      expect(() => {
        serverlessly.getHandler({
          platformAdapter: dummyPlatformAdapterSyncOrAsync,
        });
      }).toThrow(new Error('No Middleware Found'));
    });

    test('getHandler() throws & emits correct error if no middleware is found, but ERROR event handler is attached', () => {
      expect(() => {
        serverlessly.on('ERROR', errorListener).getHandler({
          platformAdapter: dummyPlatformAdapterSyncOrAsync,
        });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(new Error('No Middleware Found'));
    });

    test('getHandler() returns handler of correct type', () => {
      expect<DummyHandlerSyncOrAsync>(
        serverlessly
          .pipe(
            async () => 'Foo',
            () => 'Bar'
          )
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsync,
          })
      );
    });

    test('getHandler() returns correct handler', () => {
      expect(
        serverlessly
          .pipe(
            async () => 'Hulk',
            () => 'Smash',
            () => Promise.resolve('!!!')
          )
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsync,
          })('Hulk Says:')
      ).resolves.toBe('Hulk Says: Hulk Smash !!!');
    });

    test('getHandler() emits logs twice when it encounters no error', () => {
      serverlessly
        .pipe(() => 'Foo')
        .on('LOG', logsListener)
        .getHandler({ platformAdapter: dummyPlatformAdapterSyncOrAsync });

      expect(logsListener).toBeCalledTimes(2);
    });

    test('getHandler() emits correct logs when it encounters no error', () => {
      serverlessly
        .pipe(
          () => 'Foo',
          () => 'Bar'
        )
        .on('LOG', logsListener)
        .getHandler({ platformAdapter: dummyPlatformAdapterSyncOrAsync });

      expect(logsListener).nthCalledWith(1, 'getHandler: 2 middlewares found');
      expect(logsListener).nthCalledWith(
        2,
        'getHandler: Platform Adapter found'
      );
    });

    test('getHandler() throws error if middlewareEngine throws or encounters error', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSyncOrAsync,
        })
          .pipe(async () => 'Foo')
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsync,
          });
      }).toThrowError();
    });

    test('getHandler() throws correct error if middlewareEngine throws or encounters error & there is no ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSyncOrAsync,
        })
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsync,
          });
      }).toThrow(
        new Error(
          'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
        )
      );
    });

    test('getHandler() throws and emits correct error if middlewareEngine throws or encounters error & there is an ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSyncOrAsync,
        })
          .on('ERROR', errorListener)
          .pipe(() => 'Foo')
          .getHandler({ platformAdapter: dummyPlatformAdapterSyncOrAsync });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(
        new Error('Faulty Middleware Engine\nRangeError: Invalid array length')
      );
    });

    test('getHandler() throws error if platformAdapter throws or encounters error', () => {
      expect(() => {
        serverlessly
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsync,
          });
      }).toThrowError();
    });

    test('getHandler() throws correct error if platformAdapter throws or encounters error & there is no ERROR event listener attached', () => {
      expect(() => {
        serverlessly
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsync,
          });
      }).toThrow(
        new Error(
          'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
        )
      );
    });

    test('getHandler() throws and emits correct error if platformAdapter throws or encounters error & there is an ERROR event listener attached', () => {
      expect(() => {
        serverlessly
          .on('ERROR', errorListener)
          .pipe(() => 'Foo')
          .getHandler({ platformAdapter: faultyPlatformAdapterSyncOrAsync });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(
        new Error('Faulty Platform Adapter\nRangeError: Invalid array length')
      );
    });

    test('getHandler() throws error if both middlewareEngine and platformAdapter throws or encounters error', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSyncOrAsync,
        })
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsync,
          });
      }).toThrowError();
    });

    test('getHandler() throws correct error if both middlewareEngine and platformAdapter throws or encounters error & there is no ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSyncOrAsync,
        })
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsync,
          });
      }).toThrow(
        new Error(
          'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
        )
      );
    });

    test('getHandler() throws and emits correct error if both middlewareEngine and platformAdapter throws or encounters error & there is an ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSyncOrAsync,
        })
          .on('ERROR', errorListener)
          .pipe(() => 'Foo')
          .getHandler({ platformAdapter: faultyPlatformAdapterSyncOrAsync });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(
        new Error('Faulty Middleware Engine\nRangeError: Invalid array length')
      );
    });
  });

  describe('getHandler() method of ServerlesslySyncOrAsyncToSync', () => {
    let serverlessly: ServerlesslySyncOrAsyncToSync;
    let logsListener: jest.Mock;
    let errorListener: jest.Mock;

    beforeEach(() => {
      serverlessly = new Serverlessly({
        middlewareEngine: dummyMiddlewareEngineSyncMiddlewareToSyncOrAsyncProtocol,
      });
      logsListener = jest.fn();
      errorListener = jest.fn();
    });

    test('getHandler() throws error if no middleware is found', () => {
      expect(() => {
        serverlessly.getHandler({
          platformAdapter: dummyPlatformAdapterSyncOrAsync,
        });
      }).toThrowError();
    });

    test('getHandler() throws correct error if no middleware is found & no ERROR event handler is attached', () => {
      expect(() => {
        serverlessly.getHandler({
          platformAdapter: dummyPlatformAdapterSyncOrAsync,
        });
      }).toThrow(new Error('No Middleware Found'));
    });

    test('getHandler() throws & emits correct error if no middleware is found, but ERROR event handler is attached', () => {
      expect(() => {
        serverlessly.on('ERROR', errorListener).getHandler({
          platformAdapter: dummyPlatformAdapterSyncOrAsync,
        });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(new Error('No Middleware Found'));
    });

    test('getHandler() returns handler of correct type', () => {
      expect<DummyHandlerSyncOrAsync>(
        serverlessly
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsync,
          })
      );
    });

    test('getHandler() returns correct handler', () => {
      expect(
        serverlessly
          .pipe(
            () => 'Hulk',
            () => 'Smash'
          )
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsync,
          })('Hulk Says:')
      ).resolves.toBe('Hulk Says: Hulk Smash');
    });

    test('getHandler() emits logs twice when it encounters no error', () => {
      serverlessly
        .pipe(() => 'Foo')
        .on('LOG', logsListener)
        .getHandler({ platformAdapter: dummyPlatformAdapterSyncOrAsync });

      expect(logsListener).toBeCalledTimes(2);
    });

    test('getHandler() emits correct logs when it encounters no error', () => {
      serverlessly
        .pipe(
          () => 'Foo',
          () => 'Bar'
        )
        .on('LOG', logsListener)
        .getHandler({ platformAdapter: dummyPlatformAdapterSyncOrAsync });

      expect(logsListener).nthCalledWith(1, 'getHandler: 2 middlewares found');
      expect(logsListener).nthCalledWith(
        2,
        'getHandler: Platform Adapter found'
      );
    });

    test('getHandler() throws error if middlewareEngine throws or encounters error', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSyncMiddlewareToSyncOrAsyncProtocol,
        })
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsync,
          });
      }).toThrowError();
    });

    test('getHandler() throws correct error if middlewareEngine throws or encounters error & there is no ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSyncMiddlewareToSyncOrAsyncProtocol,
        })
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsync,
          });
      }).toThrow(
        new Error(
          'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
        )
      );
    });

    test('getHandler() throws and emits correct error if middlewareEngine throws or encounters error & there is an ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSyncMiddlewareToSyncOrAsyncProtocol,
        })
          .on('ERROR', errorListener)
          .pipe(() => 'Foo')
          .getHandler({ platformAdapter: dummyPlatformAdapterSyncOrAsync });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(
        new Error('Faulty Middleware Engine\nRangeError: Invalid array length')
      );
    });

    test('getHandler() throws error if platformAdapter throws or encounters error', () => {
      expect(() => {
        serverlessly
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsync,
          });
      }).toThrowError();
    });

    test('getHandler() throws correct error if platformAdapter throws or encounters error & there is no ERROR event listener attached', () => {
      expect(() => {
        serverlessly
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsync,
          });
      }).toThrow(
        new Error(
          'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
        )
      );
    });

    test('getHandler() throws and emits correct error if platformAdapter throws or encounters error & there is an ERROR event listener attached', () => {
      expect(() => {
        serverlessly
          .on('ERROR', errorListener)
          .pipe(() => 'Foo')
          .getHandler({ platformAdapter: faultyPlatformAdapterSyncOrAsync });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(
        new Error('Faulty Platform Adapter\nRangeError: Invalid array length')
      );
    });

    test('getHandler() throws error if both middlewareEngine and platformAdapter throws or encounters error', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSyncMiddlewareToSyncOrAsyncProtocol,
        })
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsync,
          });
      }).toThrowError();
    });

    test('getHandler() throws correct error if both middlewareEngine and platformAdapter throws or encounters error & there is no ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSyncMiddlewareToSyncOrAsyncProtocol,
        })
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsync,
          });
      }).toThrow(
        new Error(
          'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
        )
      );
    });

    test('getHandler() throws and emits correct error if both middlewareEngine and platformAdapter throws or encounters error & there is an ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSyncMiddlewareToSyncOrAsyncProtocol,
        })
          .on('ERROR', errorListener)
          .pipe(() => 'Foo')
          .getHandler({ platformAdapter: faultyPlatformAdapterSyncOrAsync });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(
        new Error('Faulty Middleware Engine\nRangeError: Invalid array length')
      );
    });
  });

  describe('getHandler() method of ServerlesslySyncOrAsyncToAsync', () => {
    let serverlessly: ServerlesslySyncOrAsyncToAsync;
    let logsListener: jest.Mock;
    let errorListener: jest.Mock;

    beforeEach(() => {
      serverlessly = new Serverlessly({
        middlewareEngine: dummyMiddlewareEngineAsyncMiddlewareToSyncOrAsyncProtocol,
      });
      logsListener = jest.fn();
      errorListener = jest.fn();
    });

    test('getHandler() throws error if no middleware is found', () => {
      expect(() => {
        serverlessly.getHandler({
          platformAdapter: dummyPlatformAdapterSyncOrAsync,
        });
      }).toThrowError();
    });

    test('getHandler() throws correct error if no middleware is found & no ERROR event handler is attached', () => {
      expect(() => {
        serverlessly.getHandler({
          platformAdapter: dummyPlatformAdapterSyncOrAsync,
        });
      }).toThrow(new Error('No Middleware Found'));
    });

    test('getHandler() throws & emits correct error if no middleware is found, but ERROR event handler is attached', () => {
      expect(() => {
        serverlessly.on('ERROR', errorListener).getHandler({
          platformAdapter: dummyPlatformAdapterSyncOrAsync,
        });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(new Error('No Middleware Found'));
    });

    test('getHandler() returns handler of correct type', () => {
      expect<DummyHandlerSyncOrAsync>(
        serverlessly
          .pipe(async () => 'Foo')
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsync,
          })
      );
    });

    test('getHandler() returns correct handler', () => {
      expect(
        serverlessly
          .pipe(
            async () => 'Hulk',
            async () => 'Smash'
          )
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsync,
          })('Hulk Says:')
      ).resolves.toBe('Hulk Says: Hulk Smash');
    });

    test('getHandler() emits logs twice when it encounters no error', () => {
      serverlessly
        .pipe(async () => 'Foo')
        .on('LOG', logsListener)
        .getHandler({ platformAdapter: dummyPlatformAdapterSyncOrAsync });

      expect(logsListener).toBeCalledTimes(2);
    });

    test('getHandler() emits correct logs when it encounters no error', () => {
      serverlessly
        .pipe(
          async () => 'Foo',
          async () => 'Bar'
        )
        .on('LOG', logsListener)
        .getHandler({ platformAdapter: dummyPlatformAdapterSyncOrAsync });

      expect(logsListener).nthCalledWith(1, 'getHandler: 2 middlewares found');
      expect(logsListener).nthCalledWith(
        2,
        'getHandler: Platform Adapter found'
      );
    });

    test('getHandler() throws error if middlewareEngine throws or encounters error', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineAsyncMiddlewareToSyncOrAsyncProtocol,
        })
          .pipe(async () => 'Foo')
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsync,
          });
      }).toThrowError();
    });

    test('getHandler() throws correct error if middlewareEngine throws or encounters error & there is no ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineAsyncMiddlewareToSyncOrAsyncProtocol,
        })
          .pipe(async () => 'Foo')
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsync,
          });
      }).toThrow(
        new Error(
          'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
        )
      );
    });

    test('getHandler() throws and emits correct error if middlewareEngine throws or encounters error & there is an ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineAsyncMiddlewareToSyncOrAsyncProtocol,
        })
          .on('ERROR', errorListener)
          .pipe(async () => 'Foo')
          .getHandler({ platformAdapter: dummyPlatformAdapterSyncOrAsync });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(
        new Error('Faulty Middleware Engine\nRangeError: Invalid array length')
      );
    });

    test('getHandler() throws error if platformAdapter throws or encounters error', () => {
      expect(() => {
        serverlessly
          .pipe(async () => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsync,
          });
      }).toThrowError();
    });

    test('getHandler() throws correct error if platformAdapter throws or encounters error & there is no ERROR event listener attached', () => {
      expect(() => {
        serverlessly
          .pipe(async () => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsync,
          });
      }).toThrow(
        new Error(
          'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
        )
      );
    });

    test('getHandler() throws and emits correct error if platformAdapter throws or encounters error & there is an ERROR event listener attached', () => {
      expect(() => {
        serverlessly
          .on('ERROR', errorListener)
          .pipe(async () => 'Foo')
          .getHandler({ platformAdapter: faultyPlatformAdapterSyncOrAsync });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(
        new Error('Faulty Platform Adapter\nRangeError: Invalid array length')
      );
    });

    test('getHandler() throws error if both middlewareEngine and platformAdapter throws or encounters error', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineAsyncMiddlewareToSyncOrAsyncProtocol,
        })
          .pipe(async () => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsync,
          });
      }).toThrowError();
    });

    test('getHandler() throws correct error if both middlewareEngine and platformAdapter throws or encounters error & there is no ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineAsyncMiddlewareToSyncOrAsyncProtocol,
        })
          .pipe(async () => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsync,
          });
      }).toThrow(
        new Error(
          'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
        )
      );
    });

    test('getHandler() throws and emits correct error if both middlewareEngine and platformAdapter throws or encounters error & there is an ERROR event listener attached', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineAsyncMiddlewareToSyncOrAsyncProtocol,
        })
          .on('ERROR', errorListener)
          .pipe(async () => 'Foo')
          .getHandler({ platformAdapter: faultyPlatformAdapterSyncOrAsync });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(
        new Error('Faulty Middleware Engine\nRangeError: Invalid array length')
      );
    });
  });
});
