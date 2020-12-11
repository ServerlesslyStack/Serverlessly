import { Serverlessly } from '@serverlessly/core';
import {
  dummyMiddlewaresAsync,
  dummyMiddlewaresSync,
  dummyMiddlewaresSyncOrAsync,
} from './dummies/middlewares';
import {
  dummyPlatformAdapter01,
  dummyPlatformAdapter02,
  dummyPlatformAdapter12,
  dummyPlatformAdapter21,
  dummyPlatformAdapterAsync,
  dummyPlatformAdapterSync,
  dummyPlatformAdapterSyncOrAsync,
  dummyPlatformAdapterSyncOrAsyncStrict,
} from './dummies/platform-adapters';
import {
  DummyPlatformHandlerAsync,
  DummyPlatformHandlerSyncOrAsync,
} from './dummies/platform-handlers';
import {
  DummyProtocolContextAsync,
  DummyProtocolContextSync,
  DummyProtocolContextSyncOrAsync,
} from './dummies/protocol-contexts';
import {
  DummyProtocolServerAsync,
  DummyProtocolServerSync,
  DummyProtocolServerSyncOrAsync,
} from './dummies/protocol-servers';
import {
  dummyProtocol001,
  dummyProtocol002,
  dummyProtocol101,
  dummyProtocol102,
  dummyProtocol112,
  dummyProtocol121,
  dummyProtocol122,
  dummyProtocol201,
  dummyProtocol202,
  dummyProtocol211,
  dummyProtocol212,
  dummyProtocol221,
  dummyProtocolAsync,
  dummyProtocolSync,
  dummyProtocolSyncOrAsync,
} from './dummies/protocols';
import {
  Serverlessly001,
  Serverlessly002,
  Serverlessly101,
  Serverlessly102,
  Serverlessly112,
  Serverlessly121,
  Serverlessly122,
  Serverlessly201,
  Serverlessly202,
  Serverlessly211,
  Serverlessly212,
  Serverlessly221,
  ServerlesslyAsync,
  ServerlesslySync,
  ServerlesslySyncOrAsync,
} from './dummies/serverlessly';

describe('ServerlesslySync', () => {
  test('Serverlessly instance has correct type', () => {
    expect<ServerlesslySync>(
      new Serverlessly({
        protocol: dummyProtocolSync,
      })
    );
  });

  let serverlessly: ServerlesslySync;
  const dummyMiddleware = dummyMiddlewaresSync[0];

  beforeEach(() => {
    serverlessly = new Serverlessly({
      protocol: dummyProtocolSync,
    });
  });

  test('pipe() returns correct type.', () => {
    expect<ServerlesslySync>(serverlessly.pipe(dummyMiddleware));
  });

  test('getHandler() with every Platform Adapter returns correct type', () => {
    /**
     * Following Platform Adapters are not incompatible with protocol:
     * dummyPlatformAdapterAsync
     * dummyPlatformAdapter12
     */
    expect<DummyProtocolContextSync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: dummyPlatformAdapterSync })
    );
    expect<DummyPlatformHandlerAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: dummyPlatformAdapter01,
      })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: dummyPlatformAdapter02 })
    );
    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: dummyPlatformAdapter21 })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: dummyPlatformAdapterSyncOrAsync,
      })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
      })
    );
  });

  test('getServer() returns correct type', () => {
    expect<DummyProtocolServerSync>(
      serverlessly.pipe(dummyMiddleware).getServer()
    );
  });

  test('getProtocolContext() returns correct type', () => {
    expect<DummyProtocolContextSync>(
      serverlessly.pipe(dummyMiddleware).getProtocolContext()
    );
  });
});

describe('Serverlessly001', () => {
  test('Serverlessly instance has correct type', () => {
    expect<Serverlessly001>(
      new Serverlessly({
        protocol: dummyProtocol001,
      })
    );
  });

  let serverlessly: Serverlessly001;
  const dummyMiddleware = dummyMiddlewaresSync[0];

  beforeEach(() => {
    serverlessly = new Serverlessly({
      protocol: dummyProtocol001,
    });
  });

  test('pipe() returns correct type.', () => {
    expect<Serverlessly001>(serverlessly.pipe(dummyMiddleware));
  });

  test('getHandler() with every Platform Adapter returns correct type', () => {
    /**
     * Following Platform Adapters are not incompatible with protocol:
     * dummyPlatformAdapterAsync
     * dummyPlatformAdapter12
     */
    expect<DummyProtocolContextSync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: dummyPlatformAdapterSync })
    );
    expect<DummyPlatformHandlerAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: dummyPlatformAdapter01,
      })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: dummyPlatformAdapter02 })
    );
    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: dummyPlatformAdapter21 })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: dummyPlatformAdapterSyncOrAsync,
      })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
      })
    );
  });

  test('getServer() returns correct type', () => {
    expect<DummyProtocolServerAsync>(
      serverlessly.pipe(dummyMiddleware).getServer()
    );
  });

  test('getProtocolContext() returns correct type', () => {
    expect<DummyProtocolContextSync>(
      serverlessly.pipe(dummyMiddleware).getProtocolContext()
    );
  });
});

describe('Serverlessly002', () => {
  test('Serverlessly instance has correct type', () => {
    expect<Serverlessly002>(
      new Serverlessly({
        protocol: dummyProtocol002,
      })
    );
  });

  let serverlessly: Serverlessly002;
  const dummyMiddleware = dummyMiddlewaresSync[0];

  beforeEach(() => {
    serverlessly = new Serverlessly({
      protocol: dummyProtocol002,
    });
  });

  test('pipe() returns correct type.', () => {
    expect<Serverlessly002>(serverlessly.pipe(dummyMiddleware));
  });

  test('getHandler() with every Platform Adapter returns correct type', () => {
    /**
     * Following Platform Adapters are not incompatible with protocol:
     * dummyPlatformAdapterAsync
     * dummyPlatformAdapter12
     */
    expect<DummyProtocolContextSync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: dummyPlatformAdapterSync })
    );
    expect<DummyPlatformHandlerAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: dummyPlatformAdapter01,
      })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: dummyPlatformAdapter02 })
    );
    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: dummyPlatformAdapter21 })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: dummyPlatformAdapterSyncOrAsync,
      })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
      })
    );
  });

  test('getServer() returns correct type', () => {
    expect<DummyProtocolServerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getServer()
    );
  });

  test('getProtocolContext() returns correct type', () => {
    expect<DummyProtocolContextSync>(
      serverlessly.pipe(dummyMiddleware).getProtocolContext()
    );
  });
});

describe('Serverlessly101', () => {
  test('Serverlessly instance has correct type', () => {
    expect<Serverlessly101>(
      new Serverlessly({
        protocol: dummyProtocol101,
      })
    );
  });

  let serverlessly: Serverlessly101;
  const dummyMiddleware = dummyMiddlewaresSync[0];

  beforeEach(() => {
    serverlessly = new Serverlessly({
      protocol: dummyProtocol101,
    });
  });

  test('pipe() returns correct type.', () => {
    expect<Serverlessly101>(serverlessly.pipe(dummyMiddleware));
  });

  test('getHandler() with every Platform Adapter returns correct type', () => {
    /**
     * Following Platform Adapters are not incompatible with protocol:
     * dummyPlatformAdapterSync
     * dummyPlatformAdapter01
     * dummyPlatformAdapter02
     */
    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: dummyPlatformAdapterAsync })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: dummyPlatformAdapter12 })
    );
    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: dummyPlatformAdapter21 })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: dummyPlatformAdapterSyncOrAsync,
      })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
      })
    );
  });

  test('getServer() returns correct type', () => {
    expect<DummyProtocolServerAsync>(
      serverlessly.pipe(dummyMiddleware).getServer()
    );
  });

  test('getProtocolContext() returns correct type', () => {
    expect<DummyProtocolContextAsync>(
      serverlessly.pipe(dummyMiddleware).getProtocolContext()
    );
  });
});

describe('Serverlessly102', () => {
  test('Serverlessly instance has correct type', () => {
    expect<Serverlessly102>(
      new Serverlessly({
        protocol: dummyProtocol102,
      })
    );
  });

  let serverlessly: Serverlessly102;
  const dummyMiddleware = dummyMiddlewaresSync[0];

  beforeEach(() => {
    serverlessly = new Serverlessly({
      protocol: dummyProtocol102,
    });
  });

  test('pipe() returns correct type.', () => {
    expect<Serverlessly102>(serverlessly.pipe(dummyMiddleware));
  });

  test('getHandler() with every Platform Adapter returns correct type', () => {
    /**
     * Following Platform Adapters are not incompatible with protocol:
     * dummyPlatformAdapterSync
     * dummyPlatformAdapter01
     * dummyPlatformAdapter02
     */
    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: dummyPlatformAdapterAsync })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: dummyPlatformAdapter12 })
    );
    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: dummyPlatformAdapter21 })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: dummyPlatformAdapterSyncOrAsync,
      })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
      })
    );
  });

  test('getServer() returns correct type', () => {
    expect<DummyProtocolServerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getServer()
    );
  });

  test('getProtocolContext() returns correct type', () => {
    expect<DummyProtocolContextAsync>(
      serverlessly.pipe(dummyMiddleware).getProtocolContext()
    );
  });
});

describe('ServerlesslyAsync', () => {
  test('Serverlessly instance has correct type', () => {
    expect<ServerlesslyAsync>(
      new Serverlessly({
        protocol: dummyProtocolAsync,
      })
    );
  });

  let serverlessly: ServerlesslyAsync;
  const dummyMiddleware = dummyMiddlewaresAsync[0];

  beforeEach(() => {
    serverlessly = new Serverlessly({
      protocol: dummyProtocolAsync,
    });
  });

  test('pipe() returns correct type.', () => {
    expect<ServerlesslyAsync>(serverlessly.pipe(dummyMiddleware));
  });

  test('getHandler() with every Platform Adapter returns correct type', () => {
    /**
     * Following Platform Adapters are not incompatible with protocol:
     * dummyPlatformAdapterSync
     * dummyPlatformAdapter01
     * dummyPlatformAdapter02
     */
    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: dummyPlatformAdapterAsync })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: dummyPlatformAdapter12 })
    );
    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: dummyPlatformAdapter21 })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: dummyPlatformAdapterSyncOrAsync,
      })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
      })
    );
  });

  test('getServer() returns correct type', () => {
    expect<DummyProtocolServerAsync>(
      serverlessly.pipe(dummyMiddleware).getServer()
    );
  });

  test('getProtocolContext() returns correct type', () => {
    expect<DummyProtocolContextAsync>(
      serverlessly.pipe(dummyMiddleware).getProtocolContext()
    );
  });
});

describe('Serverlessly112', () => {
  test('Serverlessly instance has correct type', () => {
    expect<Serverlessly112>(
      new Serverlessly({
        protocol: dummyProtocol112,
      })
    );
  });

  let serverlessly: Serverlessly112;
  const dummyMiddleware = dummyMiddlewaresAsync[0];

  beforeEach(() => {
    serverlessly = new Serverlessly({
      protocol: dummyProtocol112,
    });
  });

  test('pipe() returns correct type.', () => {
    expect<Serverlessly112>(serverlessly.pipe(dummyMiddleware));
  });

  test('getHandler() with every Platform Adapter returns correct type', () => {
    /**
     * Following Platform Adapters are not incompatible with protocol:
     * dummyPlatformAdapterSync
     * dummyPlatformAdapter01
     * dummyPlatformAdapter02
     */
    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: dummyPlatformAdapterAsync })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: dummyPlatformAdapter12 })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: dummyPlatformAdapter21 })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: dummyPlatformAdapterSyncOrAsync,
      })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
      })
    );
  });

  test('getServer() returns correct type', () => {
    expect<DummyProtocolServerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getServer()
    );
  });

  test('getProtocolContext() returns correct type', () => {
    expect<DummyProtocolContextAsync>(
      serverlessly.pipe(dummyMiddleware).getProtocolContext()
    );
  });
});

describe('Serverlessly121', () => {
  test('Serverlessly instance has correct type', () => {
    expect<Serverlessly121>(
      new Serverlessly({
        protocol: dummyProtocol121,
      })
    );
  });

  let serverlessly: Serverlessly121;
  const dummyMiddleware = dummyMiddlewaresSyncOrAsync[0];

  beforeEach(() => {
    serverlessly = new Serverlessly({
      protocol: dummyProtocol121,
    });
  });

  test('pipe() returns correct type.', () => {
    expect<Serverlessly121>(serverlessly.pipe(dummyMiddleware));
  });

  test('getHandler() with every Platform Adapter returns correct type', () => {
    /**
     * Following Platform Adapters are not incompatible with protocol:
     * dummyPlatformAdapterSync
     * dummyPlatformAdapter01
     * dummyPlatformAdapter02
     */
    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: dummyPlatformAdapterAsync })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: dummyPlatformAdapter12 })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: dummyPlatformAdapter21 })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: dummyPlatformAdapterSyncOrAsync,
      })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
      })
    );
  });

  test('getServer() returns correct type', () => {
    expect<DummyProtocolServerAsync>(
      serverlessly.pipe(dummyMiddleware).getServer()
    );
  });

  test('getProtocolContext() returns correct type', () => {
    expect<DummyProtocolContextAsync>(
      serverlessly.pipe(dummyMiddleware).getProtocolContext()
    );
  });
});

describe('Serverlessly122', () => {
  test('Serverlessly instance has correct type', () => {
    expect<Serverlessly122>(
      new Serverlessly({
        protocol: dummyProtocol122,
      })
    );
  });

  let serverlessly: Serverlessly122;
  const dummyMiddleware = dummyMiddlewaresSyncOrAsync[0];

  beforeEach(() => {
    serverlessly = new Serverlessly({
      protocol: dummyProtocol122,
    });
  });

  test('pipe() returns correct type.', () => {
    expect<Serverlessly122>(serverlessly.pipe(dummyMiddleware));
  });

  test('getHandler() with every Platform Adapter returns correct type', () => {
    /**
     * Following Platform Adapters are not incompatible with protocol:
     * dummyPlatformAdapterSync
     * dummyPlatformAdapter01
     * dummyPlatformAdapter02
     */
    expect<DummyPlatformHandlerAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: dummyPlatformAdapterAsync })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: dummyPlatformAdapter12 })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: dummyPlatformAdapter21 })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: dummyPlatformAdapterSyncOrAsync,
      })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
      })
    );
  });

  test('getServer() returns correct type', () => {
    expect<DummyProtocolServerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getServer()
    );
  });

  test('getProtocolContext() returns correct type', () => {
    expect<DummyProtocolContextAsync>(
      serverlessly.pipe(dummyMiddleware).getProtocolContext()
    );
  });
});

describe('Serverlessly201', () => {
  test('Serverlessly instance has correct type', () => {
    expect<Serverlessly201>(
      new Serverlessly({
        protocol: dummyProtocol201,
      })
    );
  });

  let serverlessly: Serverlessly201;
  const dummyMiddleware = dummyMiddlewaresSync[0];

  beforeEach(() => {
    serverlessly = new Serverlessly({
      protocol: dummyProtocol201,
    });
  });

  test('pipe() returns correct type.', () => {
    expect<Serverlessly201>(serverlessly.pipe(dummyMiddleware));
  });

  test('getHandler() with every Platform Adapter returns correct type', () => {
    /**
     * Following Platform Adapters are not incompatible with protocol:
     * dummyPlatformAdapterSync
     * dummyPlatformAdapter01
     * dummyPlatformAdapter02
     * dummyPlatformAdapterAsync
     * dummyPlatformAdapter12
     */
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: dummyPlatformAdapter21 })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: dummyPlatformAdapterSyncOrAsync,
      })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
      })
    );
  });

  test('getServer() returns correct type', () => {
    expect<DummyProtocolServerAsync>(
      serverlessly.pipe(dummyMiddleware).getServer()
    );
  });

  test('getProtocolContext() returns correct type', () => {
    expect<DummyProtocolContextSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getProtocolContext()
    );
  });
});

describe('Serverlessly202', () => {
  test('Serverlessly instance has correct type', () => {
    expect<Serverlessly202>(
      new Serverlessly({
        protocol: dummyProtocol202,
      })
    );
  });

  let serverlessly: Serverlessly202;
  const dummyMiddleware = dummyMiddlewaresSync[0];

  beforeEach(() => {
    serverlessly = new Serverlessly({
      protocol: dummyProtocol202,
    });
  });

  test('pipe() returns correct type.', () => {
    expect<Serverlessly202>(serverlessly.pipe(dummyMiddleware));
  });

  test('getHandler() with every Platform Adapter returns correct type', () => {
    /**
     * Following Platform Adapters are not incompatible with protocol:
     * dummyPlatformAdapterSync
     * dummyPlatformAdapter01
     * dummyPlatformAdapter02
     * dummyPlatformAdapterAsync
     * dummyPlatformAdapter12
     */
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: dummyPlatformAdapter21 })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: dummyPlatformAdapterSyncOrAsync,
      })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
      })
    );
  });

  test('getServer() returns correct type', () => {
    expect<DummyProtocolServerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getServer()
    );
  });

  test('getProtocolContext() returns correct type', () => {
    expect<DummyProtocolContextSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getProtocolContext()
    );
  });
});

describe('Serverlessly211', () => {
  test('Serverlessly instance has correct type', () => {
    expect<Serverlessly211>(
      new Serverlessly({
        protocol: dummyProtocol211,
      })
    );
  });

  let serverlessly: Serverlessly211;
  const dummyMiddleware = dummyMiddlewaresAsync[0];

  beforeEach(() => {
    serverlessly = new Serverlessly({
      protocol: dummyProtocol211,
    });
  });

  test('pipe() returns correct type.', () => {
    expect<Serverlessly211>(serverlessly.pipe(dummyMiddleware));
  });

  test('getHandler() with every Platform Adapter returns correct type', () => {
    /**
     * Following Platform Adapters are not incompatible with protocol:
     * dummyPlatformAdapterSync
     * dummyPlatformAdapter01
     * dummyPlatformAdapter02
     * dummyPlatformAdapterAsync
     * dummyPlatformAdapter12
     */
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: dummyPlatformAdapter21 })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: dummyPlatformAdapterSyncOrAsync,
      })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
      })
    );
  });

  test('getServer() returns correct type', () => {
    expect<DummyProtocolServerAsync>(
      serverlessly.pipe(dummyMiddleware).getServer()
    );
  });

  test('getProtocolContext() returns correct type', () => {
    expect<DummyProtocolContextSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getProtocolContext()
    );
  });
});

describe('Serverlessly212', () => {
  test('Serverlessly instance has correct type', () => {
    expect<Serverlessly212>(
      new Serverlessly({
        protocol: dummyProtocol212,
      })
    );
  });

  let serverlessly: Serverlessly212;
  const dummyMiddleware = dummyMiddlewaresAsync[0];

  beforeEach(() => {
    serverlessly = new Serverlessly({
      protocol: dummyProtocol212,
    });
  });

  test('pipe() returns correct type.', () => {
    expect<Serverlessly212>(serverlessly.pipe(dummyMiddleware));
  });

  test('getHandler() with every Platform Adapter returns correct type', () => {
    /**
     * Following Platform Adapters are not incompatible with protocol:
     * dummyPlatformAdapterSync
     * dummyPlatformAdapter01
     * dummyPlatformAdapter02
     * dummyPlatformAdapterAsync
     * dummyPlatformAdapter12
     */
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: dummyPlatformAdapter21 })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: dummyPlatformAdapterSyncOrAsync,
      })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
      })
    );
  });

  test('getServer() returns correct type', () => {
    expect<DummyProtocolServerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getServer()
    );
  });

  test('getProtocolContext() returns correct type', () => {
    expect<DummyProtocolContextSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getProtocolContext()
    );
  });
});

describe('Serverlessly221', () => {
  test('Serverlessly instance has correct type', () => {
    expect<Serverlessly221>(
      new Serverlessly({
        protocol: dummyProtocol221,
      })
    );
  });

  let serverlessly: Serverlessly221;
  const dummyMiddleware = dummyMiddlewaresSyncOrAsync[0];

  beforeEach(() => {
    serverlessly = new Serverlessly({
      protocol: dummyProtocol221,
    });
  });

  test('pipe() returns correct type.', () => {
    expect<Serverlessly221>(serverlessly.pipe(dummyMiddleware));
  });

  test('getHandler() with every Platform Adapter returns correct type', () => {
    /**
     * Following Platform Adapters are not incompatible with protocol:
     * dummyPlatformAdapterSync
     * dummyPlatformAdapter01
     * dummyPlatformAdapter02
     * dummyPlatformAdapterAsync
     * dummyPlatformAdapter12
     */
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: dummyPlatformAdapter21 })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: dummyPlatformAdapterSyncOrAsync,
      })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
      })
    );
  });

  test('getServer() returns correct type', () => {
    expect<DummyProtocolServerAsync>(
      serverlessly.pipe(dummyMiddleware).getServer()
    );
  });

  test('getProtocolContext() returns correct type', () => {
    expect<DummyProtocolContextSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getProtocolContext()
    );
  });
});

describe('ServerlesslySyncOrAsync', () => {
  test('Serverlessly instance has correct type', () => {
    expect<ServerlesslySyncOrAsync>(
      new Serverlessly({
        protocol: dummyProtocolSyncOrAsync,
      })
    );
  });

  let serverlessly: ServerlesslySyncOrAsync;
  const dummyMiddleware = dummyMiddlewaresSyncOrAsync[0];

  beforeEach(() => {
    serverlessly = new Serverlessly({
      protocol: dummyProtocolSyncOrAsync,
    });
  });

  test('pipe() returns correct type.', () => {
    expect<ServerlesslySyncOrAsync>(serverlessly.pipe(dummyMiddleware));
  });

  test('getHandler() with every Platform Adapter returns correct type', () => {
    /**
     * Following Platform Adapters are not incompatible with protocol:
     * dummyPlatformAdapterSync
     * dummyPlatformAdapter01
     * dummyPlatformAdapter02
     * dummyPlatformAdapterAsync
     * dummyPlatformAdapter12
     */
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly
        .pipe(dummyMiddleware)
        .getHandler({ platformAdapter: dummyPlatformAdapter21 })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: dummyPlatformAdapterSyncOrAsync,
      })
    );
    expect<DummyPlatformHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getHandler({
        platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict,
      })
    );
  });

  test('getServer() returns correct type', () => {
    expect<DummyProtocolServerSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getServer()
    );
  });

  test('getProtocolContext() returns correct type', () => {
    expect<DummyProtocolContextSyncOrAsync>(
      serverlessly.pipe(dummyMiddleware).getProtocolContext()
    );
  });
});
