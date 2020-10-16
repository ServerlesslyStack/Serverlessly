import { Serverlessly } from '@serverlessly/core';
import {
  DummyHandlerAsync,
  DummyHandlerSync,
  DummyHandlerSyncOrAsync,
  dummyMiddlewareEngineAsync,
  dummyMiddlewareEngineAsyncWithSyncOrAsyncProtocol,
  dummyMiddlewareEngineSync,
  dummyMiddlewareEngineSyncMiddlewareToAsyncProtocol,
  dummyMiddlewareEngineSyncOrAsync,
  dummyMiddlewareEngineSyncWithSyncOrAsyncProtocol,
  dummyPlatformAdapterAsync,
  dummyPlatformAdapterAsyncHandlerToSyncProtocol,
  dummyPlatformAdapterSync,
  dummyPlatformAdapterSyncOrAsync,
  dummyPlatformAdapterSyncOrAsyncStrict,
  DummyProtocolAsync,
  DummyProtocolSync,
  DummyProtocolSyncOrAsync,
  faultyMiddlewareEngineAsync,
  faultyMiddlewareEngineSync,
  faultyMiddlewareEngineSyncMiddlewareToAsyncProtocol,
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

  describe('getHandler() method of ServerlesslySyncOrAsync', () => {
    let serverlessly: ServerlesslySyncOrAsync;

    beforeEach(() => {
      serverlessly = new Serverlessly({
        middlewareEngine: dummyMiddlewareEngineSyncOrAsync,
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

    test('getHandler() throws error if middlewareEngine throws or encounters error', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSyncOrAsync,
        })
          .pipe(async () => 'Foo')
          .getHandler();
      }).toThrowError();
    });
  });

  describe('getHandler() method of ServerlesslySyncOrAsyncToSync', () => {
    let serverlessly: ServerlesslySyncOrAsyncToSync;

    beforeEach(() => {
      serverlessly = new Serverlessly({
        middlewareEngine: dummyMiddlewareEngineSyncWithSyncOrAsyncProtocol,
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

    test('getHandler() throws error if middlewareEngine throws or encounters error', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineSync })
          .pipe(() => 'Foo')
          .getHandler();
      }).toThrowError();
    });
  });

  describe('getHandler() method of ServerlesslySyncOrAsyncToAsync', () => {
    let serverlessly: ServerlesslySyncOrAsyncToAsync;

    beforeEach(() => {
      serverlessly = new Serverlessly({
        middlewareEngine: dummyMiddlewareEngineAsyncWithSyncOrAsyncProtocol,
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

    test('getHandler() throws error if middlewareEngine throws or encounters error', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineAsync })
          .pipe(async () => 'Foo')
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

  // dummyPlatformAdapterSync isn't compatible with ServerlesslyAsync, ServerlesslyAsyncToSync, ServerlesslySyncOrAsync, ServerlesslySyncOrAsyncToSync & ServerlesslySyncOrAsyncToAsync
  // Reason: Protocol Incompatibility
});

describe('dummyPlatFormAdapterAsync', () => {
  // dummyPlatformAdapterAsync isn't compatible with ServerlesslySync, ServerlesslySyncOrAsync, ServerlesslySyncOrAsyncToSync & ServerlesslySyncOrAsyncToAsync
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

describe('dummyPlatformAdapterAsyncHandlerToSyncProtocol', () => {
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

  // dummyPlatformAdapterAsyncHanderToSyncProtocol isn't compatible with ServerlesslyAsync, ServerlesslyAsyncToSync, ServerlesslySyncOrAsync, ServerlesslySyncOrAsyncToSync & ServerlesslySyncOrAsyncToAsync
  // Reason: Protocol Incompatibility
});

describe('dummyPlatformAdapterSyncOrAsyncStrict', () => {
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
          platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
        });
      }).toThrowError();
    });

    test('getHandler() throws specific error if no middleware is found', () => {
      expect(() => {
        serverlessly.getHandler({
          platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
        });
      }).toThrowError('No Middleware Found');
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

    test('getHandler() throws error if middlewareEngine throws or encounters error', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineSync })
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrowError();
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

    test('getHandler() throws error if both middlewareEngine and platformAdapter throws or encounters error', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSync,
        })
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsyncStrict,
          });
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
        serverlessly.getHandler({
          platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
        });
      }).toThrowError();
    });

    test('getHandler() throws specific error if no middleware is found', () => {
      expect(() => {
        serverlessly.getHandler({
          platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
        });
      }).toThrowError('No Middleware Found');
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

    test('getHandler() throws error if middlewareEngine throws or encounters error', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineAsync })
          .pipe(async () => 'Foo')
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrowError();
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

    test('getHandler() throws error if both middlewareEngine and platformAdapter throws or encounters error', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineAsync,
        })
          .pipe(async () => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsyncStrict,
          });
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
        serverlessly.getHandler({
          platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
        });
      }).toThrowError();
    });

    test('getHandler() throws specific error if no middleware is found', () => {
      expect(() => {
        serverlessly.getHandler({
          platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
        });
      }).toThrowError('No Middleware Found');
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

    test('getHandler() throws error if platformAdapter throws or encounters error', () => {
      expect(() => {
        serverlessly
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrowError();
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
  });

  describe('getHandler() method of ServerlesslySyncOrAsync', () => {
    let serverlessly: ServerlesslySyncOrAsync;

    beforeEach(() => {
      serverlessly = new Serverlessly({
        middlewareEngine: dummyMiddlewareEngineSyncOrAsync,
      });
    });

    test('getHandler() throws error if no middleware is found', () => {
      expect(() => {
        serverlessly.getHandler({
          platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
        });
      }).toThrowError();
    });

    test('getHandler() throws specific error if no middleware is found', () => {
      expect(() => {
        serverlessly.getHandler({
          platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
        });
      }).toThrowError('No Middleware Found');
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

    test('getHandler() throws error if middlewareEngine throws or encounters error', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSyncOrAsync,
        })
          .pipe(async () => 'Foo')
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrowError();
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

    test('getHandler() throws error if both middlewareEngine and platformAdapter throws or encounters error', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSyncOrAsync,
        })
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrowError();
    });
  });

  describe('getHandler() method of ServerlesslySyncOrAsyncToSync', () => {
    let serverlessly: ServerlesslySyncOrAsyncToSync;

    beforeEach(() => {
      serverlessly = new Serverlessly({
        middlewareEngine: dummyMiddlewareEngineSyncWithSyncOrAsyncProtocol,
      });
    });

    test('getHandler() throws error if no middleware is found', () => {
      expect(() => {
        serverlessly.getHandler({
          platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
        });
      }).toThrowError();
    });

    test('getHandler() throws specific error if no middleware is found', () => {
      expect(() => {
        serverlessly.getHandler({
          platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
        });
      }).toThrowError('No Middleware Found');
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

    test('getHandler() throws error if middlewareEngine throws or encounters error', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineSync })
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrowError();
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

    test('getHandler() throws error if both middlewareEngine and platformAdapter throws or encounters error', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSync,
        })
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrowError();
    });
  });

  describe('getHandler() method of ServerlesslySyncOrAsyncToAsync', () => {
    let serverlessly: ServerlesslySyncOrAsyncToAsync;

    beforeEach(() => {
      serverlessly = new Serverlessly({
        middlewareEngine: dummyMiddlewareEngineAsyncWithSyncOrAsyncProtocol,
      });
    });

    test('getHandler() throws error if no middleware is found', () => {
      expect(() => {
        serverlessly.getHandler({
          platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
        });
      }).toThrowError();
    });

    test('getHandler() throws specific error if no middleware is found', () => {
      expect(() => {
        serverlessly.getHandler({
          platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
        });
      }).toThrowError('No Middleware Found');
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

    test('getHandler() throws error if middlewareEngine throws or encounters error', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineAsync })
          .pipe(async () => 'Foo')
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrowError();
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

    test('getHandler() throws error if both middlewareEngine and platformAdapter throws or encounters error', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineAsync,
        })
          .pipe(async () => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsyncStrict,
          });
      }).toThrowError();
    });
  });
});

describe('dummyPlatformAdapterSyncOrAsync', () => {
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
          platformAdapter: dummyPlatformAdapterSyncOrAsync,
        });
      }).toThrowError();
    });

    test('getHandler() throws specific error if no middleware is found', () => {
      expect(() => {
        serverlessly.getHandler({
          platformAdapter: dummyPlatformAdapterSyncOrAsync,
        });
      }).toThrowError('No Middleware Found');
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

    test('getHandler() throws error if middlewareEngine throws or encounters error', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineSync })
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsync,
          });
      }).toThrowError();
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

    test('getHandler() throws error if both middlewareEngine and platformAdapter throws or encounters error', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSync,
        })
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsync,
          });
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
        serverlessly.getHandler({
          platformAdapter: dummyPlatformAdapterSyncOrAsync,
        });
      }).toThrowError();
    });

    test('getHandler() throws specific error if no middleware is found', () => {
      expect(() => {
        serverlessly.getHandler({
          platformAdapter: dummyPlatformAdapterSyncOrAsync,
        });
      }).toThrowError('No Middleware Found');
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

    test('getHandler() throws error if middlewareEngine throws or encounters error', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineAsync })
          .pipe(async () => 'Foo')
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsync,
          });
      }).toThrowError();
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

    test('getHandler() throws error if both middlewareEngine and platformAdapter throws or encounters error', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineAsync,
        })
          .pipe(async () => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsync,
          });
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
        serverlessly.getHandler({
          platformAdapter: dummyPlatformAdapterSyncOrAsync,
        });
      }).toThrowError();
    });

    test('getHandler() throws specific error if no middleware is found', () => {
      expect(() => {
        serverlessly.getHandler({
          platformAdapter: dummyPlatformAdapterSyncOrAsync,
        });
      }).toThrowError('No Middleware Found');
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

    test('getHandler() throws error if platformAdapter throws or encounters error', () => {
      expect(() => {
        serverlessly
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsync,
          });
      }).toThrowError();
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
  });

  describe('getHandler() method of ServerlesslySyncOrAsync', () => {
    let serverlessly: ServerlesslySyncOrAsync;

    beforeEach(() => {
      serverlessly = new Serverlessly({
        middlewareEngine: dummyMiddlewareEngineSyncOrAsync,
      });
    });

    test('getHandler() throws error if no middleware is found', () => {
      expect(() => {
        serverlessly.getHandler({
          platformAdapter: dummyPlatformAdapterSyncOrAsync,
        });
      }).toThrowError();
    });

    test('getHandler() throws specific error if no middleware is found', () => {
      expect(() => {
        serverlessly.getHandler({
          platformAdapter: dummyPlatformAdapterSyncOrAsync,
        });
      }).toThrowError('No Middleware Found');
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

    test('getHandler() throws error if platformAdapter throws or encounters error', () => {
      expect(() => {
        serverlessly
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsync,
          });
      }).toThrowError();
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
  });

  describe('getHandler() method of ServerlesslySyncOrAsyncToSync', () => {
    let serverlessly: ServerlesslySyncOrAsyncToSync;

    beforeEach(() => {
      serverlessly = new Serverlessly({
        middlewareEngine: dummyMiddlewareEngineSyncWithSyncOrAsyncProtocol,
      });
    });

    test('getHandler() throws error if no middleware is found', () => {
      expect(() => {
        serverlessly.getHandler({
          platformAdapter: dummyPlatformAdapterSyncOrAsync,
        });
      }).toThrowError();
    });

    test('getHandler() throws specific error if no middleware is found', () => {
      expect(() => {
        serverlessly.getHandler({
          platformAdapter: dummyPlatformAdapterSyncOrAsync,
        });
      }).toThrowError('No Middleware Found');
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

    test('getHandler() throws error if middlewareEngine throws or encounters error', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineSync })
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsync,
          });
      }).toThrowError();
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

    test('getHandler() throws error if both middlewareEngine and platformAdapter throws or encounters error', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineSync,
        })
          .pipe(() => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsync,
          });
      }).toThrowError();
    });
  });

  describe('getHandler() method of ServerlesslySyncOrAsyncToAsync', () => {
    let serverlessly: ServerlesslySyncOrAsyncToAsync;

    beforeEach(() => {
      serverlessly = new Serverlessly({
        middlewareEngine: dummyMiddlewareEngineAsyncWithSyncOrAsyncProtocol,
      });
    });

    test('getHandler() throws error if no middleware is found', () => {
      expect(() => {
        serverlessly.getHandler({
          platformAdapter: dummyPlatformAdapterSyncOrAsync,
        });
      }).toThrowError();
    });

    test('getHandler() throws specific error if no middleware is found', () => {
      expect(() => {
        serverlessly.getHandler({
          platformAdapter: dummyPlatformAdapterSyncOrAsync,
        });
      }).toThrowError('No Middleware Found');
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

    test('getHandler() throws error if middlewareEngine throws or encounters error', () => {
      expect(() => {
        new Serverlessly({ middlewareEngine: faultyMiddlewareEngineAsync })
          .pipe(async () => 'Foo')
          .getHandler({
            platformAdapter: dummyPlatformAdapterSyncOrAsync,
          });
      }).toThrowError();
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

    test('getHandler() throws error if both middlewareEngine and platformAdapter throws or encounters error', () => {
      expect(() => {
        new Serverlessly({
          middlewareEngine: faultyMiddlewareEngineAsync,
        })
          .pipe(async () => 'Foo')
          .getHandler({
            platformAdapter: faultyPlatformAdapterSyncOrAsync,
          });
      }).toThrowError();
    });
  });
});
