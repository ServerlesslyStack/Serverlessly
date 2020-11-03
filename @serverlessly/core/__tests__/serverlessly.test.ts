/* eslint-disable no-empty */
import {
  MiddlewareEngine,
  PlatformAdapter,
  Serverlessly,
} from '@serverlessly/core';
import * as protocolPlatformAdapterFactory from '../lib/platform-adapter';
import * as validateMiddleware from '../lib/helpers/validate-middlewares';
import * as coreCodeFactory from '../lib/helpers/core-code-factory';
import * as computeHandler from '../lib/helpers/compute-handler';
import {
  dummyMiddlewareEngineSync,
  dummyMiddlewaresSync,
  dummyPlatformAdapterSync,
  ServerlesslySync,
} from './dummies';

const middlewareEngine = dummyMiddlewareEngineSync;
const middlewares = dummyMiddlewaresSync;
const platformAdapter = dummyPlatformAdapterSync;

test('Serverlessly instance is successfully initialized', () => {
  expect(new Serverlessly({ middlewareEngine })).toBeTruthy();
});

describe('pipe() Tests', () => {
  let serverlessly: ServerlesslySync;

  let logsListener: jest.Mock;
  let newMiddlewaresListener: jest.Mock;
  let middlewaresListener: jest.Mock;

  beforeEach(() => {
    serverlessly = new Serverlessly({
      middlewareEngine,
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
        .pipe(middlewares[2], middlewares[3]).middlewares
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

  let protocolPlatformAdapterFactorySpy: jest.SpyInstance;
  let validateMiddlewareSpy: jest.SpyInstance<void, [middlewares: unknown[]]>;
  let getCoreCodeFactorySpy: jest.SpyInstance<
    unknown,
    [
      middlewareEngine: MiddlewareEngine<unknown, unknown>,
      middlewares: unknown[]
    ]
  >;
  let computeHandlerSpy: jest.SpyInstance<
    unknown,
    [
      platformAdapter: PlatformAdapter<unknown, unknown>,
      hydratedProtocol: unknown
    ]
  >;

  beforeEach(() => {
    serverlessly = new Serverlessly({
      middlewareEngine,
    });

    logsListener = jest.fn();
    errorListener = jest.fn();

    protocolPlatformAdapterFactorySpy = jest.spyOn(
      protocolPlatformAdapterFactory,
      'protocolPlatformAdapterFactory'
    );

    validateMiddlewareSpy = jest.spyOn(
      validateMiddleware,
      'validateMiddlewares'
    );
    getCoreCodeFactorySpy = jest.spyOn(coreCodeFactory, 'getCoreCodeFactory');
    computeHandlerSpy = jest.spyOn(computeHandler, 'computeHandler');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getHandler() calls protocolPlatformAdapterFactory() once if no Platform Adapter is available', () => {
    serverlessly.pipe(middlewares[0]).getHandler();
    expect(protocolPlatformAdapterFactorySpy).toBeCalledTimes(1);
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

    test('getHandler() does not call getCoreCodeFactory() or computeHandler()', () => {
      try {
        serverlessly.pipe(middlewares[0]).getHandler({ platformAdapter });
      } catch (error) {}

      expect(getCoreCodeFactorySpy).not.toBeCalled();
      expect(computeHandlerSpy).not.toBeCalled();
    });
  });

  describe('if validateMiddlewares() does not throw', () => {
    beforeEach(() => {
      validateMiddlewareSpy.mockImplementationOnce(() => {
        return;
      });
    });

    test('getHandler() calls getCoreCodeFactory() once', () => {
      serverlessly.pipe(middlewares[0]).getHandler({ platformAdapter });
      expect(getCoreCodeFactorySpy).toBeCalledTimes(1);
    });

    test('getHandler() calls getCoreCodeFactory() with correct argument', () => {
      serverlessly.pipe(middlewares[0]).getHandler({ platformAdapter });
      expect(getCoreCodeFactorySpy).toBeCalledWith(middlewareEngine, [
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

    describe('if getCoreCodeFactory() throws', () => {
      beforeEach(() => {
        getCoreCodeFactorySpy.mockImplementationOnce(() => {
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

      test('getHandler() does not call computeHandler()', () => {
        try {
          serverlessly.pipe(middlewares[0]).getHandler({ platformAdapter });
        } catch (error) {}

        expect(computeHandlerSpy).not.toBeCalled();
      });
    });

    describe('if getCoreCodeFactory() does not throw', () => {
      beforeEach(() => {
        getCoreCodeFactorySpy.mockImplementationOnce(() => {
          return 'Foo';
        });
      });

      test('getHandler() calls computeHandler() once', () => {
        serverlessly.pipe(middlewares[0]).getHandler({ platformAdapter });
        expect(computeHandlerSpy).toBeCalledTimes(1);
      });

      test('getHandler() calls computeHandler() with correct argument', () => {
        serverlessly.pipe(middlewares[0]).getHandler({ platformAdapter });
        expect(computeHandlerSpy).toBeCalledWith(platformAdapter, 'Foo');
      });

      describe('if computeHandler() throws', () => {
        beforeEach(() => {
          computeHandlerSpy.mockImplementationOnce(() => {
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

      describe('if computeHandler() does not throw', () => {
        beforeEach(() => {
          computeHandlerSpy.mockImplementationOnce(() => {
            return 'Foo';
          });
        });

        test('getHandler() does not throw', () => {
          expect(() => {
            serverlessly.pipe(middlewares[0]).getHandler({ platformAdapter });
          }).not.toThrow();
        });

        test('getHandler() returns the same value returned by computeHandler()', () => {
          expect(
            serverlessly.pipe(middlewares[0]).getHandler({ platformAdapter })
          ).toBe('Foo');
        });
      });
    });
  });
});
