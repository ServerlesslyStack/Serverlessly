/* eslint-disable no-empty */
import { Serverlessly } from '@serverlessly/core';
import * as validateMiddleware from '../lib/helpers/validate-middlewares';
import { DummyProtocolSyncOrAsync } from './dummies/protocols';
import {
  dummyMiddlewaresSyncOrAsync,
  DummyMiddlewareSyncOrAsync,
} from './dummies/middlewares';
import {
  DummyMiddlewareEngineSyncOrAsync,
  FaultyMiddlewareEngineSyncOrAsync,
} from './dummies/middleware-engines';
import {
  DummyPlatformAdapterSyncOrAsync,
  FaultyPlatformAdapterSyncOrAsync,
} from './dummies/platform-adapters';
import { ServerlesslySyncOrAsync } from './dummies/serverlessly';
import { DummyPlatformHandlerSyncOrAsync } from './dummies/platform-handlers';

const protocol = new DummyProtocolSyncOrAsync();
const middlewares = dummyMiddlewaresSyncOrAsync;
const middlewareEngine = new DummyMiddlewareEngineSyncOrAsync();
const platformAdapter = new DummyPlatformAdapterSyncOrAsync();

describe('Serverlessly Constructor Tests', () => {
  test('Serverlessly is successfully initialized', () => {
    expect(new Serverlessly({ protocol, middlewareEngine })).toBeTruthy();
  });

  test('Serverlessly instance has correct protocol & middlewareEngine values', () => {
    expect(
      new Serverlessly({
        protocol,
        middlewareEngine,
      })
    ).toMatchObject({
      protocol,
      middlewareEngine,
    });
  });
});

describe('pipe() Tests', () => {
  let serverlessly: ServerlesslySyncOrAsync;

  beforeEach(() => {
    serverlessly = new Serverlessly({ protocol, middlewareEngine });
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
});

describe('getHandler() Tests', () => {
  let serverlessly: ServerlesslySyncOrAsync;

  let validateMiddlewareSpy: jest.SpyInstance<void, [middlewares: unknown[]]>;
  let middlewareEngineSpy: jest.SpyInstance<
    void,
    [
      protocol: DummyProtocolSyncOrAsync,
      middlewares: DummyMiddlewareSyncOrAsync[]
    ]
  >;
  let platformAdapterSpy: jest.SpyInstance<
    DummyPlatformHandlerSyncOrAsync,
    [protocol: DummyProtocolSyncOrAsync]
  >;

  beforeEach(() => {
    serverlessly = new Serverlessly({ protocol, middlewareEngine });

    validateMiddlewareSpy = jest.spyOn(
      validateMiddleware,
      'validateMiddlewares'
    );

    middlewareEngineSpy = jest.spyOn(middlewareEngine, '_run');
    platformAdapterSpy = jest.spyOn(platformAdapter, '_run');
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

    test('getHandler() throws correct error', () => {
      expect(() => {
        serverlessly.pipe(middlewares[0]).getHandler({ platformAdapter });
      }).toThrow(
        new Error(`Something went wrong.\n${new Error('Dummy Error')}`)
      );
    });

    test('getHandler() does not run middlewareEngine or platformAdapter', () => {
      try {
        serverlessly.pipe(middlewares[0]).getHandler({ platformAdapter });
      } catch (error) {}

      expect(middlewareEngineSpy).not.toBeCalled();
      expect(platformAdapterSpy).not.toBeCalled();
    });
  });

  describe('if validateMiddlewares() does not throw', () => {
    beforeEach(() => {
      validateMiddlewareSpy.mockImplementationOnce(() => {
        return;
      });
    });

    test('getHandler() runs middlewareEngine once', () => {
      serverlessly.pipe(middlewares[0]).getHandler({ platformAdapter });
      expect(middlewareEngineSpy).toBeCalledTimes(1);
    });

    test('getHandler() runs middlewareEngine with correct argument', () => {
      serverlessly.pipe(middlewares[0]).getHandler({ platformAdapter });
      expect(middlewareEngineSpy).toBeCalledWith(protocol, [middlewares[0]]);
    });

    describe('if middlewareEngine throws', () => {
      beforeEach(() => {
        middlewareEngineSpy.mockImplementationOnce(() => {
          throw new Error('Dummy Error');
        });
      });

      test('getHandler() throws', () => {
        expect(() => {
          serverlessly.pipe(middlewares[0]).getHandler({ platformAdapter });
        }).toThrow();
      });

      test('getHandler() throws correct error', () => {
        expect(() => {
          serverlessly.pipe(middlewares[0]).getHandler({ platformAdapter });
        }).toThrow(
          new Error(`Something went wrong.\n${new Error('Dummy Error')}`)
        );

        expect(() => {
          new Serverlessly({
            protocol,
            middlewareEngine: new FaultyMiddlewareEngineSyncOrAsync(),
          })
            .pipe(middlewares[0])
            .getHandler({ platformAdapter });
        }).toThrow(
          new Error(
            `Something went wrong.\n${new Error(
              `Faulty Middleware Engine\n${new RangeError(
                'Invalid array length'
              )}`
            )}`
          )
        );
      });

      test('getHandler() does not run platformAdapter', () => {
        try {
          serverlessly.pipe(middlewares[0]).getHandler({ platformAdapter });
        } catch (error) {}

        expect(platformAdapterSpy).not.toBeCalled();
      });
    });

    describe('if middlewareEngine does not throw', () => {
      beforeEach(() => {
        middlewareEngineSpy.mockImplementationOnce(() => {
          return 'Foo';
        });
      });

      test('getHandler() runs platformAdapter once', () => {
        serverlessly.pipe(middlewares[0]).getHandler({ platformAdapter });
        expect(platformAdapterSpy).toBeCalledTimes(1);
      });

      test('getHandler() runs platformAdapter with correct argument', () => {
        serverlessly.pipe(middlewares[0]).getHandler({ platformAdapter });
        expect(platformAdapterSpy).toBeCalledWith(protocol);
      });

      describe('if platformAdapter throws', () => {
        beforeEach(() => {
          platformAdapterSpy.mockImplementationOnce(() => {
            throw new Error('Dummy Error');
          });
        });

        test('getHandler() throws', () => {
          expect(() => {
            serverlessly.pipe(middlewares[0]).getHandler({ platformAdapter });
          }).toThrow();
        });

        test('getHandler() throws correct error', () => {
          expect(() => {
            serverlessly.pipe(middlewares[0]).getHandler({ platformAdapter });
          }).toThrow(
            new Error(`Something went wrong.\n${new Error('Dummy Error')}`)
          );

          expect(() => {
            serverlessly.pipe(middlewares[0]).getHandler({
              platformAdapter: new FaultyPlatformAdapterSyncOrAsync(),
            });
          }).toThrow(
            new Error(
              `Something went wrong.\n${new Error(
                `Faulty Platform Adapter\n${new RangeError(
                  'Invalid array length'
                )}`
              )}`
            )
          );
        });
      });

      describe('if platformAdapter does not throw', () => {
        const mockReturnHandler = () => 'Foo';
        beforeEach(() => {
          platformAdapterSpy.mockImplementationOnce(() => mockReturnHandler);
        });

        test('getHandler() does not throw', () => {
          expect(() => {
            serverlessly.pipe(middlewares[0]).getHandler({ platformAdapter });
          }).not.toThrow();
        });

        test('getHandler() returns the same value returned by platformAdapter', () => {
          expect(
            serverlessly.pipe(middlewares[0]).getHandler({ platformAdapter })
          ).toBe(mockReturnHandler);
        });
      });
    });
  });
});
