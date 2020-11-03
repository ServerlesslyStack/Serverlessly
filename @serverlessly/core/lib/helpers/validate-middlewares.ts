export function validateMiddlewares<TMiddleware>(
  middlewares: TMiddleware[]
): void {
  if (!middlewares.length) throw new Error('No Middleware Found');
}
