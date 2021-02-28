import { Protocol, ProtocolContext } from './protocol';

/**
 * `Platform Adapter` which makes it possible to run a Serverlessly microservice on a specific platform like `AWS Lambda`
 * @typeParam TProtocol - Serverlessly `Protocol` which represents a network protocol like `http`
 * @typeParam TPlatformHandler - Handler (or, Server) for a specific platform like `AWS Lambda`
 *
 * @remarks
 * A new `Platform Adapter` needs to extend this abstract class
 */
export abstract class PlatformAdapter<
  TProtocol extends Protocol<ProtocolContext>,
  TPlatformHandler
> {
  /**
   * Descriptive name of this `Platform Adapter`
   *
   * @remarks
   * This name is used during debug logging & can be used by external tools for other purposes like search indexing
   */
  abstract readonly name: string;

  /**
   * Core logic of this `Platform Adapter`
   * @param protocol - Serverlessly `Protocol` which represents a network protocol like `http`
   *
   * @remarks
   * This method can get protocol listener using `protocol.getListener()` API (refer to specific `Protocol` documentation for details)
   */
  abstract adapter(protocol: TProtocol): TPlatformHandler;

  /**
   * @internal
   * For internal use. DO NOT OVERRIDE!!!
   */
  _run(protocol: TProtocol): TPlatformHandler {
    try {
      return this.adapter(protocol);
    } catch (error) {
      throw new Error(`Faulty Platform Adapter\n${error}`);
    }
  }
}
