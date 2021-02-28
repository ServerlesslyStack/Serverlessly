import { Protocol } from '@serverlessly/core';
import {
  DummyProtocolContextSync,
  DummyProtocolContextAsync,
  DummyProtocolContextSyncOrAsync,
} from './protocol-contexts';

// Sync=0 Async=1 SyncOrAsync=2
// 01 = Sync Protocol Context & Async Listener

// Dummy Protocols

//00
export class DummyProtocolSync extends Protocol<DummyProtocolContextSync> {
  name = 'DummyProtocolSync';
  getListener(): DummyProtocolContextSync['listener'] {
    return (prefix: string) => {
      if (this.context) {
        return this.context.listener(prefix);
      } else {
        throw new Error(`Protocol Context hasn't been set.`);
      }
    };
  }
}

export class DummyProtocol01 extends Protocol<DummyProtocolContextSync> {
  name = 'DummyProtocol01';
  getListener(): DummyProtocolContextAsync['listener'] {
    return async (prefix: string) => {
      if (this.context) {
        return this.context.listener(prefix);
      } else {
        throw new Error(`Protocol Context hasn't been set.`);
      }
    };
  }
}

export class DummyProtocol02 extends Protocol<DummyProtocolContextSync> {
  name = 'DummyProtocol02';
  getListener(): DummyProtocolContextSyncOrAsync['listener'] {
    return (prefix: string) => {
      if (this.context) {
        return this.context.listener(prefix);
      } else {
        throw new Error(`Protocol Context hasn't been set.`);
      }
    };
  }
}

// An Impossibility!!!
// export class DummyProtocol10 extends Protocol<DummyProtocolContextAsync> {
//   name = 'DummyProtocol10';
//   getListener(): DummyProtocolContextSync['listener'] {
//     return (prefix: string) => {
//       if (this.context) {
//         return this.context.listener(prefix);
//       } else {
//         throw new Error(`Protocol Context hasn't been set.`);
//       }
//     };
//   }
// }

// 11
export class DummyProtocolAsync extends Protocol<DummyProtocolContextAsync> {
  name = 'DummyProtocolAsync';
  getListener(): DummyProtocolContextAsync['listener'] {
    return async (prefix: string) => {
      if (this.context) {
        return this.context.listener(prefix);
      } else {
        throw new Error(`Protocol Context hasn't been set.`);
      }
    };
  }
}

export class DummyProtocol12 extends Protocol<DummyProtocolContextAsync> {
  name = 'DummyProtocol12';
  getListener(): DummyProtocolContextSyncOrAsync['listener'] {
    return async (prefix: string) => {
      if (this.context) {
        return this.context.listener(prefix);
      } else {
        throw new Error(`Protocol Context hasn't been set.`);
      }
    };
  }
}

// An Impossibility!!!
// export class DummyProtocol20 extends Protocol<DummyProtocolContextSyncOrAsync> {
//   name = 'DummyProtocol20';
//   getListener(): DummyProtocolContextSync['listener'] {
//     return (prefix: string) => {
//       if (this.context) {
//         return this.context.listener(prefix);
//       } else {
//         throw new Error(`Protocol Context hasn't been set.`);
//       }
//     };
//   }
// }

export class DummyProtocol21 extends Protocol<DummyProtocolContextSyncOrAsync> {
  name = 'DummyProtocol21';
  getListener(): DummyProtocolContextAsync['listener'] {
    return async (prefix: string) => {
      if (this.context) {
        return this.context.listener(prefix);
      } else {
        throw new Error(`Protocol Context hasn't been set.`);
      }
    };
  }
}

// 22
export class DummyProtocolSyncOrAsync extends Protocol<DummyProtocolContextSyncOrAsync> {
  name = 'DummyProtocolSyncOrAsync';
  getListener(): DummyProtocolContextSyncOrAsync['listener'] {
    return async (prefix: string) => {
      if (this.context) {
        return this.context.listener(prefix);
      } else {
        throw new Error(`Protocol Context hasn't been set.`);
      }
    };
  }
}
