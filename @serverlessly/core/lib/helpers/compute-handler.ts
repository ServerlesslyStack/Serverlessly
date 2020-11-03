import { PlatformAdapter } from '../platform-adapter';

export function computeHandler<TProtocol, THandler>(
  platformAdapter: PlatformAdapter<TProtocol, THandler>,
  coreCodeFactory: TProtocol
): THandler {
  try {
    return platformAdapter(coreCodeFactory);
  } catch (error) {
    throw new Error(`Faulty Platform Adapter\n${error}`);
  }
}
