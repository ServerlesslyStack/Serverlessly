/**
 * Represents state of a Serverlessly `Protocol`
 */
export abstract class ProtocolContext {
  /**
   * A function which is called on each microservice invocation (or, server connection)
   */
  abstract readonly listener: Function;
}

/**
 * Serverlessly `Protocol` which represents a network protocol like `http`
 * @typeParam TProtocolContext - State of Serverlessly `Protocol`
 *
 * @remarks
 * A new `Protocol` needs to extend this abstract class
 */
export abstract class Protocol<TProtocolContext extends ProtocolContext> {
  /**
   * Descriptive name of this Serverlessly `Protocol`
   *
   * @remarks
   * This name is used during debug logging & can be used by external tools for other purposes like search indexing
   */
  abstract readonly name: string;

  /**
   * State of this Serverlessly `Protocol`
   */
  protected context?: TProtocolContext;

  /**
   * Sets `Context` of Serverlessly `Protocol`
   * @param context - New state of Serverlessly `Protocol`
   *
   * @remarks
   * `Middleware Engines` are required to invoke it
   */
  public setContext(context: TProtocolContext): void {
    this.context = context;
  }

  /**
   * Generates listener with consumer code
   *
   * @remarks
   * `Platform Adapters` are required to invoke it
   */
  abstract getListener(...args: unknown[]): unknown;
}
