import { protocolPlatformAdapterFactory } from '@serverlessly/core';

test('protocolPlatformAdapterFactory() does not throw error', () => {
  expect(() => {
    protocolPlatformAdapterFactory();
  }).not.toThrow();
});

test('protocolPlatformAdapterFactory() returns a passthrough Platform Adapter', () => {
  const foo = () => 'Foo';
  expect(protocolPlatformAdapterFactory()(foo)).toBe(foo);
});
