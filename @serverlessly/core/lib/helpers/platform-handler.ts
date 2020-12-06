import { PlatformAdapter } from '../platform-adapter';

export function getPlatformHandler<TProtocolRequestHandler, TPlatformHandler>(
  platformAdapter: PlatformAdapter<TProtocolRequestHandler, TPlatformHandler>,
  protocolRequestHandler: TProtocolRequestHandler
): TPlatformHandler {
  try {
    return platformAdapter(protocolRequestHandler);
  } catch (error) {
    throw new Error(`Faulty Platform Adapter\n${error}`);
  }
}
