import { MiddlewareEngine } from '@serverlessly/core';
import {
  DummyProtocol01,
  DummyProtocol02,
  DummyProtocol12,
  DummyProtocol21,
  DummyProtocolAsync,
  DummyProtocolSync,
  DummyProtocolSyncOrAsync,
} from './protocols';
import {
  DummyMiddlewareSync,
  DummyMiddlewareAsync,
  DummyMiddlewareSyncOrAsync,
} from './middlewares';
import {
  DummyProtocolContextSync,
  DummyProtocolContextAsync,
  DummyProtocolContextSyncOrAsync,
} from './protocol-contexts';

// Sync=0 Async=1 SyncOrAsync=2
// 001 = 00 Protocol & Async Middleware

// Dummy Middleware Engines

// 000
export class DummyMiddlewareEngineSync extends MiddlewareEngine<
  DummyProtocolSync,
  DummyMiddlewareSync
> {
  name = 'DummyMiddlewareEngineSync';
  engine(
    protocol: DummyProtocolSync,
    middlewares: DummyMiddlewareSync[]
  ): void {
    protocol.setContext(
      new DummyProtocolContextSync((prefix: string) =>
        middlewares.reduce((acc, current) => acc + ' ' + current(), prefix)
      )
    );
  }
}

// An Impossibility!!!
// export class DummyMiddlewareEngine001 extends MiddlewareEngine<
//   DummyProtocolSync,
//   DummyMiddlewareAsync
// > {
//   name = 'DummyMiddlewareEngine001';
//   engine(
//     protocol: DummyProtocolSync,
//     middlewares: DummyMiddlewareAsync[]
//   ): void {
//     protocol.setContext(
//       new DummyProtocolContextSync(async (prefix: string) =>
//         middlewares.reduce(
//           (promiseChain, current) =>
//             promiseChain.then((chainResult) =>
//               current().then(
//                 (currentResult) => chainResult + ' ' + currentResult
//               )
//             ),
//           Promise.resolve(prefix)
//         )
//       )
//     );
//   }
// }

// An Impossibility!!!
// export class DummyMiddlewareEngine002 extends MiddlewareEngine<
//   DummyProtocolSync,
//   DummyMiddlewareSyncOrAsync
// > {
//   name = 'DummyMiddlewareEngine002';
//   engine(
//     protocol: DummyProtocolSync,
//     middlewares: DummyMiddlewareSyncOrAsync[]
//   ): void {
//     protocol.setContext(
//       new DummyProtocolContextSync(async (prefix: string) =>
//         middlewares.reduce(
//           (promiseChain, current) =>
//             promiseChain.then((chainResult) => {
//               let exec = current();
//               exec = exec instanceof Promise ? exec : Promise.resolve(exec);
//               return exec.then(
//                 (currentResult) => chainResult + ' ' + currentResult
//               );
//             }),
//           Promise.resolve(prefix)
//         )
//       )
//     );
//   }
// }

export class DummyMiddlewareEngine010 extends MiddlewareEngine<
  DummyProtocol01,
  DummyMiddlewareSync
> {
  name = 'DummyMiddlewareEngine010';
  engine(protocol: DummyProtocol01, middlewares: DummyMiddlewareSync[]): void {
    protocol.setContext(
      new DummyProtocolContextSync((prefix: string) =>
        middlewares.reduce((acc, current) => acc + ' ' + current(), prefix)
      )
    );
  }
}

// An Impossibility!!!
// export class DummyMiddlewareEngine011 extends MiddlewareEngine<
//   DummyProtocol01,
//   DummyMiddlewareAsync
// > {
//   name = 'DummyMiddlewareEngine011';
//   engine(protocol: DummyProtocol01, middlewares: DummyMiddlewareAsync[]): void {
//     protocol.setContext(
//       new DummyProtocolContextSync(async (prefix: string) =>
//         middlewares.reduce(
//           (promiseChain, current) =>
//             promiseChain.then((chainResult) =>
//               current().then(
//                 (currentResult) => chainResult + ' ' + currentResult
//               )
//             ),
//           Promise.resolve(prefix)
//         )
//       )
//     );
//   }
// }

// An Impossibility!!!
// export class DummyMiddlewareEngine012 extends MiddlewareEngine<
//   DummyProtocol01,
//   DummyMiddlewareSyncOrAsync
// > {
//   name = 'DummyMiddlewareEngine012';
//   engine(
//     protocol: DummyProtocol01,
//     middlewares: DummyMiddlewareSyncOrAsync[]
//   ): void {
//     protocol.setContext(
//       new DummyProtocolContextSync(async (prefix: string) =>
//         middlewares.reduce(
//           (promiseChain, current) =>
//             promiseChain.then((chainResult) => {
//               let exec = current();
//               exec = exec instanceof Promise ? exec : Promise.resolve(exec);
//               return exec.then(
//                 (currentResult) => chainResult + ' ' + currentResult
//               );
//             }),
//           Promise.resolve(prefix)
//         )
//       )
//     );
//   }
// }

export class DummyMiddlewareEngine020 extends MiddlewareEngine<
  DummyProtocol02,
  DummyMiddlewareSync
> {
  name = 'DummyMiddlewareEngine020';
  engine(protocol: DummyProtocol02, middlewares: DummyMiddlewareSync[]): void {
    protocol.setContext(
      new DummyProtocolContextSync((prefix: string) =>
        middlewares.reduce((acc, current) => acc + ' ' + current(), prefix)
      )
    );
  }
}

// An Impossibility!!!
// export class DummyMiddlewareEngine021 extends MiddlewareEngine<
//   DummyProtocol02,
//   DummyMiddlewareAsync
// > {
//   name = 'DummyMiddlewareEngine021';
//   engine(protocol: DummyProtocol02, middlewares: DummyMiddlewareAsync[]): void {
//     protocol.setContext(
//       new DummyProtocolContextSync(async (prefix: string) =>
//         middlewares.reduce(
//           (promiseChain, current) =>
//             promiseChain.then((chainResult) =>
//               current().then(
//                 (currentResult) => chainResult + ' ' + currentResult
//               )
//             ),
//           Promise.resolve(prefix)
//         )
//       )
//     );
//   }
// }

// An Impossibility!!!
// export class DummyMiddlewareEngine022 extends MiddlewareEngine<
//   DummyProtocol02,
//   DummyMiddlewareSyncOrAsync
// > {
//   name = 'DummyMiddlewareEngine022';
//   engine(
//     protocol: DummyProtocol02,
//     middlewares: DummyMiddlewareSyncOrAsync[]
//   ): void {
//     protocol.setContext(
//       new DummyProtocolContextSync(async (prefix: string) =>
//         middlewares.reduce(
//           (promiseChain, current) =>
//             promiseChain.then((chainResult) => {
//               let exec = current();
//               exec = exec instanceof Promise ? exec : Promise.resolve(exec);
//               return exec.then(
//                 (currentResult) => chainResult + ' ' + currentResult
//               );
//             }),
//           Promise.resolve(prefix)
//         )
//       )
//     );
//   }
// }

// An Impossibility!!!
// export class DummyMiddlewareEngine110 extends MiddlewareEngine<
//   DummyProtocolAsync,
//   DummyMiddlewareSync
// > {
//   name = 'DummyMiddlewareEngine110';
//   engine(
//     protocol: DummyProtocolAsync,
//     middlewares: DummyMiddlewareSync[]
//   ): void {
//     protocol.setContext(
//       new DummyProtocolContextAsync((prefix: string) =>
//         middlewares.reduce((acc, current) => acc + ' ' + current(), prefix)
//       )
//     );
//   }
// }

// 111
export class DummyMiddlewareEngineAsync extends MiddlewareEngine<
  DummyProtocolAsync,
  DummyMiddlewareAsync
> {
  name = 'DummyMiddlewareEngineAsync';
  engine(
    protocol: DummyProtocolAsync,
    middlewares: DummyMiddlewareAsync[]
  ): void {
    protocol.setContext(
      new DummyProtocolContextAsync(async (prefix: string) =>
        middlewares.reduce(
          (promiseChain, current) =>
            promiseChain.then((chainResult) =>
              current().then(
                (currentResult) => chainResult + ' ' + currentResult
              )
            ),
          Promise.resolve(prefix)
        )
      )
    );
  }
}

export class DummyMiddlewareEngine112 extends MiddlewareEngine<
  DummyProtocolAsync,
  DummyMiddlewareSyncOrAsync
> {
  name = 'DummyMiddlewareEngine112';
  engine(
    protocol: DummyProtocolAsync,
    middlewares: DummyMiddlewareSyncOrAsync[]
  ): void {
    protocol.setContext(
      new DummyProtocolContextAsync(async (prefix: string) =>
        middlewares.reduce(
          (promiseChain, current) =>
            promiseChain.then((chainResult) => {
              let exec = current();
              exec = exec instanceof Promise ? exec : Promise.resolve(exec);
              return exec.then(
                (currentResult) => chainResult + ' ' + currentResult
              );
            }),
          Promise.resolve(prefix)
        )
      )
    );
  }
}

// An Impossibility!!!
// export class DummyMiddlewareEngine120 extends MiddlewareEngine<
//   DummyProtocol12,
//   DummyMiddlewareSync
// > {
//   name = 'DummyMiddlewareEngine120';
//   engine(protocol: DummyProtocol12, middlewares: DummyMiddlewareSync[]): void {
//     protocol.setContext(
//       new DummyProtocolContextAsync((prefix: string) =>
//         middlewares.reduce((acc, current) => acc + ' ' + current(), prefix)
//       )
//     );
//   }
// }

export class DummyMiddlewareEngine121 extends MiddlewareEngine<
  DummyProtocol12,
  DummyMiddlewareAsync
> {
  name = 'DummyMiddlewareEngine121';
  engine(protocol: DummyProtocol12, middlewares: DummyMiddlewareAsync[]): void {
    protocol.setContext(
      new DummyProtocolContextAsync(async (prefix: string) =>
        middlewares.reduce(
          (promiseChain, current) =>
            promiseChain.then((chainResult) =>
              current().then(
                (currentResult) => chainResult + ' ' + currentResult
              )
            ),
          Promise.resolve(prefix)
        )
      )
    );
  }
}

export class DummyMiddlewareEngine122 extends MiddlewareEngine<
  DummyProtocol12,
  DummyMiddlewareSyncOrAsync
> {
  name = 'DummyMiddlewareEngine122';
  engine(
    protocol: DummyProtocol12,
    middlewares: DummyMiddlewareSyncOrAsync[]
  ): void {
    protocol.setContext(
      new DummyProtocolContextAsync(async (prefix: string) =>
        middlewares.reduce(
          (promiseChain, current) =>
            promiseChain.then((chainResult) => {
              let exec = current();
              exec = exec instanceof Promise ? exec : Promise.resolve(exec);
              return exec.then(
                (currentResult) => chainResult + ' ' + currentResult
              );
            }),
          Promise.resolve(prefix)
        )
      )
    );
  }
}

export class DummyMiddlewareEngine210 extends MiddlewareEngine<
  DummyProtocol21,
  DummyMiddlewareSync
> {
  name = 'DummyMiddlewareEngine210';
  engine(protocol: DummyProtocol21, middlewares: DummyMiddlewareSync[]): void {
    protocol.setContext(
      new DummyProtocolContextSyncOrAsync((prefix: string) =>
        middlewares.reduce((acc, current) => acc + ' ' + current(), prefix)
      )
    );
  }
}

export class DummyMiddlewareEngine211 extends MiddlewareEngine<
  DummyProtocol21,
  DummyMiddlewareAsync
> {
  name = 'DummyMiddlewareEngine211';
  engine(protocol: DummyProtocol21, middlewares: DummyMiddlewareAsync[]): void {
    protocol.setContext(
      new DummyProtocolContextSyncOrAsync(async (prefix: string) =>
        middlewares.reduce(
          (promiseChain, current) =>
            promiseChain.then((chainResult) =>
              current().then(
                (currentResult) => chainResult + ' ' + currentResult
              )
            ),
          Promise.resolve(prefix)
        )
      )
    );
  }
}

export class DummyMiddlewareEngine212 extends MiddlewareEngine<
  DummyProtocol21,
  DummyMiddlewareSyncOrAsync
> {
  name = 'DummyMiddlewareEngine212';
  engine(
    protocol: DummyProtocol21,
    middlewares: DummyMiddlewareSyncOrAsync[]
  ): void {
    protocol.setContext(
      new DummyProtocolContextSyncOrAsync(async (prefix: string) =>
        middlewares.reduce(
          (promiseChain, current) =>
            promiseChain.then((chainResult) => {
              let exec = current();
              exec = exec instanceof Promise ? exec : Promise.resolve(exec);
              return exec.then(
                (currentResult) => chainResult + ' ' + currentResult
              );
            }),
          Promise.resolve(prefix)
        )
      )
    );
  }
}

export class DummyMiddlewareEngine220 extends MiddlewareEngine<
  DummyProtocolSyncOrAsync,
  DummyMiddlewareSync
> {
  name = 'DummyMiddlewareEngine220';
  engine(
    protocol: DummyProtocolSyncOrAsync,
    middlewares: DummyMiddlewareSync[]
  ): void {
    protocol.setContext(
      new DummyProtocolContextSyncOrAsync((prefix: string) =>
        middlewares.reduce((acc, current) => acc + ' ' + current(), prefix)
      )
    );
  }
}

export class DummyMiddlewareEngine221 extends MiddlewareEngine<
  DummyProtocolSyncOrAsync,
  DummyMiddlewareAsync
> {
  name = 'DummyMiddlewareEngine221';
  engine(
    protocol: DummyProtocolSyncOrAsync,
    middlewares: DummyMiddlewareAsync[]
  ): void {
    protocol.setContext(
      new DummyProtocolContextSyncOrAsync(async (prefix: string) =>
        middlewares.reduce(
          (promiseChain, current) =>
            promiseChain.then((chainResult) =>
              current().then(
                (currentResult) => chainResult + ' ' + currentResult
              )
            ),
          Promise.resolve(prefix)
        )
      )
    );
  }
}

// 222
export class DummyMiddlewareEngineSyncOrAsync extends MiddlewareEngine<
  DummyProtocolSyncOrAsync,
  DummyMiddlewareSyncOrAsync
> {
  name = 'DummyMiddlewareEngineSyncOrAsync';
  engine(
    protocol: DummyProtocolSyncOrAsync,
    middlewares: DummyMiddlewareSyncOrAsync[]
  ): void {
    protocol.setContext(
      new DummyProtocolContextSyncOrAsync(async (prefix: string) =>
        middlewares.reduce(
          (promiseChain, current) =>
            promiseChain.then((chainResult) => {
              let exec = current();
              exec = exec instanceof Promise ? exec : Promise.resolve(exec);
              return exec.then(
                (currentResult) => chainResult + ' ' + currentResult
              );
            }),
          Promise.resolve(prefix)
        )
      )
    );
  }
}

// Faulty Middleware Engines

// 000
export class FaultyMiddlewareEngineSync extends MiddlewareEngine<
  DummyProtocolSync,
  DummyMiddlewareSync
> {
  name = 'FaultyMiddlewareEngineSync';
  engine(
    protocol: DummyProtocolSync,
    middlewares: DummyMiddlewareSync[]
  ): void {
    [].length = -1; // RangeError
    protocol.setContext(
      new DummyProtocolContextSync((prefix: string) =>
        middlewares.reduce((acc, current) => acc + ' ' + current(), prefix)
      )
    );
  }
}

export class FaultyMiddlewareEngine010 extends MiddlewareEngine<
  DummyProtocol01,
  DummyMiddlewareSync
> {
  name = 'FaultyMiddlewareEngine010';
  engine(protocol: DummyProtocol01, middlewares: DummyMiddlewareSync[]): void {
    [].length = -1; // RangeError
    protocol.setContext(
      new DummyProtocolContextSync((prefix: string) =>
        middlewares.reduce((acc, current) => acc + ' ' + current(), prefix)
      )
    );
  }
}

export class FaultyMiddlewareEngine020 extends MiddlewareEngine<
  DummyProtocol02,
  DummyMiddlewareSync
> {
  name = 'FaultyMiddlewareEngine020';
  engine(protocol: DummyProtocol02, middlewares: DummyMiddlewareSync[]): void {
    [].length = -1; // RangeError
    protocol.setContext(
      new DummyProtocolContextSync((prefix: string) =>
        middlewares.reduce((acc, current) => acc + ' ' + current(), prefix)
      )
    );
  }
}

export class FaultyMiddlewareEngineAsync extends MiddlewareEngine<
  DummyProtocolAsync,
  DummyMiddlewareAsync
> {
  name = 'FaultyMiddlewareEngineAsync';
  engine(
    protocol: DummyProtocolAsync,
    middlewares: DummyMiddlewareAsync[]
  ): void {
    [].length = -1; // RangeError
    protocol.setContext(
      new DummyProtocolContextAsync(async (prefix: string) =>
        middlewares.reduce(
          (promiseChain, current) =>
            promiseChain.then((chainResult) =>
              current().then(
                (currentResult) => chainResult + ' ' + currentResult
              )
            ),
          Promise.resolve(prefix)
        )
      )
    );
  }
}

export class FaultyMiddlewareEngine112 extends MiddlewareEngine<
  DummyProtocolAsync,
  DummyMiddlewareSyncOrAsync
> {
  name = 'FaultyMiddlewareEngine112';
  engine(
    protocol: DummyProtocolAsync,
    middlewares: DummyMiddlewareSyncOrAsync[]
  ): void {
    [].length = -1; // RangeError
    protocol.setContext(
      new DummyProtocolContextAsync(async (prefix: string) =>
        middlewares.reduce(
          (promiseChain, current) =>
            promiseChain.then((chainResult) => {
              let exec = current();
              exec = exec instanceof Promise ? exec : Promise.resolve(exec);
              return exec.then(
                (currentResult) => chainResult + ' ' + currentResult
              );
            }),
          Promise.resolve(prefix)
        )
      )
    );
  }
}

export class FaultyMiddlewareEngine121 extends MiddlewareEngine<
  DummyProtocol12,
  DummyMiddlewareAsync
> {
  name = 'FaultyMiddlewareEngine121';
  engine(protocol: DummyProtocol12, middlewares: DummyMiddlewareAsync[]): void {
    [].length = -1; // RangeError
    protocol.setContext(
      new DummyProtocolContextAsync(async (prefix: string) =>
        middlewares.reduce(
          (promiseChain, current) =>
            promiseChain.then((chainResult) =>
              current().then(
                (currentResult) => chainResult + ' ' + currentResult
              )
            ),
          Promise.resolve(prefix)
        )
      )
    );
  }
}

export class FaultyMiddlewareEngine122 extends MiddlewareEngine<
  DummyProtocol12,
  DummyMiddlewareSyncOrAsync
> {
  name = 'FaultyMiddlewareEngine122';
  engine(
    protocol: DummyProtocol12,
    middlewares: DummyMiddlewareSyncOrAsync[]
  ): void {
    [].length = -1; // RangeError
    protocol.setContext(
      new DummyProtocolContextAsync(async (prefix: string) =>
        middlewares.reduce(
          (promiseChain, current) =>
            promiseChain.then((chainResult) => {
              let exec = current();
              exec = exec instanceof Promise ? exec : Promise.resolve(exec);
              return exec.then(
                (currentResult) => chainResult + ' ' + currentResult
              );
            }),
          Promise.resolve(prefix)
        )
      )
    );
  }
}

export class FaultyMiddlewareEngine210 extends MiddlewareEngine<
  DummyProtocol21,
  DummyMiddlewareSync
> {
  name = 'FaultyMiddlewareEngine210';
  engine(protocol: DummyProtocol21, middlewares: DummyMiddlewareSync[]): void {
    [].length = -1; // RangeError
    protocol.setContext(
      new DummyProtocolContextSyncOrAsync((prefix: string) =>
        middlewares.reduce((acc, current) => acc + ' ' + current(), prefix)
      )
    );
  }
}

export class FaultyMiddlewareEngine211 extends MiddlewareEngine<
  DummyProtocol21,
  DummyMiddlewareAsync
> {
  name = 'FaultyMiddlewareEngine211';
  engine(protocol: DummyProtocol21, middlewares: DummyMiddlewareAsync[]): void {
    [].length = -1; // RangeError
    protocol.setContext(
      new DummyProtocolContextSyncOrAsync(async (prefix: string) =>
        middlewares.reduce(
          (promiseChain, current) =>
            promiseChain.then((chainResult) =>
              current().then(
                (currentResult) => chainResult + ' ' + currentResult
              )
            ),
          Promise.resolve(prefix)
        )
      )
    );
  }
}

export class FaultyMiddlewareEngine212 extends MiddlewareEngine<
  DummyProtocol21,
  DummyMiddlewareSyncOrAsync
> {
  name = 'FaultyMiddlewareEngine212';
  engine(
    protocol: DummyProtocol21,
    middlewares: DummyMiddlewareSyncOrAsync[]
  ): void {
    [].length = -1; // RangeError
    protocol.setContext(
      new DummyProtocolContextSyncOrAsync(async (prefix: string) =>
        middlewares.reduce(
          (promiseChain, current) =>
            promiseChain.then((chainResult) => {
              let exec = current();
              exec = exec instanceof Promise ? exec : Promise.resolve(exec);
              return exec.then(
                (currentResult) => chainResult + ' ' + currentResult
              );
            }),
          Promise.resolve(prefix)
        )
      )
    );
  }
}

export class FaultyMiddlewareEngine220 extends MiddlewareEngine<
  DummyProtocolSyncOrAsync,
  DummyMiddlewareSync
> {
  name = 'FaultyMiddlewareEngine220';
  engine(
    protocol: DummyProtocolSyncOrAsync,
    middlewares: DummyMiddlewareSync[]
  ): void {
    [].length = -1; // RangeError
    protocol.setContext(
      new DummyProtocolContextSyncOrAsync((prefix: string) =>
        middlewares.reduce((acc, current) => acc + ' ' + current(), prefix)
      )
    );
  }
}

export class FaultyMiddlewareEngine221 extends MiddlewareEngine<
  DummyProtocolSyncOrAsync,
  DummyMiddlewareAsync
> {
  name = 'FaultyMiddlewareEngine221';
  engine(
    protocol: DummyProtocolSyncOrAsync,
    middlewares: DummyMiddlewareAsync[]
  ): void {
    [].length = -1; // RangeError
    protocol.setContext(
      new DummyProtocolContextSyncOrAsync(async (prefix: string) =>
        middlewares.reduce(
          (promiseChain, current) =>
            promiseChain.then((chainResult) =>
              current().then(
                (currentResult) => chainResult + ' ' + currentResult
              )
            ),
          Promise.resolve(prefix)
        )
      )
    );
  }
}

// 222
export class FaultyMiddlewareEngineSyncOrAsync extends MiddlewareEngine<
  DummyProtocolSyncOrAsync,
  DummyMiddlewareSyncOrAsync
> {
  name = 'FaultyMiddlewareEngineSyncOrAsync';
  engine(
    protocol: DummyProtocolSyncOrAsync,
    middlewares: DummyMiddlewareSyncOrAsync[]
  ): void {
    [].length = -1; // RangeError
    protocol.setContext(
      new DummyProtocolContextSyncOrAsync(async (prefix: string) =>
        middlewares.reduce(
          (promiseChain, current) =>
            promiseChain.then((chainResult) => {
              let exec = current();
              exec = exec instanceof Promise ? exec : Promise.resolve(exec);
              return exec.then(
                (currentResult) => chainResult + ' ' + currentResult
              );
            }),
          Promise.resolve(prefix)
        )
      )
    );
  }
}
