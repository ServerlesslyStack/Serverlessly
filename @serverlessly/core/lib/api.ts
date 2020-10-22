import { HandlerProps } from './handler';

export interface ServerlesslyAPI<TProtocol, TMiddleware> {
  pipe(...middleware: [TMiddleware, ...TMiddleware[]]): this;
  getHandler<THandler = TProtocol>(
    props?: HandlerProps<TProtocol, THandler>
  ): THandler | TProtocol;
}
