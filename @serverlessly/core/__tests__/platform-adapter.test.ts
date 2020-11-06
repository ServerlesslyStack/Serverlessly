import { protocolPlatformAdapter } from '@serverlessly/core';

test('protocolPlatformAdapter is a passthrough Platform Adapter', () => {
  const foo = () => 'Foo';
  expect(protocolPlatformAdapter(foo)).toBe(foo);
});
