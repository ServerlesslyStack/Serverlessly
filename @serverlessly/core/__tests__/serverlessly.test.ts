/* eslint-disable no-empty */
import {
  HandlerProps,
  MiddlewareEngine,
  PlatformAdapter,
  Serverlessly,
} from '@serverlessly/core';
import * as validateMiddleware from '../lib/helpers/validate-middlewares';
import * as protocolRequestHandler from '../lib/helpers/protocol-request-handler';
import * as platformHandler from '../lib/helpers/platform-handler';
import { dummyMiddlewareEngineSync } from './dummies/middleware-engines';
import { dummyMiddlewaresSync } from './dummies/middlewares';
import { dummyPlatformAdapterSync } from './dummies/platform-adapters';
import { dummyProtocolSync } from './dummies/protocols';
import { ServerlesslySync } from './dummies/serverlessly';
import { DummyProtocolRequestHandlerSync } from './dummies/protocol-request-handlers';
import { protocolServerAdapter } from '../lib/protocol';

const protocol = dummyProtocolSync;
const middlewareEngine = dummyMiddlewareEngineSync;
const middlewares = dummyMiddlewaresSync;
const platformAdapter = dummyPlatformAdapterSync;

describe('Serverlessly Constructor Tests', () => {
  test('Serverlessly is successfully initialized without Middleware Engine', () => {
    expect(new Serverlessly({ protocol })).toBeTruthy();
  });

  test('Serverlessly is successfully initialized with Middleware Engine', () => {
    expect(new Serverlessly({ protocol, middlewareEngine })).toBeTruthy();
  });

  test('Serverlessly instance has correct middlewareEngine value', () => {
    const serverlessly1 = new Serverlessly({ protocol });
    const serverlessly2 = new Serverlessly({
      protocol,
      middlewareEngine,
    });

    expect(serverlessly1['middlewareEngine']).toBe(
      protocol.defaultMiddlewareEngine
    );

    expect(serverlessly2['middlewareEngine']).toBe(middlewareEngine);
  });

  test('Serverlessly instance has correct protocolServerFactory value', () => {
    const serverlessly1 = new Serverlessly({ protocol });
    const serverlessly2 = new Serverlessly({
      protocol,
      middlewareEngine,
    });

    expect(serverlessly1['protocolServerFactory']).toBe(protocol.serverFactory);

    expect(serverlessly2['protocolServerFactory']).toBe(protocol.serverFactory);
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
  let getProtocolRequestHandlerSpy: jest.SpyInstance<
    unknown,
    [
      middlewareEngine: MiddlewareEngine<unknown, unknown>,
      middlewares: unknown[]
    ]
  >;
  let getPlatformHandlerSpy: jest.SpyInstance<
    unknown,
    [
      platformAdapter: PlatformAdapter<unknown, unknown>,
      hydratedProtocol: unknown
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
    getProtocolRequestHandlerSpy = jest.spyOn(
      protocolRequestHandler,
      'getProtocolRequestHandler'
    );
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

    test('getHandler() does not call getProtocolRequestHandler() or getPlatformHandler()', () => {
      try {
        serverlessly.pipe(middlewares[0]).getHandler({ platformAdapter });
      } catch (error) {}

      expect(getProtocolRequestHandlerSpy).not.toBeCalled();
      expect(getPlatformHandlerSpy).not.toBeCalled();
    });
  });

  describe('if validateMiddlewares() does not throw', () => {
    beforeEach(() => {
      validateMiddlewareSpy.mockImplementationOnce(() => {
        return;
      });
    });

    test('getHandler() calls getProtocolRequestHandler() once', () => {
      serverlessly.pipe(middlewares[0]).getHandler({ platformAdapter });
      expect(getProtocolRequestHandlerSpy).toBeCalledTimes(1);
    });

    test('getHandler() calls getProtocolRequestHandler() with correct argument', () => {
      serverlessly.pipe(middlewares[0]).getHandler({ platformAdapter });
      expect(getProtocolRequestHandlerSpy).toBeCalledWith(middlewareEngine, [
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

    describe('if getProtocolRequestHandler() throws', () => {
      beforeEach(() => {
        getProtocolRequestHandlerSpy.mockImplementationOnce(() => {
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

    describe('if getProtocolRequestHandler() does not throw', () => {
      beforeEach(() => {
        getProtocolRequestHandlerSpy.mockImplementationOnce(() => {
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
    [props: HandlerProps<DummyProtocolRequestHandlerSync, unknown>]
  >;

  beforeEach(() => {
    serverlessly = new Serverlessly({ protocol }).pipe(middlewares[0]);
    getHandlerSpy = jest.spyOn(serverlessly, 'getHandler');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getServer() calls getHandler() once', () => {
    serverlessly.getServer();
    expect(getHandlerSpy).toBeCalledTimes(1);
  });

  test('getServer() calls getHandler() with correct arguments', () => {
    serverlessly.getServer();
    expect(getHandlerSpy).toBeCalledWith({
      platformAdapter: serverlessly['protocolServerFactory'],
    });
  });
});

describe('getProtocolRequestHandler() Tests', () => {
  let serverlessly: ServerlesslySync;
  let getHandlerSpy: jest.SpyInstance<
    unknown,
    [props: HandlerProps<DummyProtocolRequestHandlerSync, unknown>]
  >;

  beforeEach(() => {
    serverlessly = new Serverlessly({ protocol }).pipe(middlewares[0]);
    getHandlerSpy = jest.spyOn(serverlessly, 'getHandler');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getProtocolRequestHandler() calls getHandler() once', () => {
    serverlessly.getProtocolRequestHandler();
    expect(getHandlerSpy).toBeCalledTimes(1);
  });

  test('getProtocolRequestHandler() calls getHandler() with correct arguments', () => {
    serverlessly.getProtocolRequestHandler();
    expect(getHandlerSpy).toBeCalledWith({
      platformAdapter: protocolServerAdapter,
    });
  });
});
