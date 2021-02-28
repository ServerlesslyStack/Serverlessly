import { PlatformAdapter } from '@serverlessly/core';
import {
  DummyPlatformHandlerSync,
  DummyPlatformHandlerAsync,
  DummyPlatformHandlerSyncOrAsync,
} from './platform-handlers';
import {
  DummyProtocol01,
  DummyProtocol02,
  DummyProtocol12,
  DummyProtocol21,
  DummyProtocolAsync,
  DummyProtocolSync,
  DummyProtocolSyncOrAsync,
} from './protocols';

// Sync=0 Async=1 SyncOrAsync=2
// 001 = 00 Protocol & Async Platform Handler

// Dummy Platform Adapter

// 000
export class DummyPlatformAdapterSync extends PlatformAdapter<
  DummyProtocolSync,
  DummyPlatformHandlerSync
> {
  name = 'DummyPlatformAdapterSync';
  adapter(protocol: DummyProtocolSync): DummyPlatformHandlerSync {
    return (prefix: string) => protocol.getListener()(prefix);
  }
}

export class DummyPlatformAdapter001 extends PlatformAdapter<
  DummyProtocolSync,
  DummyPlatformHandlerAsync
> {
  name = 'DummyPlatformAdapter001';
  adapter(protocol: DummyProtocolSync): DummyPlatformHandlerAsync {
    return async (prefix: string) => protocol.getListener()(prefix);
  }
}

export class DummyPlatformAdapter002 extends PlatformAdapter<
  DummyProtocolSync,
  DummyPlatformHandlerSyncOrAsync
> {
  name = 'DummyPlatformAdapter002';
  adapter(protocol: DummyProtocolSync): DummyPlatformHandlerSyncOrAsync {
    return (prefix: string) => protocol.getListener()(prefix);
  }
}

// An Impossibility!!!
// export class DummyPlatformAdapter010 extends PlatformAdapter<
//   DummyProtocol01,
//   DummyPlatformHandlerSync
// > {
//   name = 'DummyPlatformAdapter010';
//   adapter(protocol: DummyProtocol01): DummyPlatformHandlerSync {
//     return async (prefix: string) => await protocol.getListener()(prefix);
//   }
// }

export class DummyPlatformAdapter011 extends PlatformAdapter<
  DummyProtocol01,
  DummyPlatformHandlerAsync
> {
  name = 'DummyPlatformAdapter011';
  adapter(protocol: DummyProtocol01): DummyPlatformHandlerAsync {
    return async (prefix: string) => await protocol.getListener()(prefix);
  }
}

export class DummyPlatformAdapter012 extends PlatformAdapter<
  DummyProtocol01,
  DummyPlatformHandlerSyncOrAsync
> {
  name = 'DummyPlatformAdapter012';
  adapter(protocol: DummyProtocol01): DummyPlatformHandlerSyncOrAsync {
    return async (prefix: string) => await protocol.getListener()(prefix);
  }
}

// An Impossibility!!!
// export class DummyPlatformAdapter020 extends PlatformAdapter<
//   DummyProtocol02,
//   DummyPlatformHandlerSync
// > {
//   name = 'DummyPlatformAdapter020';
//   adapter(protocol: DummyProtocol02): DummyPlatformHandlerSync {
//     return async (prefix: string) => await protocol.getListener()(prefix);
//   }
// }

export class DummyPlatformAdapter021 extends PlatformAdapter<
  DummyProtocol02,
  DummyPlatformHandlerAsync
> {
  name = 'DummyPlatformAdapter021';
  adapter(protocol: DummyProtocol02): DummyPlatformHandlerAsync {
    return async (prefix: string) => await protocol.getListener()(prefix);
  }
}

export class DummyPlatformAdapter022 extends PlatformAdapter<
  DummyProtocol02,
  DummyPlatformHandlerSyncOrAsync
> {
  name = 'DummyPlatformAdapter022';
  adapter(protocol: DummyProtocol02): DummyPlatformHandlerSyncOrAsync {
    return async (prefix: string) => await protocol.getListener()(prefix);
  }
}

// An Impossibility!!!
// export class DummyPlatformAdapter110 extends PlatformAdapter<
//   DummyProtocolAsync,
//   DummyPlatformHandlerSync
// > {
//   name = 'DummyPlatformAdapter110';
//   adapter(protocol: DummyProtocolAsync): DummyPlatformHandlerSync {
//     return async (prefix: string) => await protocol.getListener()(prefix);
//   }
// }

// 111
export class DummyPlatformAdapterAsync extends PlatformAdapter<
  DummyProtocolAsync,
  DummyPlatformHandlerAsync
> {
  name = 'DummyPlatformAdapterAsync';
  adapter(protocol: DummyProtocolAsync): DummyPlatformHandlerAsync {
    return async (prefix: string) => await protocol.getListener()(prefix);
  }
}

export class DummyPlatformAdapter112 extends PlatformAdapter<
  DummyProtocolAsync,
  DummyPlatformHandlerSyncOrAsync
> {
  name = 'DummyPlatformAdapter112';
  adapter(protocol: DummyProtocolAsync): DummyPlatformHandlerSyncOrAsync {
    return async (prefix: string) => await protocol.getListener()(prefix);
  }
}

// An Impossibility!!!
// export class DummyPlatformAdapter120 extends PlatformAdapter<
//   DummyProtocol12,
//   DummyPlatformHandlerSync
// > {
//   name = 'DummyPlatformAdapter120';
//   adapter(protocol: DummyProtocol12): DummyPlatformHandlerSync {
//     return async (prefix: string) => await protocol.getListener()(prefix);
//   }
// }

export class DummyPlatformAdapter121 extends PlatformAdapter<
  DummyProtocol12,
  DummyPlatformHandlerAsync
> {
  name = 'DummyPlatformAdapter121';
  adapter(protocol: DummyProtocol12): DummyPlatformHandlerAsync {
    return async (prefix: string) => await protocol.getListener()(prefix);
  }
}

export class DummyPlatformAdapter122 extends PlatformAdapter<
  DummyProtocol12,
  DummyPlatformHandlerSyncOrAsync
> {
  name = 'DummyPlatformAdapter122';
  adapter(protocol: DummyProtocol12): DummyPlatformHandlerSyncOrAsync {
    return async (prefix: string) => await protocol.getListener()(prefix);
  }
}

// An Impossibility!!!
// export class DummyPlatformAdapter210 extends PlatformAdapter<
//   DummyProtocol21,
//   DummyPlatformHandlerSync
// > {
//   name = 'DummyPlatformAdapter210';
//   adapter(protocol: DummyProtocol21): DummyPlatformHandlerSync {
//     return async (prefix: string) => await protocol.getListener()(prefix);
//   }
// }

export class DummyPlatformAdapter211 extends PlatformAdapter<
  DummyProtocol21,
  DummyPlatformHandlerAsync
> {
  name = 'DummyPlatformAdapter211';
  adapter(protocol: DummyProtocol21): DummyPlatformHandlerAsync {
    return async (prefix: string) => await protocol.getListener()(prefix);
  }
}

export class DummyPlatformAdapter212 extends PlatformAdapter<
  DummyProtocol21,
  DummyPlatformHandlerSyncOrAsync
> {
  name = 'DummyPlatformAdapter212';
  adapter(protocol: DummyProtocol21): DummyPlatformHandlerSyncOrAsync {
    return async (prefix: string) => await protocol.getListener()(prefix);
  }
}

// An Impossibility!!!
// export class DummyPlatformAdapter220 extends PlatformAdapter<
//   DummyProtocolSyncOrAsync,
//   DummyPlatformHandlerSync
// > {
//   name = 'DummyPlatformAdapter220';
//   adapter(protocol: DummyProtocolSyncOrAsync): DummyPlatformHandlerSync {
//     return async (prefix: string) => await protocol.getListener()(prefix);
//   }
// }

export class DummyPlatformAdapter221 extends PlatformAdapter<
  DummyProtocolSyncOrAsync,
  DummyPlatformHandlerAsync
> {
  name = 'DummyPlatformAdapter221';
  adapter(protocol: DummyProtocolSyncOrAsync): DummyPlatformHandlerAsync {
    return async (prefix: string) => await protocol.getListener()(prefix);
  }
}

// 222
export class DummyPlatformAdapterSyncOrAsync extends PlatformAdapter<
  DummyProtocolSyncOrAsync,
  DummyPlatformHandlerSyncOrAsync
> {
  name = 'DummyPlatformAdapterSyncOrAsync';
  adapter(protocol: DummyProtocolSyncOrAsync): DummyPlatformHandlerSyncOrAsync {
    return async (prefix: string) => await protocol.getListener()(prefix);
  }
}

// Faulty Platform Adapters

// 000
export class FaultyPlatformAdapterSync extends PlatformAdapter<
  DummyProtocolSync,
  DummyPlatformHandlerSync
> {
  name = 'FaultyPlatformAdapterSync';
  adapter(protocol: DummyProtocolSync): DummyPlatformHandlerSync {
    [].length = -1; // RangeError
    return (prefix: string) => protocol.getListener()(prefix);
  }
}

export class FaultyPlatformAdapter001 extends PlatformAdapter<
  DummyProtocolSync,
  DummyPlatformHandlerAsync
> {
  name = 'FaultyPlatformAdapter001';
  adapter(protocol: DummyProtocolSync): DummyPlatformHandlerAsync {
    [].length = -1; // RangeError
    return async (prefix: string) => protocol.getListener()(prefix);
  }
}

export class FaultyPlatformAdapter002 extends PlatformAdapter<
  DummyProtocolSync,
  DummyPlatformHandlerSyncOrAsync
> {
  name = 'FaultyPlatformAdapter002';
  adapter(protocol: DummyProtocolSync): DummyPlatformHandlerSyncOrAsync {
    [].length = -1; // RangeError
    return (prefix: string) => protocol.getListener()(prefix);
  }
}

export class FaultyPlatformAdapter011 extends PlatformAdapter<
  DummyProtocol01,
  DummyPlatformHandlerAsync
> {
  name = 'FaultyPlatformAdapter011';
  adapter(protocol: DummyProtocol01): DummyPlatformHandlerAsync {
    [].length = -1; // RangeError
    return async (prefix: string) => await protocol.getListener()(prefix);
  }
}

export class FaultyPlatformAdapter012 extends PlatformAdapter<
  DummyProtocol01,
  DummyPlatformHandlerSyncOrAsync
> {
  name = 'FaultyPlatformAdapter012';
  adapter(protocol: DummyProtocol01): DummyPlatformHandlerSyncOrAsync {
    [].length = -1; // RangeError
    return async (prefix: string) => await protocol.getListener()(prefix);
  }
}

export class FaultyPlatformAdapter021 extends PlatformAdapter<
  DummyProtocol02,
  DummyPlatformHandlerAsync
> {
  name = 'FaultyPlatformAdapter021';
  adapter(protocol: DummyProtocol02): DummyPlatformHandlerAsync {
    [].length = -1; // RangeError
    return async (prefix: string) => await protocol.getListener()(prefix);
  }
}

export class FaultyPlatformAdapter022 extends PlatformAdapter<
  DummyProtocol02,
  DummyPlatformHandlerSyncOrAsync
> {
  name = 'FaultyPlatformAdapter022';
  adapter(protocol: DummyProtocol02): DummyPlatformHandlerSyncOrAsync {
    [].length = -1; // RangeError
    return async (prefix: string) => await protocol.getListener()(prefix);
  }
}

export class FaultyPlatformAdapterAsync extends PlatformAdapter<
  DummyProtocolAsync,
  DummyPlatformHandlerAsync
> {
  name = 'FaultyPlatformAdapterAsync';
  adapter(protocol: DummyProtocolAsync): DummyPlatformHandlerAsync {
    [].length = -1; // RangeError
    return async (prefix: string) => await protocol.getListener()(prefix);
  }
}

export class FaultyPlatformAdapter112 extends PlatformAdapter<
  DummyProtocolAsync,
  DummyPlatformHandlerSyncOrAsync
> {
  name = 'FaultyPlatformAdapter112';
  adapter(protocol: DummyProtocolAsync): DummyPlatformHandlerSyncOrAsync {
    [].length = -1; // RangeError
    return async (prefix: string) => await protocol.getListener()(prefix);
  }
}

export class FaultyPlatformAdapter121 extends PlatformAdapter<
  DummyProtocol12,
  DummyPlatformHandlerAsync
> {
  name = 'FaultyPlatformAdapter121';
  adapter(protocol: DummyProtocol12): DummyPlatformHandlerAsync {
    [].length = -1; // RangeError
    return async (prefix: string) => await protocol.getListener()(prefix);
  }
}

export class FaultyPlatformAdapter122 extends PlatformAdapter<
  DummyProtocol12,
  DummyPlatformHandlerSyncOrAsync
> {
  name = 'FaultyPlatformAdapter122';
  adapter(protocol: DummyProtocol12): DummyPlatformHandlerSyncOrAsync {
    [].length = -1; // RangeError
    return async (prefix: string) => await protocol.getListener()(prefix);
  }
}

export class FaultyPlatformAdapter211 extends PlatformAdapter<
  DummyProtocol21,
  DummyPlatformHandlerAsync
> {
  name = 'FaultyPlatformAdapter211';
  adapter(protocol: DummyProtocol21): DummyPlatformHandlerAsync {
    [].length = -1; // RangeError
    return async (prefix: string) => await protocol.getListener()(prefix);
  }
}

export class FaultyPlatformAdapter212 extends PlatformAdapter<
  DummyProtocol21,
  DummyPlatformHandlerSyncOrAsync
> {
  name = 'FaultyPlatformAdapter212';
  adapter(protocol: DummyProtocol21): DummyPlatformHandlerSyncOrAsync {
    [].length = -1; // RangeError
    return async (prefix: string) => await protocol.getListener()(prefix);
  }
}

export class FaultyPlatformAdapter221 extends PlatformAdapter<
  DummyProtocolSyncOrAsync,
  DummyPlatformHandlerAsync
> {
  name = 'FaultyPlatformAdapter221';
  adapter(protocol: DummyProtocolSyncOrAsync): DummyPlatformHandlerAsync {
    [].length = -1; // RangeError
    return async (prefix: string) => await protocol.getListener()(prefix);
  }
}

// 222
export class FaultyPlatformAdapterSyncOrAsync extends PlatformAdapter<
  DummyProtocolSyncOrAsync,
  DummyPlatformHandlerSyncOrAsync
> {
  name = 'FaultyPlatformAdapterSyncOrAsync';
  adapter(protocol: DummyProtocolSyncOrAsync): DummyPlatformHandlerSyncOrAsync {
    [].length = -1; // RangeError
    return async (prefix: string) => await protocol.getListener()(prefix);
  }
}
