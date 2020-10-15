import { Serverlessly } from '@serverlessly/core';
import {
  DummyHandlerAsync,
  DummyHandlerSync,
  dummyMiddlewareEngineAsync,
  dummyMiddlewareEngineSync,
  dummyMiddlewareEngineSyncMiddlewareToAsyncProtocol,
  dummyPlatformAdapterAsync,
  dummyPlatformAdapterAsyncHandlerToSyncProtocol,
  dummyPlatformAdapterSync,
  DummyProtocolAsync,
  DummyProtocolSync,
  faultyMiddlewareEngineAsync,
  faultyMiddlewareEngineSync,
  faultyMiddlewareEngineSyncMiddlewareToAsyncProtocol,
  faultyPlatformAdapterAsync,
  faultyPlatformAdapterAsyncHandlerToSyncProtocol,
  faultyPlatformAdapterSync,
  ServerlesslyAsync,
  ServerlesslyAsyncToSync,
  ServerlesslySync,
} from '../dummies';

describe('No platFormAdapter', () => {
  describe('getHandler() method of ServerlesslySync', () => {
    let serverlessly: ServerlesslySync;

    beforeEach(() => {
      serverlessly = new Serverlessly({
        middlewareEngine: dummyMiddlewareEngineSync,
      });
    });

    test('getHandler() throws error if no middleware is found', () => {
      expect(() => {
        serverlessly.getHandler();
      }).toThrowError();
    });

    test('getHandler() throws specific error if no middleware is found', () => {
      expect(() => {
        serverlessly.getHandler();
      }).toThrowError('No Middleware Found');
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

    test('getHandler() throws error if middlewareEngine throws or encounters error', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineSync })
          .pipe(() => 'Foo')
          .getHandler();
      }).toThrowError();
    });
  });

  describe('getHandler() method of ServerlesslyAsync', () => {
    let serverlessly: ServerlesslyAsync;

    beforeEach(() => {
      serverlessly = new Serverlessly({
        middlewareEngine: dummyMiddlewareEngineAsync,
      });
    });

    test('getHandler() throws error if no middleware is found', () => {
      expect(() => {
        serverlessly.getHandler();
      }).toThrowError();
    });

    test('getHandler() throws specific error if no middleware is found', () => {
      expect(() => {
        serverlessly.getHandler();
      }).toThrowError('No Middleware Found');
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

    test('getHandler() throws error if middlewareEngine throws or encounters error', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineAsync })
          .pipe(async () => 'Foo')
          .getHandler();
      }).toThrowError();
    });
  });

  describe('getHandler() method of ServerlesslyAsyncToSync', () => {
    let serverlessly: ServerlesslyAsyncToSync;

    beforeEach(() => {
      serverlessly = new Serverlessly({
        middlewareEngine: dummyMiddlewareEngineSyncMiddlewareToAsyncProtocol,
      });
    });

    test('getHandler() throws error if no middleware is found', () => {
      expect(() => {
        serverlessly.getHandler();
      }).toThrowError();
    });

    test('getHandler() throws specific error if no middleware is found', () => {
      expect(() => {
        serverlessly.getHandler();
      }).toThrowError('No Middleware Found');
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

    test('getHandler() throws error if middlewareEngine throws or encounters error', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSyncMiddlewareToAsyncProtocol,
        })
          .pipe(() => 'Foo')
          .getHandler();
      }).toThrowError();
    });
  });
});

describe('dummyPlatFormAdapterSync', () => {
  describe('getHandler() method of ServerlesslySync', () => {
    let serverlessly: ServerlesslySync;

    beforeEach(() => {
      serverlessly = new Serverlessly({
        middlewareEngine: dummyMiddlewareEngineSync,
      });
    });

    test('getHandler() throws error if no middleware is found', () => {
      expect(() => {
        serverlessly.getHandler({ platformAdapter: dummyPlatformAdapterSync });
      }).toThrowError();
    });

    test('getHandler() throws specific error if no middleware is found', () => {
      expect(() => {
        serverlessly.getHandler({ platformAdapter: dummyPlatformAdapterSync });
      }).toThrowError('No Middleware Found');
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

    test('getHandler() throws error if middlewareEngine throws or encounters error', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineSync })
          .pipe(() => 'Foo')
          .getHandler({ platformAdapter: dummyPlatformAdapterSync });
      }).toThrowError();
    });

    test('getHandler() throws error if platformAdapter throws or encounters error', () => {
      expect(() => {
        serverlessly
          .pipe(() => 'Foo')
          .getHandler({ platformAdapter: faultyPlatformAdapterSync });
      }).toThrowError();
    });

    test('getHandler() throws error if both middlewareEngine and platformAdapter throws or encounters error', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineSync })
          .pipe(() => 'Foo')
          .getHandler({ platformAdapter: faultyPlatformAdapterSync });
      }).toThrowError();
    });
  });

  // dummyPlatformAdapterSync isn't compatible with ServerlesslyAsync & ServerlesslyAsyncToSync
  // Reason: Protocol Incompatibility
});

describe('dummyPlatFormAdapterAsync', () => {
  // dummyPlatformAdapterAsync isn't compatible with ServerlesslySync
  // Reason: Protocol Incompatibility

  describe('getHandler() method of ServerlesslyAsync', () => {
    let serverlessly: ServerlesslyAsync;

    beforeEach(() => {
      serverlessly = new Serverlessly({
        middlewareEngine: dummyMiddlewareEngineAsync,
      });
    });

    test('getHandler() throws error if no middleware is found', () => {
      expect(() => {
        serverlessly.getHandler({ platformAdapter: dummyPlatformAdapterAsync });
      }).toThrowError();
    });

    test('getHandler() throws specific error if no middleware is found', () => {
      expect(() => {
        serverlessly.getHandler({ platformAdapter: dummyPlatformAdapterAsync });
      }).toThrowError('No Middleware Found');
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

    test('getHandler() throws error if middlewareEngine throws or encounters error', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineAsync })
          .pipe(async () => 'Foo')
          .getHandler({ platformAdapter: dummyPlatformAdapterAsync });
      }).toThrowError();
    });

    test('getHandler() throws error if platformAdapter throws or encounters error', () => {
      expect(() => {
        serverlessly
          .pipe(async () => 'Foo')
          .getHandler({ platformAdapter: faultyPlatformAdapterAsync });
      }).toThrowError();
    });

    test('getHandler() throws error if both middlewareEngine and platformAdapter throws or encounters error', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineAsync })
          .pipe(async () => 'Foo')
          .getHandler({ platformAdapter: faultyPlatformAdapterAsync });
      }).toThrowError();
    });
  });

  describe('getHandler() method of ServerlesslyAsyncToSync', () => {
    let serverlessly: ServerlesslyAsyncToSync;

    beforeEach(() => {
      serverlessly = new Serverlessly({
        middlewareEngine: dummyMiddlewareEngineSyncMiddlewareToAsyncProtocol,
      });
    });

    test('getHandler() throws error if no middleware is found', () => {
      expect(() => {
        serverlessly.getHandler({ platformAdapter: dummyPlatformAdapterAsync });
      }).toThrowError();
    });

    test('getHandler() throws specific error if no middleware is found', () => {
      expect(() => {
        serverlessly.getHandler({ platformAdapter: dummyPlatformAdapterAsync });
      }).toThrowError('No Middleware Found');
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

    test('getHandler() throws error if middlewareEngine throws or encounters error', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSyncMiddlewareToAsyncProtocol,
        })
          .pipe(() => 'Foo')
          .getHandler({ platformAdapter: dummyPlatformAdapterAsync });
      }).toThrowError();
    });

    test('getHandler() throws error if platformAdapter throws or encounters error', () => {
      expect(() => {
        serverlessly
          .pipe(() => 'Foo')
          .getHandler({ platformAdapter: faultyPlatformAdapterAsync });
      }).toThrowError();
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
  });
});

describe('dummyPlatformAdapterAsyncHanderToSyncProtocol', () => {
  describe('getHandler() method of ServerlesslySync', () => {
    let serverlessly: ServerlesslySync;

    beforeEach(() => {
      serverlessly = new Serverlessly({
        middlewareEngine: dummyMiddlewareEngineSync,
      });
    });

    test('getHandler() throws error if no middleware is found', () => {
      expect(() => {
        serverlessly.getHandler({
          platformAdapter: dummyPlatformAdapterAsyncHandlerToSyncProtocol,
        });
      }).toThrowError();
    });

    test('getHandler() throws specific error if no middleware is found', () => {
      expect(() => {
        serverlessly.getHandler({
          platformAdapter: dummyPlatformAdapterAsyncHandlerToSyncProtocol,
        });
      }).toThrowError('No Middleware Found');
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

    test('getHandler() throws error if middlewareEngine throws or encounters error', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineSync })
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: dummyPlatformAdapterAsyncHandlerToSyncProtocol,
          });
      }).toThrowError();
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

    test('getHandler() throws error if both middlewareEngine and platformAdapter throws or encounters error', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSync,
        })
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterAsyncHandlerToSyncProtocol,
          });
      }).toThrowError();
    });
  });

  // dummyPlatformAdapterAsyncHanderToSyncProtocol isn't compatible with ServerlesslyAsync & ServerlesslyAsyncToSync
  // Reason: Protocol Incompatibility
});
