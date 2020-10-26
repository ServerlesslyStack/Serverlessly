import { Serverlessly } from '@serverlessly/core';
import {
  DummyMiddlewareAsync,
  dummyMiddlewareEngineAsync,
  dummyMiddlewareEngineSync,
  DummyMiddlewareSync,
  dummyMiddlewareEngineSyncMiddlewareToAsyncProtocol,
  ServerlesslyAsync,
  ServerlesslyAsyncToSync,
  ServerlesslySync,
  ServerlesslySyncOrAsyncToSync,
  dummyMiddlewareEngineSyncMiddlewareToSyncOrAsyncProtocol,
  ServerlesslySyncOrAsyncToAsync,
  dummyMiddlewareEngineAsyncMiddlewareToSyncOrAsyncProtocol,
  ServerlesslySyncOrAsync,
  dummyMiddlewareEngineSyncOrAsync,
  DummyMiddlewareSyncOrAsync,
} from '../dummies';

describe('pipe() method of ServerlesslySync', () => {
  let serverlessly: ServerlesslySync;
  beforeEach(() => {
    serverlessly = new Serverlessly({
      middlewareEngine: dummyMiddlewareEngineSync,
    });
  });

  test('pipe() returns Serverlessly instance', () => {
    expect<ServerlesslySync>(serverlessly.pipe(() => 'Foo')).toBeInstanceOf(
      Serverlessly
    );
  });

  test('pipe() returns same Serverlessly instance', () => {
    expect<ServerlesslySync>(serverlessly.pipe(() => 'Foo')).toBe(serverlessly);
  });

  test('multiple pipe() methods can be chained', () => {
    expect(() => {
      serverlessly
        .pipe(() => 'Foo')
        .pipe(() => 'Bar')
        .pipe(
          () => 'Hulk',
          () => 'Smash'
        );
    }).not.toThrowError();
  });

  test('pipe() properly updates internal state', () => {
    const middleware1: DummyMiddlewareSync = () => 'Foo';
    const middleware2: DummyMiddlewareSync = () => 'Bar';
    const middleware3: DummyMiddlewareSync = () => 'Hulk';
    const middleware4: DummyMiddlewareSync = () => 'Smash';

    expect<DummyMiddlewareSync[]>(
      serverlessly
        .pipe(middleware1)
        .pipe(middleware2)
        .pipe(middleware3, middleware4).middlewares
    ).toStrictEqual([middleware1, middleware2, middleware3, middleware4]);
  });

  describe('Events emitted by pipe()', () => {
    let logsListener: jest.Mock;
    let newMiddlewaresListener: jest.Mock;
    let middlewaresListener: jest.Mock;

    beforeEach(() => {
      logsListener = jest.fn();
      newMiddlewaresListener = jest.fn();
      middlewaresListener = jest.fn();
    });

    test('Events are emitted', () => {
      serverlessly
        .on('LOG', logsListener)
        .on('NEW_MIDDLEWARES', newMiddlewaresListener)
        .on('MIDDLEWARES', middlewaresListener)
        .pipe(() => 'Foo');
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

      app
        .pipe(
          () => 'Hulk',
          () => 'Smash'
        )
        .pipe(() => 'Foo');
      expect(logsListener).toBeCalledTimes(2);
      expect(newMiddlewaresListener).toBeCalledTimes(2);
      expect(middlewaresListener).toBeCalledTimes(2);

      app.pipe(() => 'Foo');
      expect(logsListener).toBeCalledTimes(3);
      expect(newMiddlewaresListener).toBeCalledTimes(3);
      expect(middlewaresListener).toBeCalledTimes(3);

      app.pipe(() => 'Hail').pipe(() => 'Hydra');
      expect(logsListener).toBeCalledTimes(5);
      expect(newMiddlewaresListener).toBeCalledTimes(5);
      expect(middlewaresListener).toBeCalledTimes(5);
    });

    test('correct events are emitted', () => {
      const middleware1: DummyMiddlewareSync = () => 'Foo';
      const middleware2: DummyMiddlewareSync = () => 'Bar';
      const middleware3: DummyMiddlewareSync = () => 'Hulk';
      const middleware4: DummyMiddlewareSync = () => 'Smash';

      const app = serverlessly
        .on('LOG', logsListener)
        .on('NEW_MIDDLEWARES', newMiddlewaresListener)
        .on('MIDDLEWARES', middlewaresListener)
        .pipe(middleware1, middleware2);
      expect(logsListener).toBeCalledWith(
        'Pipe: 2 middlewares registered (new global middlewares count: 2)'
      );
      expect(newMiddlewaresListener).toBeCalledWith([middleware1, middleware2]);
      expect(middlewaresListener).toBeCalledWith([middleware1, middleware2]);

      app.pipe(middleware3);
      expect(logsListener).lastCalledWith(
        'Pipe: 1 middleware registered (new global middlewares count: 3)'
      );
      expect(newMiddlewaresListener).lastCalledWith([middleware3]);
      expect(middlewaresListener).lastCalledWith([
        middleware1,
        middleware2,
        middleware3,
      ]);

      app.pipe(middleware4);
      expect(logsListener).lastCalledWith(
        'Pipe: 1 middleware registered (new global middlewares count: 4)'
      );
      expect(newMiddlewaresListener).lastCalledWith([middleware4]);
      expect(middlewaresListener).lastCalledWith([
        middleware1,
        middleware2,
        middleware3,
        middleware4,
      ]);
    });
  });
});

describe('pipe() method of ServerlesslyAsync', () => {
  let serverlessly: ServerlesslyAsync;
  beforeEach(() => {
    serverlessly = new Serverlessly({
      middlewareEngine: dummyMiddlewareEngineAsync,
    });
  });

  test('pipe() returns Serverlessly instance', () => {
    expect<ServerlesslyAsync>(
      serverlessly.pipe(() => Promise.resolve('Foo'))
    ).toBeInstanceOf(Serverlessly);
  });

  test('pipe() returns same Serverlessly instance', () => {
    expect<ServerlesslyAsync>(
      serverlessly.pipe(() => Promise.resolve('Foo'))
    ).toBe(serverlessly);
  });

  test('multiple pipe() methods can be chained', () => {
    expect(() => {
      serverlessly
        .pipe(() => Promise.resolve('Foo'))
        .pipe(() => Promise.resolve('Bar'))
        .pipe(
          () => Promise.resolve('Hulk'),
          () => Promise.resolve('Smash')
        );
    }).not.toThrowError();
  });

  test('pipe() properly updates internal state', () => {
    const middleware1: DummyMiddlewareAsync = () => Promise.resolve('Foo');
    const middleware2: DummyMiddlewareAsync = async () => 'Bar';
    const middleware3: DummyMiddlewareAsync = async () => 'Hulk';
    const middleware4: DummyMiddlewareAsync = () => Promise.resolve('Smash');
    expect<DummyMiddlewareAsync[]>(
      serverlessly
        .pipe(middleware1)
        .pipe(middleware2)
        .pipe(middleware3, middleware4).middlewares
    ).toStrictEqual([middleware1, middleware2, middleware3, middleware4]);
  });

  describe('Events emitted by pipe()', () => {
    let logsListener: jest.Mock;
    let newMiddlewaresListener: jest.Mock;
    let middlewaresListener: jest.Mock;

    beforeEach(() => {
      logsListener = jest.fn();
      newMiddlewaresListener = jest.fn();
      middlewaresListener = jest.fn();
    });

    test('Events are emitted', () => {
      serverlessly
        .on('LOG', logsListener)
        .on('NEW_MIDDLEWARES', newMiddlewaresListener)
        .on('MIDDLEWARES', middlewaresListener)
        .pipe(async () => 'Foo');
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

      app
        .pipe(
          async () => 'Hulk',
          async () => 'Smash'
        )
        .pipe(async () => 'Foo');
      expect(logsListener).toBeCalledTimes(2);
      expect(newMiddlewaresListener).toBeCalledTimes(2);
      expect(middlewaresListener).toBeCalledTimes(2);

      app.pipe(async () => 'Foo');
      expect(logsListener).toBeCalledTimes(3);
      expect(newMiddlewaresListener).toBeCalledTimes(3);
      expect(middlewaresListener).toBeCalledTimes(3);

      app.pipe(async () => 'Hail').pipe(async () => 'Hydra');
      expect(logsListener).toBeCalledTimes(5);
      expect(newMiddlewaresListener).toBeCalledTimes(5);
      expect(middlewaresListener).toBeCalledTimes(5);
    });

    test('correct events are emitted', () => {
      const middleware1: DummyMiddlewareAsync = () => Promise.resolve('Foo');
      const middleware2: DummyMiddlewareAsync = async () => 'Bar';
      const middleware3: DummyMiddlewareAsync = async () => 'Hulk';
      const middleware4: DummyMiddlewareAsync = () => Promise.resolve('Smash');

      const app = serverlessly
        .on('LOG', logsListener)
        .on('NEW_MIDDLEWARES', newMiddlewaresListener)
        .on('MIDDLEWARES', middlewaresListener)
        .pipe(middleware1, middleware2);
      expect(logsListener).toBeCalledWith(
        'Pipe: 2 middlewares registered (new global middlewares count: 2)'
      );
      expect(newMiddlewaresListener).toBeCalledWith([middleware1, middleware2]);
      expect(middlewaresListener).toBeCalledWith([middleware1, middleware2]);

      app.pipe(middleware3);
      expect(logsListener).lastCalledWith(
        'Pipe: 1 middleware registered (new global middlewares count: 3)'
      );
      expect(newMiddlewaresListener).lastCalledWith([middleware3]);
      expect(middlewaresListener).lastCalledWith([
        middleware1,
        middleware2,
        middleware3,
      ]);

      app.pipe(middleware4);
      expect(logsListener).lastCalledWith(
        'Pipe: 1 middleware registered (new global middlewares count: 4)'
      );
      expect(newMiddlewaresListener).lastCalledWith([middleware4]);
      expect(middlewaresListener).lastCalledWith([
        middleware1,
        middleware2,
        middleware3,
        middleware4,
      ]);
    });
  });
});

describe('pipe() method of ServerlesslyAsyncToSync', () => {
  let serverlessly: ServerlesslyAsyncToSync;
  beforeEach(() => {
    serverlessly = new Serverlessly({
      middlewareEngine: dummyMiddlewareEngineSyncMiddlewareToAsyncProtocol,
    });
  });

  test('pipe() returns Serverlessly instance', () => {
    expect<ServerlesslyAsyncToSync>(
      serverlessly.pipe(() => 'Foo')
    ).toBeInstanceOf(Serverlessly);
  });

  test('pipe() returns same Serverlessly instance', () => {
    expect<ServerlesslyAsyncToSync>(serverlessly.pipe(() => 'Foo')).toBe(
      serverlessly
    );
  });

  test('multiple pipe() methods can be chained', () => {
    expect(() => {
      serverlessly
        .pipe(() => 'Foo')
        .pipe(() => 'Bar')
        .pipe(
          () => 'Hulk',
          () => 'Smash'
        );
    }).not.toThrowError();
  });

  test('pipe() properly updates internal state', () => {
    const middleware1: DummyMiddlewareSync = () => 'Foo';
    const middleware2: DummyMiddlewareSync = () => 'Bar';
    const middleware3: DummyMiddlewareSync = () => 'Hulk';
    const middleware4: DummyMiddlewareSync = () => 'Smash';

    expect<DummyMiddlewareSync[]>(
      serverlessly
        .pipe(middleware1)
        .pipe(middleware2)
        .pipe(middleware3, middleware4).middlewares
    ).toStrictEqual([middleware1, middleware2, middleware3, middleware4]);
  });

  describe('Events emitted by pipe()', () => {
    let logsListener: jest.Mock;
    let newMiddlewaresListener: jest.Mock;
    let middlewaresListener: jest.Mock;

    beforeEach(() => {
      logsListener = jest.fn();
      newMiddlewaresListener = jest.fn();
      middlewaresListener = jest.fn();
    });

    test('Events are emitted', () => {
      serverlessly
        .on('LOG', logsListener)
        .on('NEW_MIDDLEWARES', newMiddlewaresListener)
        .on('MIDDLEWARES', middlewaresListener)
        .pipe(() => 'Foo');
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

      app
        .pipe(
          () => 'Hulk',
          () => 'Smash'
        )
        .pipe(() => 'Foo');
      expect(logsListener).toBeCalledTimes(2);
      expect(newMiddlewaresListener).toBeCalledTimes(2);
      expect(middlewaresListener).toBeCalledTimes(2);

      app.pipe(() => 'Foo');
      expect(logsListener).toBeCalledTimes(3);
      expect(newMiddlewaresListener).toBeCalledTimes(3);
      expect(middlewaresListener).toBeCalledTimes(3);

      app.pipe(() => 'Hail').pipe(() => 'Hydra');
      expect(logsListener).toBeCalledTimes(5);
      expect(newMiddlewaresListener).toBeCalledTimes(5);
      expect(middlewaresListener).toBeCalledTimes(5);
    });

    test('correct events are emitted', () => {
      const middleware1: DummyMiddlewareSync = () => 'Foo';
      const middleware2: DummyMiddlewareSync = () => 'Bar';
      const middleware3: DummyMiddlewareSync = () => 'Hulk';
      const middleware4: DummyMiddlewareSync = () => 'Smash';

      const app = serverlessly
        .on('LOG', logsListener)
        .on('NEW_MIDDLEWARES', newMiddlewaresListener)
        .on('MIDDLEWARES', middlewaresListener)
        .pipe(middleware1, middleware2);
      expect(logsListener).toBeCalledWith(
        'Pipe: 2 middlewares registered (new global middlewares count: 2)'
      );
      expect(newMiddlewaresListener).toBeCalledWith([middleware1, middleware2]);
      expect(middlewaresListener).toBeCalledWith([middleware1, middleware2]);

      app.pipe(middleware3);
      expect(logsListener).lastCalledWith(
        'Pipe: 1 middleware registered (new global middlewares count: 3)'
      );
      expect(newMiddlewaresListener).lastCalledWith([middleware3]);
      expect(middlewaresListener).lastCalledWith([
        middleware1,
        middleware2,
        middleware3,
      ]);

      app.pipe(middleware4);
      expect(logsListener).lastCalledWith(
        'Pipe: 1 middleware registered (new global middlewares count: 4)'
      );
      expect(newMiddlewaresListener).lastCalledWith([middleware4]);
      expect(middlewaresListener).lastCalledWith([
        middleware1,
        middleware2,
        middleware3,
        middleware4,
      ]);
    });
  });
});

describe('pipe() method of ServerlesslySyncOrAsync', () => {
  let serverlessly: ServerlesslySyncOrAsync;
  beforeEach(() => {
    serverlessly = new Serverlessly({
      middlewareEngine: dummyMiddlewareEngineSyncOrAsync,
    });
  });

  test('pipe() returns Serverlessly instance', () => {
    expect<ServerlesslySyncOrAsync>(
      serverlessly.pipe(
        () => Promise.resolve('Foo'),
        () => 'Bar',
        async () => 'Baz'
      )
    ).toBeInstanceOf(Serverlessly);
  });

  test('pipe() returns same Serverlessly instance', () => {
    expect<ServerlesslySyncOrAsync>(
      serverlessly.pipe(
        () => Promise.resolve('Foo'),
        () => 'Bar',
        async () => 'Baz'
      )
    ).toBe(serverlessly);
  });

  test('multiple pipe() methods can be chained', () => {
    expect(() => {
      serverlessly
        .pipe(() => 'Foo')
        .pipe(async () => 'Bar')
        .pipe(
          () => 'Hulk',
          () => Promise.resolve('Smash')
        );
    }).not.toThrowError();
  });

  test('pipe() properly updates internal state', () => {
    const middleware1: DummyMiddlewareSyncOrAsync = () =>
      Promise.resolve('Foo');
    const middleware2: DummyMiddlewareSyncOrAsync = () => 'Bar';
    const middleware3: DummyMiddlewareSyncOrAsync = async () => 'Hulk';
    const middleware4: DummyMiddlewareSyncOrAsync = () =>
      Promise.resolve('Smash');
    expect<DummyMiddlewareSyncOrAsync[]>(
      serverlessly
        .pipe(middleware1)
        .pipe(middleware2)
        .pipe(middleware3, middleware4).middlewares
    ).toStrictEqual([middleware1, middleware2, middleware3, middleware4]);
  });

  describe('Events emitted by pipe()', () => {
    let logsListener: jest.Mock;
    let newMiddlewaresListener: jest.Mock;
    let middlewaresListener: jest.Mock;

    beforeEach(() => {
      logsListener = jest.fn();
      newMiddlewaresListener = jest.fn();
      middlewaresListener = jest.fn();
    });

    test('Events are emitted', () => {
      serverlessly
        .on('LOG', logsListener)
        .on('NEW_MIDDLEWARES', newMiddlewaresListener)
        .on('MIDDLEWARES', middlewaresListener)
        .pipe(() => 'Foo');
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

      app
        .pipe(
          () => 'Hulk',
          () => 'Smash'
        )
        .pipe(() => 'Foo');
      expect(logsListener).toBeCalledTimes(2);
      expect(newMiddlewaresListener).toBeCalledTimes(2);
      expect(middlewaresListener).toBeCalledTimes(2);

      app.pipe(() => 'Foo');
      expect(logsListener).toBeCalledTimes(3);
      expect(newMiddlewaresListener).toBeCalledTimes(3);
      expect(middlewaresListener).toBeCalledTimes(3);

      app.pipe(() => 'Hail').pipe(() => 'Hydra');
      expect(logsListener).toBeCalledTimes(5);
      expect(newMiddlewaresListener).toBeCalledTimes(5);
      expect(middlewaresListener).toBeCalledTimes(5);
    });

    test('correct events are emitted', () => {
      const middleware1: DummyMiddlewareSync = () => 'Foo';
      const middleware2: DummyMiddlewareSync = () => 'Bar';
      const middleware3: DummyMiddlewareSync = () => 'Hulk';
      const middleware4: DummyMiddlewareSync = () => 'Smash';

      const app = serverlessly
        .on('LOG', logsListener)
        .on('NEW_MIDDLEWARES', newMiddlewaresListener)
        .on('MIDDLEWARES', middlewaresListener)
        .pipe(middleware1, middleware2);
      expect(logsListener).toBeCalledWith(
        'Pipe: 2 middlewares registered (new global middlewares count: 2)'
      );
      expect(newMiddlewaresListener).toBeCalledWith([middleware1, middleware2]);
      expect(middlewaresListener).toBeCalledWith([middleware1, middleware2]);

      app.pipe(middleware3);
      expect(logsListener).lastCalledWith(
        'Pipe: 1 middleware registered (new global middlewares count: 3)'
      );
      expect(newMiddlewaresListener).lastCalledWith([middleware3]);
      expect(middlewaresListener).lastCalledWith([
        middleware1,
        middleware2,
        middleware3,
      ]);

      app.pipe(middleware4);
      expect(logsListener).lastCalledWith(
        'Pipe: 1 middleware registered (new global middlewares count: 4)'
      );
      expect(newMiddlewaresListener).lastCalledWith([middleware4]);
      expect(middlewaresListener).lastCalledWith([
        middleware1,
        middleware2,
        middleware3,
        middleware4,
      ]);
    });
  });
});

describe('pipe() method of ServerlesslySyncOrAsyncToSync', () => {
  let serverlessly: ServerlesslySyncOrAsyncToSync;
  beforeEach(() => {
    serverlessly = new Serverlessly({
      middlewareEngine: dummyMiddlewareEngineSyncMiddlewareToSyncOrAsyncProtocol,
    });
  });

  test('pipe() returns Serverlessly instance', () => {
    expect<ServerlesslySyncOrAsyncToSync>(
      serverlessly.pipe(() => 'Foo')
    ).toBeInstanceOf(Serverlessly);
  });

  test('pipe() returns same Serverlessly instance', () => {
    expect<ServerlesslySyncOrAsyncToSync>(serverlessly.pipe(() => 'Foo')).toBe(
      serverlessly
    );
  });

  test('multiple pipe() methods can be chained', () => {
    expect(() => {
      serverlessly
        .pipe(() => 'Foo')
        .pipe(() => 'Bar')
        .pipe(
          () => 'Hulk',
          () => 'Smash'
        );
    }).not.toThrowError();
  });

  test('pipe() properly updates internal state', () => {
    const middleware1: DummyMiddlewareSync = () => 'Foo';
    const middleware2: DummyMiddlewareSync = () => 'Bar';
    const middleware3: DummyMiddlewareSync = () => 'Hulk';
    const middleware4: DummyMiddlewareSync = () => 'Smash';

    expect<DummyMiddlewareSync[]>(
      serverlessly
        .pipe(middleware1)
        .pipe(middleware2)
        .pipe(middleware3, middleware4).middlewares
    ).toStrictEqual([middleware1, middleware2, middleware3, middleware4]);
  });

  describe('Events emitted by pipe()', () => {
    let logsListener: jest.Mock;
    let newMiddlewaresListener: jest.Mock;
    let middlewaresListener: jest.Mock;

    beforeEach(() => {
      logsListener = jest.fn();
      newMiddlewaresListener = jest.fn();
      middlewaresListener = jest.fn();
    });

    test('Events are emitted', () => {
      serverlessly
        .on('LOG', logsListener)
        .on('NEW_MIDDLEWARES', newMiddlewaresListener)
        .on('MIDDLEWARES', middlewaresListener)
        .pipe(() => 'Foo');
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

      app
        .pipe(
          () => 'Hulk',
          () => 'Smash'
        )
        .pipe(() => 'Foo');
      expect(logsListener).toBeCalledTimes(2);
      expect(newMiddlewaresListener).toBeCalledTimes(2);
      expect(middlewaresListener).toBeCalledTimes(2);

      app.pipe(() => 'Foo');
      expect(logsListener).toBeCalledTimes(3);
      expect(newMiddlewaresListener).toBeCalledTimes(3);
      expect(middlewaresListener).toBeCalledTimes(3);

      app.pipe(() => 'Hail').pipe(() => 'Hydra');
      expect(logsListener).toBeCalledTimes(5);
      expect(newMiddlewaresListener).toBeCalledTimes(5);
      expect(middlewaresListener).toBeCalledTimes(5);
    });

    test('correct events are emitted', () => {
      const middleware1: DummyMiddlewareSync = () => 'Foo';
      const middleware2: DummyMiddlewareSync = () => 'Bar';
      const middleware3: DummyMiddlewareSync = () => 'Hulk';
      const middleware4: DummyMiddlewareSync = () => 'Smash';

      const app = serverlessly
        .on('LOG', logsListener)
        .on('NEW_MIDDLEWARES', newMiddlewaresListener)
        .on('MIDDLEWARES', middlewaresListener)
        .pipe(middleware1, middleware2);
      expect(logsListener).toBeCalledWith(
        'Pipe: 2 middlewares registered (new global middlewares count: 2)'
      );
      expect(newMiddlewaresListener).toBeCalledWith([middleware1, middleware2]);
      expect(middlewaresListener).toBeCalledWith([middleware1, middleware2]);

      app.pipe(middleware3);
      expect(logsListener).lastCalledWith(
        'Pipe: 1 middleware registered (new global middlewares count: 3)'
      );
      expect(newMiddlewaresListener).lastCalledWith([middleware3]);
      expect(middlewaresListener).lastCalledWith([
        middleware1,
        middleware2,
        middleware3,
      ]);

      app.pipe(middleware4);
      expect(logsListener).lastCalledWith(
        'Pipe: 1 middleware registered (new global middlewares count: 4)'
      );
      expect(newMiddlewaresListener).lastCalledWith([middleware4]);
      expect(middlewaresListener).lastCalledWith([
        middleware1,
        middleware2,
        middleware3,
        middleware4,
      ]);
    });
  });
});

describe('pipe() method of ServerlesslySyncOrAsyncToAsync', () => {
  let serverlessly: ServerlesslySyncOrAsyncToAsync;
  beforeEach(() => {
    serverlessly = new Serverlessly({
      middlewareEngine: dummyMiddlewareEngineAsyncMiddlewareToSyncOrAsyncProtocol,
    });
  });

  test('pipe() returns Serverlessly instance', () => {
    expect<ServerlesslySyncOrAsyncToAsync>(
      serverlessly.pipe(() => Promise.resolve('Foo'))
    ).toBeInstanceOf(Serverlessly);
  });

  test('pipe() returns same Serverlessly instance', () => {
    expect<ServerlesslySyncOrAsyncToAsync>(
      serverlessly.pipe(() => Promise.resolve('Foo'))
    ).toBe(serverlessly);
  });

  test('multiple pipe() methods can be chained', () => {
    expect(() => {
      serverlessly
        .pipe(() => Promise.resolve('Foo'))
        .pipe(() => Promise.resolve('Bar'))
        .pipe(
          () => Promise.resolve('Hulk'),
          () => Promise.resolve('Smash')
        );
    }).not.toThrowError();
  });

  test('pipe() properly updates internal state', () => {
    const middleware1: DummyMiddlewareAsync = () => Promise.resolve('Foo');
    const middleware2: DummyMiddlewareAsync = async () => 'Bar';
    const middleware3: DummyMiddlewareAsync = async () => 'Hulk';
    const middleware4: DummyMiddlewareAsync = () => Promise.resolve('Smash');
    expect<DummyMiddlewareAsync[]>(
      serverlessly
        .pipe(middleware1)
        .pipe(middleware2)
        .pipe(middleware3, middleware4).middlewares
    ).toStrictEqual([middleware1, middleware2, middleware3, middleware4]);
  });

  describe('Events emitted by pipe()', () => {
    let logsListener: jest.Mock;
    let newMiddlewaresListener: jest.Mock;
    let middlewaresListener: jest.Mock;

    beforeEach(() => {
      logsListener = jest.fn();
      newMiddlewaresListener = jest.fn();
      middlewaresListener = jest.fn();
    });

    test('Events are emitted', () => {
      serverlessly
        .on('LOG', logsListener)
        .on('NEW_MIDDLEWARES', newMiddlewaresListener)
        .on('MIDDLEWARES', middlewaresListener)
        .pipe(async () => 'Foo');
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

      app
        .pipe(
          async () => 'Hulk',
          async () => 'Smash'
        )
        .pipe(async () => 'Foo');
      expect(logsListener).toBeCalledTimes(2);
      expect(newMiddlewaresListener).toBeCalledTimes(2);
      expect(middlewaresListener).toBeCalledTimes(2);

      app.pipe(async () => 'Foo');
      expect(logsListener).toBeCalledTimes(3);
      expect(newMiddlewaresListener).toBeCalledTimes(3);
      expect(middlewaresListener).toBeCalledTimes(3);

      app.pipe(async () => 'Hail').pipe(async () => 'Hydra');
      expect(logsListener).toBeCalledTimes(5);
      expect(newMiddlewaresListener).toBeCalledTimes(5);
      expect(middlewaresListener).toBeCalledTimes(5);
    });

    test('correct events are emitted', () => {
      const middleware1: DummyMiddlewareAsync = () => Promise.resolve('Foo');
      const middleware2: DummyMiddlewareAsync = async () => 'Bar';
      const middleware3: DummyMiddlewareAsync = async () => 'Hulk';
      const middleware4: DummyMiddlewareAsync = () => Promise.resolve('Smash');

      const app = serverlessly
        .on('LOG', logsListener)
        .on('NEW_MIDDLEWARES', newMiddlewaresListener)
        .on('MIDDLEWARES', middlewaresListener)
        .pipe(middleware1, middleware2);
      expect(logsListener).toBeCalledWith(
        'Pipe: 2 middlewares registered (new global middlewares count: 2)'
      );
      expect(newMiddlewaresListener).toBeCalledWith([middleware1, middleware2]);
      expect(middlewaresListener).toBeCalledWith([middleware1, middleware2]);

      app.pipe(middleware3);
      expect(logsListener).lastCalledWith(
        'Pipe: 1 middleware registered (new global middlewares count: 3)'
      );
      expect(newMiddlewaresListener).lastCalledWith([middleware3]);
      expect(middlewaresListener).lastCalledWith([
        middleware1,
        middleware2,
        middleware3,
      ]);

      app.pipe(middleware4);
      expect(logsListener).lastCalledWith(
        'Pipe: 1 middleware registered (new global middlewares count: 4)'
      );
      expect(newMiddlewaresListener).lastCalledWith([middleware4]);
      expect(middlewaresListener).lastCalledWith([
        middleware1,
        middleware2,
        middleware3,
        middleware4,
      ]);
    });
  });
});
