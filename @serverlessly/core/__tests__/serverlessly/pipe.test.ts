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
});
