import { Serverlessly } from '@serverlessly/core';
import {
  ServerlesslySync,
  Serverlessly010,
  Serverlessly020,
  ServerlesslyAsync,
  Serverlessly112,
  Serverlessly121,
  Serverlessly122,
  Serverlessly210,
  Serverlessly211,
  Serverlessly212,
  Serverlessly220,
  Serverlessly221,
  ServerlesslySyncOrAsync,
} from './dummies/serverlessly';
import {
  DummyProtocolSync,
  DummyProtocol01,
  DummyProtocol02,
  DummyProtocolAsync,
  DummyProtocol12,
  DummyProtocol21,
  DummyProtocolSyncOrAsync,
} from './dummies/protocols';
import {
  DummyMiddlewareEngineSync,
  DummyMiddlewareEngine010,
  DummyMiddlewareEngine020,
  DummyMiddlewareEngineAsync,
  DummyMiddlewareEngine112,
  DummyMiddlewareEngine121,
  DummyMiddlewareEngine122,
  DummyMiddlewareEngine210,
  DummyMiddlewareEngine211,
  DummyMiddlewareEngine212,
  DummyMiddlewareEngine220,
  DummyMiddlewareEngine221,
  DummyMiddlewareEngineSyncOrAsync,
} from './dummies/middleware-engines';
import {
  DummyPlatformAdapterSync,
  DummyPlatformAdapter001,
  DummyPlatformAdapter002,
  DummyPlatformAdapter011,
  DummyPlatformAdapter012,
  DummyPlatformAdapter021,
  DummyPlatformAdapter022,
  DummyPlatformAdapterAsync,
  DummyPlatformAdapter112,
  DummyPlatformAdapter121,
  DummyPlatformAdapter122,
  DummyPlatformAdapter211,
  DummyPlatformAdapter212,
  DummyPlatformAdapter221,
  DummyPlatformAdapterSyncOrAsync,
} from './dummies/platform-adapters';
import {
  dummyMiddlewaresAsync,
  dummyMiddlewaresSync,
  dummyMiddlewaresSyncOrAsync,
} from './dummies/middlewares';
import {
  DummyPlatformHandlerAsync,
  DummyPlatformHandlerSync,
  DummyPlatformHandlerSyncOrAsync,
} from './dummies/platform-handlers';

describe('ServerlesslySync', () => {
  test('Serverlessly instance has correct type', () => {
    expect<ServerlesslySync>(
      new Serverlessly({
        protocol: new DummyProtocolSync(),
        middlewareEngine: new DummyMiddlewareEngineSync(),
      })
    );
  });

  let serverlessly: ServerlesslySync;
  const dummyMiddleware = dummyMiddlewaresSync[0];

  beforeEach(() => {
    serverlessly = new Serverlessly({
      protocol: new DummyProtocolSync(),
      middlewareEngine: new DummyMiddlewareEngineSync(),
    });
  });

  test('pipe() returns correct type.', () => {
    expect<ServerlesslySync>(serverlessly.pipe(dummyMiddleware));
  });

  test('getHandler() with every Platform Adapter returns correct type', () => {
    /**
     * Following Platform Adapters are incompatible with protocol:
     * DummyPlatformAdapter011
     * DummyPlatformAdapter012
     * DummyPlatformAdapterAsync
     * DummyPlatformAdapter112
     * DummyPlatformAdapter121
     * DummyPlatformAdapter122
     * DummyPlatformAdapter211
     * DummyPlatformAdapter212
     */

    expect<DummyPlatformHandlerSync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapterSync() })
    );
    expect<DummyPlatformHandlerAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: new DummyPlatformAdapter001(),
      })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapter002() })
    );
    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapter021() })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: new DummyPlatformAdapter022(),
      })
    );
    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapter221() })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: new DummyPlatformAdapterSyncOrAsync(),
      })
    );
  });
});

describe('Serverlessly010', () => {
  test('Serverlessly instance has correct type', () => {
    expect<Serverlessly010>(
      new Serverlessly({
        protocol: new DummyProtocol01(),
        middlewareEngine: new DummyMiddlewareEngine010(),
      })
    );
  });

  let serverlessly: Serverlessly010;
  const dummyMiddleware = dummyMiddlewaresSync[0];

  beforeEach(() => {
    serverlessly = new Serverlessly({
      protocol: new DummyProtocol01(),
      middlewareEngine: new DummyMiddlewareEngine010(),
    });
  });

  test('pipe() returns correct type.', () => {
    expect<Serverlessly010>(serverlessly.pipe(dummyMiddleware));
  });

  test('getHandler() with every Platform Adapter returns correct type', () => {
    /**
     * Following Platform Adapters are incompatible with protocol:
     * DummyPlatformAdapterSync
     * DummyPlatformAdapter001
     * DummyPlatformAdapter002
     * DummyPlatformAdapterAsync
     * DummyPlatformAdapter112
     * DummyPlatformAdapter121
     * DummyPlatformAdapter122
     */

    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapter011() })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: new DummyPlatformAdapter012(),
      })
    );
    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapter021() })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: new DummyPlatformAdapter022(),
      })
    );
    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapter211() })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: new DummyPlatformAdapter212(),
      })
    );
    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapter221() })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: new DummyPlatformAdapterSyncOrAsync(),
      })
    );
  });
});

describe('Serverlessly020', () => {
  test('Serverlessly instance has correct type', () => {
    expect<Serverlessly020>(
      new Serverlessly({
        protocol: new DummyProtocol02(),
        middlewareEngine: new DummyMiddlewareEngine020(),
      })
    );
  });

  let serverlessly: Serverlessly020;
  const dummyMiddleware = dummyMiddlewaresSync[0];

  beforeEach(() => {
    serverlessly = new Serverlessly({
      protocol: new DummyProtocol02(),
      middlewareEngine: new DummyMiddlewareEngine020(),
    });
  });

  test('pipe() returns correct type.', () => {
    expect<Serverlessly020>(serverlessly.pipe(dummyMiddleware));
  });

  test('getHandler() with every Platform Adapter returns correct type', () => {
    /**
     * Following Platform Adapters are incompatible with protocol:
     * DummyPlatformAdapterAsync
     * DummyPlatformAdapter112
     * DummyPlatformAdapter121
     * DummyPlatformAdapter122
     * DummyPlatformAdapter211
     * DummyPlatformAdapter212
     */

    expect<DummyPlatformHandlerSync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapterSync() })
    );
    expect<DummyPlatformHandlerAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: new DummyPlatformAdapter001(),
      })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapter002() })
    );
    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapter011() })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: new DummyPlatformAdapter012(),
      })
    );
    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapter021() })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: new DummyPlatformAdapter022(),
      })
    );
    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapter221() })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: new DummyPlatformAdapterSyncOrAsync(),
      })
    );
  });
});

describe('ServerlesslyAsync', () => {
  test('Serverlessly instance has correct type', () => {
    expect<ServerlesslyAsync>(
      new Serverlessly({
        protocol: new DummyProtocolAsync(),
        middlewareEngine: new DummyMiddlewareEngineAsync(),
      })
    );
  });

  let serverlessly: ServerlesslyAsync;
  const dummyMiddleware = dummyMiddlewaresAsync[0];

  beforeEach(() => {
    serverlessly = new Serverlessly({
      protocol: new DummyProtocolAsync(),
      middlewareEngine: new DummyMiddlewareEngineAsync(),
    });
  });

  test('pipe() returns correct type.', () => {
    expect<ServerlesslyAsync>(serverlessly.pipe(dummyMiddleware));
  });

  test('getHandler() with every Platform Adapter returns correct type', () => {
    /**
     * Following Platform Adapters are incompatible with protocol:
     * DummyPlatformAdapterSync
     * DummyPlatformAdapter001
     * DummyPlatformAdapter002
     * DummyPlatformAdapter011
     * DummyPlatformAdapter012
     * DummyPlatformAdapter021
     * DummyPlatformAdapter022
     */

    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapterAsync() })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: new DummyPlatformAdapter112(),
      })
    );
    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapter121() })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: new DummyPlatformAdapter122(),
      })
    );
    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapter211() })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: new DummyPlatformAdapter212(),
      })
    );
    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapter221() })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: new DummyPlatformAdapterSyncOrAsync(),
      })
    );
  });
});

describe('Serverlessly112', () => {
  test('Serverlessly instance has correct type', () => {
    expect<Serverlessly112>(
      new Serverlessly({
        protocol: new DummyProtocolAsync(),
        middlewareEngine: new DummyMiddlewareEngine112(),
      })
    );
  });

  let serverlessly: Serverlessly112;
  const dummyMiddleware = dummyMiddlewaresSyncOrAsync[0];

  beforeEach(() => {
    serverlessly = new Serverlessly({
      protocol: new DummyProtocolAsync(),
      middlewareEngine: new DummyMiddlewareEngine112(),
    });
  });

  test('pipe() returns correct type.', () => {
    expect<Serverlessly112>(serverlessly.pipe(dummyMiddleware));
  });

  test('getHandler() with every Platform Adapter returns correct type', () => {
    /**
     * Following Platform Adapters are incompatible with protocol:
     * DummyPlatformAdapterSync
     * DummyPlatformAdapter001
     * DummyPlatformAdapter002
     * DummyPlatformAdapter011
     * DummyPlatformAdapter012
     * DummyPlatformAdapter021
     * DummyPlatformAdapter022
     */

    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapterAsync() })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: new DummyPlatformAdapter112(),
      })
    );
    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapter121() })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: new DummyPlatformAdapter122(),
      })
    );
    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapter211() })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: new DummyPlatformAdapter212(),
      })
    );
    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapter221() })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: new DummyPlatformAdapterSyncOrAsync(),
      })
    );
  });
});

describe('Serverlessly121', () => {
  test('Serverlessly instance has correct type', () => {
    expect<Serverlessly121>(
      new Serverlessly({
        protocol: new DummyProtocol12(),
        middlewareEngine: new DummyMiddlewareEngine121(),
      })
    );
  });

  let serverlessly: Serverlessly121;
  const dummyMiddleware = dummyMiddlewaresAsync[0];

  beforeEach(() => {
    serverlessly = new Serverlessly({
      protocol: new DummyProtocol12(),
      middlewareEngine: new DummyMiddlewareEngine121(),
    });
  });

  test('pipe() returns correct type.', () => {
    expect<Serverlessly121>(serverlessly.pipe(dummyMiddleware));
  });

  test('getHandler() with every Platform Adapter returns correct type', () => {
    /**
     * Following Platform Adapters are incompatible with protocol:
     * DummyPlatformAdapterSync
     * DummyPlatformAdapter001
     * DummyPlatformAdapter002
     * DummyPlatformAdapter011
     * DummyPlatformAdapter012
     * DummyPlatformAdapter021
     * DummyPlatformAdapter022
     * DummyPlatformAdapter211
     * DummyPlatformAdapter212
     */

    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapterAsync() })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: new DummyPlatformAdapter112(),
      })
    );
    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapter121() })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: new DummyPlatformAdapter122(),
      })
    );
    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapter221() })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: new DummyPlatformAdapterSyncOrAsync(),
      })
    );
  });
});

describe('Serverlessly122', () => {
  test('Serverlessly instance has correct type', () => {
    expect<Serverlessly122>(
      new Serverlessly({
        protocol: new DummyProtocol12(),
        middlewareEngine: new DummyMiddlewareEngine122(),
      })
    );
  });

  let serverlessly: Serverlessly122;
  const dummyMiddleware = dummyMiddlewaresSyncOrAsync[0];

  beforeEach(() => {
    serverlessly = new Serverlessly({
      protocol: new DummyProtocol12(),
      middlewareEngine: new DummyMiddlewareEngine122(),
    });
  });

  test('pipe() returns correct type.', () => {
    expect<Serverlessly122>(serverlessly.pipe(dummyMiddleware));
  });

  test('getHandler() with every Platform Adapter returns correct type', () => {
    /**
     * Following Platform Adapters are incompatible with protocol:
     * DummyPlatformAdapterSync
     * DummyPlatformAdapter001
     * DummyPlatformAdapter002
     * DummyPlatformAdapter011
     * DummyPlatformAdapter012
     * DummyPlatformAdapter021
     * DummyPlatformAdapter022
     * DummyPlatformAdapter211
     * DummyPlatformAdapter212
     */

    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapterAsync() })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: new DummyPlatformAdapter112(),
      })
    );
    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapter121() })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: new DummyPlatformAdapter122(),
      })
    );
    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapter221() })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: new DummyPlatformAdapterSyncOrAsync(),
      })
    );
  });
});

describe('Serverlessly210', () => {
  test('Serverlessly instance has correct type', () => {
    expect<Serverlessly210>(
      new Serverlessly({
        protocol: new DummyProtocol21(),
        middlewareEngine: new DummyMiddlewareEngine210(),
      })
    );
  });

  let serverlessly: Serverlessly210;
  const dummyMiddleware = dummyMiddlewaresSync[0];

  beforeEach(() => {
    serverlessly = new Serverlessly({
      protocol: new DummyProtocol21(),
      middlewareEngine: new DummyMiddlewareEngine210(),
    });
  });

  test('pipe() returns correct type.', () => {
    expect<Serverlessly210>(serverlessly.pipe(dummyMiddleware));
  });

  test('getHandler() with every Platform Adapter returns correct type', () => {
    /**
     * Following Platform Adapters are incompatible with protocol:
     * DummyPlatformAdapterSync
     * DummyPlatformAdapter001
     * DummyPlatformAdapter002
     * DummyPlatformAdapter021
     * DummyPlatformAdapter022
     * DummyPlatformAdapter121
     * DummyPlatformAdapter122
     */

    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapter011() })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: new DummyPlatformAdapter012(),
      })
    );
    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapterAsync() })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: new DummyPlatformAdapter112(),
      })
    );
    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapter211() })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: new DummyPlatformAdapter212(),
      })
    );
    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapter221() })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: new DummyPlatformAdapterSyncOrAsync(),
      })
    );
  });
});

describe('Serverlessly211', () => {
  test('Serverlessly instance has correct type', () => {
    expect<Serverlessly211>(
      new Serverlessly({
        protocol: new DummyProtocol21(),
        middlewareEngine: new DummyMiddlewareEngine211(),
      })
    );
  });

  let serverlessly: Serverlessly211;
  const dummyMiddleware = dummyMiddlewaresAsync[0];

  beforeEach(() => {
    serverlessly = new Serverlessly({
      protocol: new DummyProtocol21(),
      middlewareEngine: new DummyMiddlewareEngine211(),
    });
  });

  test('pipe() returns correct type.', () => {
    expect<Serverlessly211>(serverlessly.pipe(dummyMiddleware));
  });

  test('getHandler() with every Platform Adapter returns correct type', () => {
    /**
     * Following Platform Adapters are incompatible with protocol:
     * DummyPlatformAdapterSync
     * DummyPlatformAdapter001
     * DummyPlatformAdapter002
     * DummyPlatformAdapter021
     * DummyPlatformAdapter022
     * DummyPlatformAdapter121
     * DummyPlatformAdapter122
     */

    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapter011() })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: new DummyPlatformAdapter012(),
      })
    );
    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapterAsync() })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: new DummyPlatformAdapter112(),
      })
    );
    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapter211() })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: new DummyPlatformAdapter212(),
      })
    );
    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapter221() })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: new DummyPlatformAdapterSyncOrAsync(),
      })
    );
  });
});

describe('Serverlessly212', () => {
  test('Serverlessly instance has correct type', () => {
    expect<Serverlessly212>(
      new Serverlessly({
        protocol: new DummyProtocol21(),
        middlewareEngine: new DummyMiddlewareEngine212(),
      })
    );
  });

  let serverlessly: Serverlessly212;
  const dummyMiddleware = dummyMiddlewaresSyncOrAsync[0];

  beforeEach(() => {
    serverlessly = new Serverlessly({
      protocol: new DummyProtocol21(),
      middlewareEngine: new DummyMiddlewareEngine212(),
    });
  });

  test('pipe() returns correct type.', () => {
    expect<Serverlessly212>(serverlessly.pipe(dummyMiddleware));
  });

  test('getHandler() with every Platform Adapter returns correct type', () => {
    /**
     * Following Platform Adapters are incompatible with protocol:
     * DummyPlatformAdapterSync
     * DummyPlatformAdapter001
     * DummyPlatformAdapter002
     * DummyPlatformAdapter021
     * DummyPlatformAdapter022
     * DummyPlatformAdapter121
     * DummyPlatformAdapter122
     */

    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapter011() })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: new DummyPlatformAdapter012(),
      })
    );
    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapterAsync() })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: new DummyPlatformAdapter112(),
      })
    );
    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapter211() })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: new DummyPlatformAdapter212(),
      })
    );
    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapter221() })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: new DummyPlatformAdapterSyncOrAsync(),
      })
    );
  });
});

describe('Serverlessly220', () => {
  test('Serverlessly instance has correct type', () => {
    expect<Serverlessly220>(
      new Serverlessly({
        protocol: new DummyProtocolSyncOrAsync(),
        middlewareEngine: new DummyMiddlewareEngine220(),
      })
    );
  });

  let serverlessly: Serverlessly220;
  const dummyMiddleware = dummyMiddlewaresSync[0];

  beforeEach(() => {
    serverlessly = new Serverlessly({
      protocol: new DummyProtocolSyncOrAsync(),
      middlewareEngine: new DummyMiddlewareEngine220(),
    });
  });

  test('pipe() returns correct type.', () => {
    expect<Serverlessly220>(serverlessly.pipe(dummyMiddleware));
  });

  test('getHandler() with every Platform Adapter returns correct type', () => {
    expect<DummyPlatformHandlerSync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapterSync() })
    );
    expect<DummyPlatformHandlerAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: new DummyPlatformAdapter001(),
      })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapter002() })
    );
    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapter011() })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: new DummyPlatformAdapter012(),
      })
    );
    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapter021() })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: new DummyPlatformAdapter022(),
      })
    );
    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapterAsync() })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: new DummyPlatformAdapter112(),
      })
    );
    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapter121() })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: new DummyPlatformAdapter122(),
      })
    );
    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapter211() })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: new DummyPlatformAdapter212(),
      })
    );
    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapter221() })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: new DummyPlatformAdapterSyncOrAsync(),
      })
    );
  });
});

describe('Serverlessly221', () => {
  test('Serverlessly instance has correct type', () => {
    expect<Serverlessly221>(
      new Serverlessly({
        protocol: new DummyProtocolSyncOrAsync(),
        middlewareEngine: new DummyMiddlewareEngine221(),
      })
    );
  });

  let serverlessly: Serverlessly221;
  const dummyMiddleware = dummyMiddlewaresAsync[0];

  beforeEach(() => {
    serverlessly = new Serverlessly({
      protocol: new DummyProtocolSyncOrAsync(),
      middlewareEngine: new DummyMiddlewareEngine221(),
    });
  });

  test('pipe() returns correct type.', () => {
    expect<Serverlessly221>(serverlessly.pipe(dummyMiddleware));
  });

  test('getHandler() with every Platform Adapter returns correct type', () => {
    expect<DummyPlatformHandlerSync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapterSync() })
    );
    expect<DummyPlatformHandlerAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: new DummyPlatformAdapter001(),
      })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapter002() })
    );
    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapter011() })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: new DummyPlatformAdapter012(),
      })
    );
    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapter021() })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: new DummyPlatformAdapter022(),
      })
    );
    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapterAsync() })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: new DummyPlatformAdapter112(),
      })
    );
    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapter121() })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: new DummyPlatformAdapter122(),
      })
    );
    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapter211() })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: new DummyPlatformAdapter212(),
      })
    );
    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapter221() })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: new DummyPlatformAdapterSyncOrAsync(),
      })
    );
  });
});

describe('ServerlesslySyncOrAsync', () => {
  test('Serverlessly instance has correct type', () => {
    expect<ServerlesslySyncOrAsync>(
      new Serverlessly({
        protocol: new DummyProtocolSyncOrAsync(),
        middlewareEngine: new DummyMiddlewareEngineSyncOrAsync(),
      })
    );
  });

  let serverlessly: ServerlesslySyncOrAsync;
  const dummyMiddleware = dummyMiddlewaresSyncOrAsync[0];

  beforeEach(() => {
    serverlessly = new Serverlessly({
      protocol: new DummyProtocolSyncOrAsync(),
      middlewareEngine: new DummyMiddlewareEngineSyncOrAsync(),
    });
  });

  test('pipe() returns correct type.', () => {
    expect<ServerlesslySyncOrAsync>(serverlessly.pipe(dummyMiddleware));
  });

  test('getHandler() with every Platform Adapter returns correct type', () => {
    expect<DummyPlatformHandlerSync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapterSync() })
    );
    expect<DummyPlatformHandlerAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: new DummyPlatformAdapter001(),
      })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapter002() })
    );
    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapter011() })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: new DummyPlatformAdapter012(),
      })
    );
    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapter021() })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: new DummyPlatformAdapter022(),
      })
    );
    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapterAsync() })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: new DummyPlatformAdapter112(),
      })
    );
    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapter121() })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: new DummyPlatformAdapter122(),
      })
    );
    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapter211() })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: new DummyPlatformAdapter212(),
      })
    );
    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: new DummyPlatformAdapter221() })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: new DummyPlatformAdapterSyncOrAsync(),
      })
    );
  });
});
