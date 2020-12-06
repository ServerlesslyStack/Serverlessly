import { protocolServerAdapter } from '@serverlessly/core';

test('protocolServerAdapter is a passthrough Platform Adapter', () => {
  const foo = () => 'Foo';
  expect(protocolServerAdapter(foo)).toBe(foo);
});
