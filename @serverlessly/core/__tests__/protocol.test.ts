import { Protocol, protocolServerAdapter } from '@serverlessly/core';
import { dummyMiddlewareEngineSync } from './dummies/middleware-engines';
import { DummyMiddlewareSync } from './dummies/middlewares';
import { DummyProtocolContextSync } from './dummies/protocol-contexts';
import { dummyProtocolServerFactorySync } from './dummies/protocol-server-factories';
import { DummyProtocolServerSync } from './dummies/protocol-servers';

test('Protocol is initialized successfully', () => {
  expect<
    Protocol<
      DummyProtocolContextSync,
      DummyMiddlewareSync,
      DummyProtocolServerSync,
      string
    >
  >(
    new Protocol({
      name: 'Dummy Protocol',
      middlewareEngine: dummyMiddlewareEngineSync,
      serverFactory: dummyProtocolServerFactorySync,
    })
  ).toBeTruthy();
});

test('Initialized Protocol is correct object', () => {
  expect(
    new Protocol({
      name: 'Dummy Protocol',
      middlewareEngine: dummyMiddlewareEngineSync,
      serverFactory: dummyProtocolServerFactorySync,
    })
  ).toMatchObject({
    name: 'Dummy Protocol',
    middlewareEngine: dummyMiddlewareEngineSync,
    serverFactory: dummyProtocolServerFactorySync,
  });
});

test('protocolServerAdapter is a passthrough Platform Adapter', () => {
  const foo = () => 'Foo';
  expect(protocolServerAdapter(foo)).toBe(foo);
});
