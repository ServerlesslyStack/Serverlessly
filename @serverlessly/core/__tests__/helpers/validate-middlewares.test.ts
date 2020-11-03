import { validateMiddlewares } from '../../lib/helpers/validate-middlewares';

test('validateMiddlewares() throws if middlewares argument is an empty array', () => {
  expect(() => {
    validateMiddlewares([]);
  }).toThrow();
});

test('validateMiddlewares() throws correct error if middlewares argument is an empty array', () => {
  expect(() => {
    validateMiddlewares([]);
  }).toThrow(new Error('No Middleware Found'));
});

test('validateMiddlewares() does not throw if middlewares argument is not an empty array', () => {
  expect(() => {
    validateMiddlewares(['Foo']);
  }).not.toThrow();
});
