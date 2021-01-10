/* eslint-disable no-empty */
import {
  HandlerProps,
  MiddlewareEngine,
  PlatformAdapter,
  Serverlessly,
} from '@serverlessly/core';
import * as validateMiddleware from '../lib/helpers/validate-middlewares';
import * as protocolContext from '../lib/helpers/protocol-context';
import * as platformHandler from '../lib/helpers/platform-handler';
import { dummyMiddlewareEngineSync } from './dummies/middleware-engines';
import { dummyMiddlewaresSync } from './dummies/middlewares';
import { dummyPlatformAdapterSync } from './dummies/platform-adapters';
import { dummyProtocolSync } from './dummies/protocols';
import { ServerlesslySync } from './dummies/serverlessly';
import { DummyProtocolContextSync } from './dummies/protocol-contexts';
import { protocolServerAdapter } from '../lib/protocol';

const protocol = dummyProtocolSync;
const middlewareEngine = dummyMiddlewareEngineSync;
const middlewares = dummyMiddlewaresSync;
const platformAdapter = dummyPlatformAdapterSync;

function finishEventLoop() {
  return new Promise((resolve) => setImmediate(resolve));
}

describe('Serverlessly Constructor Tests', () => {
  let logsListener: jest.Mock;

  beforeEach(() => {
    logsListener = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Serverlessly is successfully initialized without Middleware Engine', () => {
    expect(new Serverlessly({ protocol })).toBeTruthy();
  });

  test('Serverlessly is successfully initialized with Middleware Engine', () => {
    expect(new Serverlessly({ protocol, middlewareEngine })).toBeTruthy();
  });

  test('Serverlessly instance has correct middlewareEngine & protocolServerFactory values when it is initialized without Middleware Engine', () => {
    expect(new Serverlessly({ protocol })).toMatchObject({
      middlewareEngine: protocol.middlewareEngine,
      protocolServerFactory: protocol.serverFactory,
    });
  });

  test('Serverlessly instance has correct middlewareEngine & protocolServerFactory values when it is initialized with Middleware Engine', () => {
    expect(
      new Serverlessly({
        protocol,
        middlewareEngine,
      })
    ).toMatchObject({
      middlewareEngine,
      protocolServerFactory: protocol.serverFactory,
    });
  });

  test('Serverlessly emits log once after initialization', async () => {
    new Serverlessly({ protocol }).on('LOG', logsListener);
    await finishEventLoop();
    expect(logsListener).toBeCalled();
    expect(logsListener).toBeCalledTimes(1);
  });

  test('Serverlessly emits correct log after initialization', async () => {
    new Serverlessly({ protocol }).on('LOG', logsListener);
    await finishEventLoop();
    expect(logsListener).toBeCalledWith(
      `Serverlessly microservice initialized successfully with ${protocol.name} protocol.`
    );
  });
});

describe('pipe() Tests', () => {
  let serverlessly: ServerlesslySync;

  let logsListener: jest.Mock;
  let newMiddlewaresListener: jest.Mock;
  let middlewaresListener: jest.Mock;

  beforeEach(() => {
    serverlessly = new Serverlessly({
      protocol,
    });

    logsListener = jest.fn();
    newMiddlewaresListener = jest.fn();
    middlewaresListener = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('pipe() returns Serverlessly instance', () => {
    expect(
      serverlessly.pipe(middlewares[0], ...middlewares.slice(1))
    ).toBeInstanceOf(Serverlessly);
  });

  test('pipe() returns same Serverlessly instance', () => {
    expect(serverlessly.pipe(middlewares[0], ...middlewares.slice(1))).toBe(
      serverlessly
    );
  });

  test('multiple pipe() methods can be chained', () => {
    expect(() => {
      serverlessly.pipe(middlewares[0]).pipe(middlewares[1]);
    }).not.toThrowError();
  });

  test('pipe() properly updates internal state', () => {
    expect(
      serverlessly
        .pipe(middlewares[0])
        .pipe(middlewares[1])
        .pipe(middlewares[2], middlewares[3])['middlewares']
    ).toStrictEqual(middlewares);
  });

  describe('Events emitted by pipe()', () => {
    test('Events are emitted', () => {
      serverlessly
        .on('LOG', logsListener)
        .on('NEW_MIDDLEWARES', newMiddlewaresListener)
        .on('MIDDLEWARES', middlewaresListener)
        .pipe(middlewares[0]);
      expect(logsListener).toBeCalled();
      expect(newMiddlewaresListener).toBeCalled();
      expect(middlewaresListener).toBeCalled();
    });

    test('events are emitted n times for n pipe methods', () => {
      const app = serverlessly
        .on('LOG', logsListener)
        .on('NEW_MIDDLEWARES', newMiddlewaresListener)
        .on('MIDDLEWARES', middlewaresListener);
      expect(logsListener).toBeCalledTimes(0);
      expect(newMiddlewaresListener).toBeCalledTimes(0);
      expect(middlewaresListener).toBeCalledTimes(0);

      app.pipe(middlewares[0]).pipe(middlewares[1]);
      expect(logsListener).toBeCalledTimes(2);
      expect(newMiddlewaresListener).toBeCalledTimes(2);
      expect(middlewaresListener).toBeCalledTimes(2);

      app.pipe(middlewares[2]);
      expect(logsListener).toBeCalledTimes(3);
      expect(newMiddlewaresListener).toBeCalledTimes(3);
      expect(middlewaresListener).toBeCalledTimes(3);

      app.pipe(middlewares[3]).pipe(middlewares[0]);
      expect(logsListener).toBeCalledTimes(5);
      expect(newMiddlewaresListener).toBeCalledTimes(5);
      expect(middlewaresListener).toBeCalledTimes(5);
    });

    test('correct events are emitted', () => {
      const app = serverlessly
        .on('LOG', logsListener)
        .on('NEW_MIDDLEWARES', newMiddlewaresListener)
        .on('MIDDLEWARES', middlewaresListener)
        .pipe(middlewares[0], middlewares[1]);
      expect(logsListener).toBeCalledWith(
        'pipe: 2 middlewares registered (new global middlewares count: 2)'
      );
      expect(newMiddlewaresListener).toBeCalledWith([
        middlewares[0],
        middlewares[1],
      ]);
      expect(middlewaresListener).toBeCalledWith([
        middlewares[0],
        middlewares[1],
      ]);

      app.pipe(middlewares[2]);
      expect(logsListener).lastCalledWith(
        'pipe: 1 middleware registered (new global middlewares count: 3)'
      );
      expect(newMiddlewaresListener).lastCalledWith([middlewares[2]]);
      expect(middlewaresListener).lastCalledWith([
        middlewares[0],
        middlewares[1],
        middlewares[2],
      ]);

      app.pipe(middlewares[3]);
      expect(logsListener).lastCalledWith(
        'pipe: 1 middleware registered (new global middlewares count: 4)'
      );
      expect(newMiddlewaresListener).lastCalledWith([middlewares[3]]);
      expect(middlewaresListener).lastCalledWith([
        middlewares[0],
        middlewares[1],
        middlewares[2],
        middlewares[3],
      ]);
    });
  });
});

describe('getHandler() Tests', () => {
  let serverlessly: ServerlesslySync;

  let logsListener: jest.Mock;
  let errorListener: jest.Mock;

  let validateMiddlewareSpy: jest.SpyInstance<void, [middlewares: unknown[]]>;
  let getProtocolContextSpy: jest.SpyInstance<
    unknown,
    [
      middlewareEngine: MiddlewareEngine<Function, unknown>,
      middlewares: unknown[]
    ]
  >;
  let getPlatformHandlerSpy: jest.SpyInstance<
    unknown,
    [
      platformAdapter: PlatformAdapter<Function, unknown>,
      protocolContext: Function
    ]
  >;

  beforeEach(() => {
    serverlessly = new Serverlessly({
      protocol,
    });

    logsListener = jest.fn();
    errorListener = jest.fn();

    validateMiddlewareSpy = jest.spyOn(
      validateMiddleware,
      'validateMiddlewares'
    );
    getProtocolContextSpy = jest.spyOn(protocolContext, 'getProtocolContext');
    getPlatformHandlerSpy = jest.spyOn(platformHandler, 'getPlatformHandler');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getHandler() calls validateMiddleware() once', () => {
    serverlessly.pipe(middlewares[0]).getHandler({ platformAdapter });
    expect(validateMiddlewareSpy).toBeCalledTimes(1);
  });

  test('getHandler() calls validateMiddleware() with correct argument', () => {
    serverlessly.pipe(middlewares[0]).getHandler({ platformAdapter });
    expect(validateMiddlewareSpy).toBeCalledWith([middlewares[0]]);
  });

  describe('if validateMiddleware() throws', () => {
    beforeEach(() => {
      validateMiddlewareSpy.mockImplementationOnce(() => {
        throw new Error('Dummy Error');
      });
    });

    test('getHandler() throws', () => {
      expect(() => {
        serverlessly.pipe(middlewares[0]).getHandler({ platformAdapter });
      }).toThrow();
    });

    test('getHandler() throws correct error if no ERROR listener is attached', () => {
      expect(() => {
        serverlessly.pipe(middlewares[0]).getHandler({ platformAdapter });
      }).toThrow(
        new Error(
          'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
        )
      );
    });

    test('getHandler() throws & emits correct error if ERROR listener is attached', () => {
      expect(() => {
        serverlessly
          .on('ERROR', errorListener)
          .pipe(middlewares[0])
          .getHandler({ platformAdapter });
      }).toThrow(new Error());

      expect(errorListener).toBeCalledWith(new Error('Dummy Error'));
    });

    test('getHandler() does not emit logs', () => {
      try {
        serverlessly
          .pipe(middlewares[0])
          .on('LOG', logsListener)
          .getHandler({ platformAdapter });
      } catch (error) {}

      expect(logsListener).not.toBeCalled();
    });

    test('getHandler() does not call getProtocolContext() or getPlatformHandler()', () => {
      try {
        serverlessly.pipe(middlewares[0]).getHandler({ platformAdapter });
      } catch (error) {}

      expect(getProtocolContextSpy).not.toBeCalled();
      expect(getPlatformHandlerSpy).not.toBeCalled();
    });
  });

  describe('if validateMiddlewares() does not throw', () => {
    beforeEach(() => {
      validateMiddlewareSpy.mockImplementationOnce(() => {
        return;
      });
    });

    test('getHandler() calls getProtocolContext() once', () => {
      serverlessly.pipe(middlewares[0]).getHandler({ platformAdapter });
      expect(getProtocolContextSpy).toBeCalledTimes(1);
    });

    test('getHandler() calls getProtocolContext() with correct argument', () => {
      serverlessly.pipe(middlewares[0]).getHandler({ platformAdapter });
      expect(getProtocolContextSpy).toBeCalledWith(middlewareEngine, [
        middlewares[0],
      ]);
    });

    test('getHandler() emits logs once', () => {
      serverlessly
        .pipe(middlewares[0])
        .on('LOG', logsListener)
        .getHandler({ platformAdapter });

      expect(logsListener).toBeCalledTimes(1);
    });

    test('getHandler() emits correct logs', () => {
      const app = serverlessly.pipe(middlewares[0]);

      app.on('LOG', logsListener).getHandler({ platformAdapter });
      expect(logsListener).toBeCalledWith('getHandler: 1 middleware found');

      app.pipe(middlewares[1]);
      app.on('LOG', logsListener).getHandler({ platformAdapter });
      expect(logsListener).lastCalledWith('getHandler: 2 middlewares found');
    });

    describe('if getProtocolContext() throws', () => {
      beforeEach(() => {
        getProtocolContextSpy.mockImplementationOnce(() => {
          throw new Error('Dummy Error');
        });
      });

      test('getHandler() throws', () => {
        expect(() => {
          serverlessly.pipe(middlewares[0]).getHandler({ platformAdapter });
        }).toThrow();
      });

      test('getHandler() throws correct error if no ERROR listener is attached', () => {
        expect(() => {
          serverlessly.pipe(middlewares[0]).getHandler({ platformAdapter });
        }).toThrow(
          new Error(
            'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
          )
        );
      });

      test('getHandler() throws & emits correct error if ERROR listener is attached', () => {
        expect(() => {
          serverlessly
            .on('ERROR', errorListener)
            .pipe(middlewares[0])
            .getHandler({ platformAdapter });
        }).toThrow(new Error());

        expect(errorListener).toBeCalledWith(new Error('Dummy Error'));
      });

      test('getHandler() does not call getPlatformHandler()', () => {
        try {
          serverlessly.pipe(middlewares[0]).getHandler({ platformAdapter });
        } catch (error) {}

        expect(getPlatformHandlerSpy).not.toBeCalled();
      });
    });

    describe('if getProtocolContext() does not throw', () => {
      beforeEach(() => {
        getProtocolContextSpy.mockImplementationOnce(() => {
          return 'Foo';
        });
      });

      test('getHandler() calls getPlatformHandler() once', () => {
        serverlessly.pipe(middlewares[0]).getHandler({ platformAdapter });
        expect(getPlatformHandlerSpy).toBeCalledTimes(1);
      });

      test('getHandler() calls getPlatformHandler() with correct argument', () => {
        serverlessly.pipe(middlewares[0]).getHandler({ platformAdapter });
        expect(getPlatformHandlerSpy).toBeCalledWith(platformAdapter, 'Foo');
      });

      describe('if getPlatformHandler() throws', () => {
        beforeEach(() => {
          getPlatformHandlerSpy.mockImplementationOnce(() => {
            throw new Error('Dummy Error');
          });
        });

        test('getHandler() throws', () => {
          expect(() => {
            serverlessly.pipe(middlewares[0]).getHandler({ platformAdapter });
          }).toThrow();
        });

        test('getHandler() throws correct error if no ERROR listener is attached', () => {
          expect(() => {
            serverlessly.pipe(middlewares[0]).getHandler({ platformAdapter });
          }).toThrow(
            new Error(
              'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
            )
          );
        });

        test('getHandler() throws & emits correct error if ERROR listener is attached', () => {
          expect(() => {
            serverlessly
              .on('ERROR', errorListener)
              .pipe(middlewares[0])
              .getHandler({ platformAdapter });
          }).toThrow(new Error());

          expect(errorListener).toBeCalledWith(new Error('Dummy Error'));
        });
      });

      describe('if getPlatformHandler() does not throw', () => {
        beforeEach(() => {
          getPlatformHandlerSpy.mockImplementationOnce(() => {
            return 'Foo';
          });
        });

        test('getHandler() does not throw', () => {
          expect(() => {
            serverlessly.pipe(middlewares[0]).getHandler({ platformAdapter });
          }).not.toThrow();
        });

        test('getHandler() returns the same value returned by getPlatformHandler()', () => {
          expect(
            serverlessly.pipe(middlewares[0]).getHandler({ platformAdapter })
          ).toBe('Foo');
        });
      });
    });
  });
});

describe('getServer() Tests', () => {
  let serverlessly: ServerlesslySync;
  let getHandlerSpy: jest.SpyInstance<
    unknown,
    [props: HandlerProps<DummyProtocolContextSync, unknown>]
  >;
  let protocolServerFactorySpy: jest.SpyInstance<unknown, unknown[]>;

  beforeEach(() => {
    serverlessly = new Serverlessly({ protocol }).pipe(middlewares[0]);
    getHandlerSpy = jest.spyOn(serverlessly, 'getHandler');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    protocolServerFactorySpy = jest.spyOn<any, string>(
      serverlessly,
      'protocolServerFactory'
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getServer() calls getHandler() once', () => {
    serverlessly.getServer('');
    expect(getHandlerSpy).toBeCalledTimes(1);
  });

  test('getServer() calls getHandler() with correct arguments', () => {
    serverlessly.getServer('');
    expect(getHandlerSpy).toBeCalledWith({
      platformAdapter: expect.any(Function),
    });
  });

  test('getServer() calls protocolServerFatory() once', () => {
    serverlessly.getServer('');
    expect(protocolServerFactorySpy).toBeCalledTimes(1);
  });

  test('getServer() calls protocolServerFatory() with correct argument', () => {
    serverlessly.getServer('Hulk Smash');
    expect(protocolServerFactorySpy).toBeCalledWith('Hulk Smash');
  });
});

describe('getProtocolContext() Tests', () => {
  let serverlessly: ServerlesslySync;
  let getHandlerSpy: jest.SpyInstance<
    unknown,
    [props: HandlerProps<DummyProtocolContextSync, unknown>]
  >;

  beforeEach(() => {
    serverlessly = new Serverlessly({ protocol }).pipe(middlewares[0]);
    getHandlerSpy = jest.spyOn(serverlessly, 'getHandler');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getProtocolContext() calls getHandler() once', () => {
    serverlessly.getProtocolContext();
    expect(getHandlerSpy).toBeCalledTimes(1);
  });

  test('getProtocolContext() calls getHandler() with correct arguments', () => {
    serverlessly.getProtocolContext();
    expect(getHandlerSpy).toBeCalledWith({
      platformAdapter: protocolServerAdapter,
    });
  });
});
