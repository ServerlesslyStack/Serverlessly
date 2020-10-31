import {
  MiddlewareEngine,
  PlatformAdapter,
  Serverlessly,
} from '@serverlessly/core';
import {
  dummyMiddlewareEngineSync,
  dummyMiddlewareEngineAsync,
  dummyMiddlewareEngineSyncMiddlewareToAsyncProtocol,
  dummyMiddlewareEngineSyncOrAsync,
  dummyMiddlewareEngineSyncMiddlewareToSyncOrAsyncProtocol,
  dummyMiddlewareEngineAsyncMiddlewareToSyncOrAsyncProtocol,
  DummyMiddlewareSync,
  DummyMiddlewareAsync,
  DummyMiddlewareSyncOrAsync,
  dummyMiddlewaresSync,
  dummyMiddlewaresAsync,
  dummyMiddlewaresSyncOrAsync,
  dummyPlatformAdapterSyncOrAsyncStrict,
  dummyPlatformAdapterSyncOrAsync,
  dummyPlatformAdapterSync,
  dummyPlatformAdapterAsync,
  dummyPlatformAdapterAsyncHandlerToSyncProtocol,
  faultyMiddlewareEngineSync,
  faultyMiddlewareEngineAsync,
  faultyMiddlewareEngineSyncMiddlewareToAsyncProtocol,
  faultyMiddlewareEngineSyncOrAsync,
  faultyMiddlewareEngineSyncMiddlewareToSyncOrAsyncProtocol,
  faultyMiddlewareEngineAsyncMiddlewareToSyncOrAsyncProtocol,
  faultyPlatformAdapterSyncOrAsyncStrict,
  faultyPlatformAdapterSyncOrAsync,
  faultyPlatformAdapterSync,
  faultyPlatformAdapterAsync,
  faultyPlatformAdapterAsyncHandlerToSyncProtocol,
  dummyMiddlewareEngineSyncOrAsyncMiddlewareToAsyncProtocol,
  faultyMiddlewareEngineSyncOrAsyncMiddlewareToAsyncProtocol,
  dummyPlatformAdapterAsyncHandlerToSyncOrAsyncProtocol,
  faultyPlatformAdapterAsyncHandlerToSyncOrAsyncProtocol,
  dummyPlatformAdapterSyncOrAsyncHandlerToSyncProtocol,
  faultyPlatformAdapterSyncOrAsyncHandlerToSyncProtocol,
  dummyPlatformAdapterSyncOrAsyncHandlerToAsyncProtocol,
  faultyPlatformAdapterSyncOrAsyncHandlerToAsyncProtocol,
} from './dummies';

type TestCase = [
  string,
  boolean,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  MiddlewareEngine<any, any>,
  DummyMiddlewareSync[] | DummyMiddlewareAsync[] | DummyMiddlewareSyncOrAsync[]
];

const testCases: TestCase[] = [
  [
    'dummyMiddlewareEngineSync',
    false,
    dummyMiddlewareEngineSync,
    dummyMiddlewaresSync,
  ],
  [
    'faultyMiddlewareEngineSync',
    true,
    faultyMiddlewareEngineSync,
    dummyMiddlewaresSync,
  ],
  [
    'dummyMiddlewareEngineAsync',
    false,
    dummyMiddlewareEngineAsync,
    dummyMiddlewaresAsync,
  ],
  [
    'faultyMiddlewareEngineAsync',
    true,
    faultyMiddlewareEngineAsync,
    dummyMiddlewaresAsync,
  ],
  [
    'dummyMiddlewareEngineSyncMiddlewareToAsyncProtocol',
    false,
    dummyMiddlewareEngineSyncMiddlewareToAsyncProtocol,
    dummyMiddlewaresSync,
  ],
  [
    'faultyMiddlewareEngineSyncMiddlewareToAsyncProtocol',
    true,
    faultyMiddlewareEngineSyncMiddlewareToAsyncProtocol,
    dummyMiddlewaresSync,
  ],
  [
    'dummyMiddlewareEngineSyncOrAsync',
    false,
    dummyMiddlewareEngineSyncOrAsync,
    dummyMiddlewaresSyncOrAsync,
  ],
  [
    'faultyMiddlewareEngineSyncOrAsync',
    true,
    faultyMiddlewareEngineSyncOrAsync,
    dummyMiddlewaresSyncOrAsync,
  ],
  [
    'dummyMiddlewareEngineSyncMiddlewareToSyncOrAsyncProtocol',
    false,
    dummyMiddlewareEngineSyncMiddlewareToSyncOrAsyncProtocol,
    dummyMiddlewaresSync,
  ],
  [
    'faultyMiddlewareEngineSyncMiddlewareToSyncOrAsyncProtocol',
    true,
    faultyMiddlewareEngineSyncMiddlewareToSyncOrAsyncProtocol,
    dummyMiddlewaresSync,
  ],
  [
    'dummyMiddlewareEngineAsyncMiddlewareToSyncOrAsyncProtocol',
    false,
    dummyMiddlewareEngineAsyncMiddlewareToSyncOrAsyncProtocol,
    dummyMiddlewaresAsync,
  ],
  [
    'faultyMiddlewareEngineAsyncMiddlewareToSyncOrAsyncProtocol',
    true,
    faultyMiddlewareEngineAsyncMiddlewareToSyncOrAsyncProtocol,
    dummyMiddlewaresAsync,
  ],
  [
    'dummyMiddlewareEngineSyncOrAsyncMiddlewareToAsyncProtocol',
    false,
    dummyMiddlewareEngineSyncOrAsyncMiddlewareToAsyncProtocol,
    dummyMiddlewaresSyncOrAsync,
  ],
  [
    'faultyMiddlewareEngineSyncOrAsyncMiddlewareToAsyncProtocol',
    true,
    faultyMiddlewareEngineSyncOrAsyncMiddlewareToAsyncProtocol,
    dummyMiddlewaresSyncOrAsync,
  ],
];

type DummyPlatformAdapterCase = [
  string,
  boolean,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  PlatformAdapter<any, any> | undefined
];

const dummyPlatformAdapterCases: DummyPlatformAdapterCase[] = [
  ['no', false, undefined],
  [
    'dummyPlatformAdapterSyncOrAsyncStrict',
    false,
    dummyPlatformAdapterSyncOrAsyncStrict,
  ],
  [
    'faultyPlatformAdapterSyncOrAsyncStrict',
    true,
    faultyPlatformAdapterSyncOrAsyncStrict,
  ],
  ['dummyPlatformAdapterSyncOrAsync', false, dummyPlatformAdapterSyncOrAsync],
  ['faultyPlatformAdapterSyncOrAsync', true, faultyPlatformAdapterSyncOrAsync],
  ['dummyPlatformAdapterSync', false, dummyPlatformAdapterSync],
  ['faultyPlatformAdapterSync', true, faultyPlatformAdapterSync],
  ['dummyPlatFormAdapterAsync', false, dummyPlatformAdapterAsync],
  ['faultyPlatFormAdapterAsync', true, faultyPlatformAdapterAsync],
  [
    'dummyPlatformAdapterAsyncHandlerToSyncProtocol',
    false,
    dummyPlatformAdapterAsyncHandlerToSyncProtocol,
  ],
  [
    'faultyPlatformAdapterAsyncHandlerToSyncProtocol',
    true,
    faultyPlatformAdapterAsyncHandlerToSyncProtocol,
  ],
  [
    'dummyPlatformAdapterSyncOrAsyncHandlerToSyncProtocol',
    false,
    dummyPlatformAdapterSyncOrAsyncHandlerToSyncProtocol,
  ],
  [
    'faultyPlatformAdapterSyncOrAsyncHandlerToSyncProtocol',
    true,
    faultyPlatformAdapterSyncOrAsyncHandlerToSyncProtocol,
  ],
  [
    'dummyPlatformAdapterSyncOrAsyncHandlerToAsyncProtocol',
    false,
    dummyPlatformAdapterSyncOrAsyncHandlerToAsyncProtocol,
  ],
  [
    'faultyPlatformAdapterSyncOrAsyncHandlerToAsyncProtocol',
    true,
    faultyPlatformAdapterSyncOrAsyncHandlerToAsyncProtocol,
  ],
  [
    'dummyPlatformAdapterAsyncHandlerToSyncOrAsyncProtocol',
    false,
    dummyPlatformAdapterAsyncHandlerToSyncOrAsyncProtocol,
  ],
  [
    'faultyPlatformAdapterAsyncHandlerToSyncOrAsyncProtocol',
    true,
    faultyPlatformAdapterAsyncHandlerToSyncOrAsyncProtocol,
  ],
];

describe.each(testCases)(
  'Serverlessly tests with %s Middleware Engine',
  (
    middlewareEngineName,
    isFaultyMiddlewareEngine,
    middlewareEngine,
    middlewares
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let serverlessly: Serverlessly<any, any>;
    let logsListener: jest.Mock;
    let errorListener: jest.Mock;
    let newMiddlewaresListener: jest.Mock;
    let middlewaresListener: jest.Mock;

    beforeEach(() => {
      serverlessly = new Serverlessly({
        middlewareEngine,
      });

      logsListener = jest.fn();
      errorListener = jest.fn();
      newMiddlewaresListener = jest.fn();
      middlewaresListener = jest.fn();
    });

    test(`Serverlessly instance is successfully initialized with ${middlewareEngineName}`, () => {
      expect(serverlessly).toBeTruthy();
    });

    describe('pipe() method', () => {
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
            'Pipe: 2 middlewares registered (new global middlewares count: 2)'
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
            'Pipe: 1 middleware registered (new global middlewares count: 3)'
          );
          expect(newMiddlewaresListener).lastCalledWith([middlewares[2]]);
          expect(middlewaresListener).lastCalledWith([
            middlewares[0],
            middlewares[1],
            middlewares[2],
          ]);

          app.pipe(middlewares[3]);
          expect(logsListener).lastCalledWith(
            'Pipe: 1 middleware registered (new global middlewares count: 4)'
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

    describe.each(dummyPlatformAdapterCases)(
      'Tests with %s Platform Adapter',
      (platformAdapterName, isFaultyPlatformAdapter, platformAdapter) => {
        const hTest =
          !isFaultyMiddlewareEngine && !isFaultyPlatformAdapter
            ? test
            : test.skip;
        const fTest =
          isFaultyMiddlewareEngine && isFaultyPlatformAdapter
            ? test
            : test.skip;
        const mfTest =
          isFaultyMiddlewareEngine && !isFaultyPlatformAdapter
            ? test
            : test.skip;
        const pfTest =
          !isFaultyMiddlewareEngine && isFaultyPlatformAdapter
            ? test
            : test.skip;

        hTest('getHandler() throws error if no middleware is found', () => {
          expect(() => {
            serverlessly.getHandler({ platformAdapter });
          }).toThrowError();
        });

        hTest(
          'getHandler() throws correct error if no middleware is found & no ERROR event handler is attached',
          () => {
            expect(() => {
              serverlessly.getHandler({ platformAdapter });
            }).toThrow(new Error('No Middleware Found'));
          }
        );

        hTest(
          'getHandler() throws & emits correct error if no middleware is found, but ERROR event handler is attached',
          () => {
            expect(() => {
              serverlessly
                .on('ERROR', errorListener)
                .getHandler({ platformAdapter });
            }).toThrow(new Error());

            expect(errorListener).toBeCalledWith(
              new Error('No Middleware Found')
            );
          }
        );

        hTest('getHandler() returns correct handler', () => {
          const handlerResult = serverlessly
            .pipe(middlewares[0], middlewares[1])
            .getHandler({ platformAdapter })('Hulk Says:');

          if (handlerResult instanceof Promise) {
            expect(handlerResult).resolves.toBe('Hulk Says: Hulk Smash');
          } else {
            expect(handlerResult).toBe('Hulk Says: Hulk Smash');
          }
        });

        hTest(
          'getHandler() emits logs twice when it encounters no error',
          () => {
            serverlessly
              .pipe(() => 'Foo')
              .on('LOG', logsListener)
              .getHandler({ platformAdapter });

            expect(logsListener).toBeCalledTimes(2);
          }
        );

        hTest(
          'getHandler() emits correct logs when it encounters no error',
          () => {
            serverlessly
              .pipe(middlewares[0], middlewares[1])
              .on('LOG', logsListener)
              .getHandler({ platformAdapter });

            expect(logsListener).nthCalledWith(
              1,
              'getHandler: 2 middlewares found'
            );

            if (platformAdapter) {
              expect(logsListener).nthCalledWith(
                2,
                'getHandler: Platform Adapter found'
              );
            } else {
              expect(logsListener).nthCalledWith(
                2,
                'getHandler: Platform Adapter not found.. using default protocol adapter provided by Middleware Engine'
              );
            }
          }
        );

        test.todo('getHandler() does not emit logs if no middleware is found');

        mfTest(
          'getHandler() throws error if middlewareEngine throws or encounters error',
          () => {
            expect(() => {
              new Serverlessly({ middlewareEngine })
                .pipe(() => 'Foo')
                .getHandler({
                  platformAdapter,
                });
            }).toThrowError();
          }
        );

        mfTest(
          'getHandler() throws correct error if middlewareEngine throws or encounters error & there is no ERROR event listener attached',
          () => {
            expect(() => {
              new Serverlessly({ middlewareEngine })
                .pipe(() => 'Foo')
                .getHandler({
                  platformAdapter,
                });
            }).toThrow(
              new Error(
                'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
              )
            );
          }
        );

        mfTest(
          'getHandler() throws and emits correct error if middlewareEngine throws or encounters error & there is an ERROR event listener attached',
          () => {
            expect(() => {
              new Serverlessly({ middlewareEngine })
                .on('ERROR', errorListener)
                .pipe(() => 'Foo')
                .getHandler({ platformAdapter });
            }).toThrow(new Error());

            expect(errorListener).toBeCalledWith(
              new Error(
                'Faulty Middleware Engine\nRangeError: Invalid array length'
              )
            );
          }
        );

        test.todo(
          'getHandler() emits log only once if middlewareEngine throws or encounters error'
        );

        pfTest(
          'getHandler() throws error if platformAdapter throws or encounters error',
          () => {
            expect(() => {
              serverlessly
                .pipe(() => 'Foo')
                .getHandler({
                  platformAdapter,
                });
            }).toThrowError();
          }
        );

        pfTest(
          'getHandler() throws correct error if platformAdapter throws or encounters error & there is no ERROR event listener attached',
          () => {
            expect(() => {
              serverlessly
                .pipe(() => 'Foo')
                .getHandler({
                  platformAdapter,
                });
            }).toThrow(
              new Error(
                'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
              )
            );
          }
        );

        pfTest(
          'getHandler() throws and emits correct error if platformAdapter throws or encounters error & there is an ERROR event listener attached',
          () => {
            expect(() => {
              serverlessly
                .on('ERROR', errorListener)
                .pipe(() => 'Foo')
                .getHandler({ platformAdapter });
            }).toThrow(new Error());

            expect(errorListener).toBeCalledWith(
              new Error(
                'Faulty Platform Adapter\nRangeError: Invalid array length'
              )
            );
          }
        );

        test.todo(
          'getHandler() emits log twice if platformAdapter throws or encounters error'
        );

        fTest(
          'getHandler() throws error if both middlewareEngine and platformAdapter throws or encounters error',
          () => {
            expect(() => {
              new Serverlessly({ middlewareEngine })
                .pipe(() => 'Foo')
                .getHandler({
                  platformAdapter,
                });
            }).toThrowError();
          }
        );

        fTest(
          'getHandler() throws correct error if both middlewareEngine and platformAdapter throws or encounters error & there is no ERROR event listener attached',
          () => {
            expect(() => {
              new Serverlessly({ middlewareEngine })
                .pipe(() => 'Foo')
                .getHandler({
                  platformAdapter,
                });
            }).toThrow(
              new Error(
                'Something went wrong. Listen to ERROR event to get detailed error & stack trace.'
              )
            );
          }
        );

        fTest(
          'getHandler() throws and emits correct error if both middlewareEngine and platformAdapter throws or encounters error & there is an ERROR event listener attached',
          () => {
            expect(() => {
              new Serverlessly({ middlewareEngine })
                .on('ERROR', errorListener)
                .pipe(() => 'Foo')
                .getHandler({
                  platformAdapter,
                });
            }).toThrow(new Error());

            expect(errorListener).toBeCalledWith(
              new Error(
                'Faulty Middleware Engine\nRangeError: Invalid array length'
              )
            );
          }
        );

        test.todo(
          'getHandler() emits log only once if both middlewareEngine and platformAdapter throws or encounters error'
        );
      }
    );
  }
);
