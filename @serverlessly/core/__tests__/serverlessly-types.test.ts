import { Serverlessly } from '@serverlessly/core';
import {
  DummyHandlerAsync,
  DummyHandlerSync,
  DummyHandlerSyncOrAsync,
  dummyMiddlewareEngineAsync,
  dummyMiddlewareEngineAsyncMiddlewareToSyncOrAsyncProtocol,
  dummyMiddlewareEngineSync,
  dummyMiddlewareEngineSyncMiddlewareToAsyncProtocol,
  dummyMiddlewareEngineSyncMiddlewareToSyncOrAsyncProtocol,
  dummyMiddlewareEngineSyncOrAsync,
  dummyMiddlewareEngineSyncOrAsyncMiddlewareToAsyncProtocol,
  dummyMiddlewaresAsync,
  dummyMiddlewaresSync,
  dummyMiddlewaresSyncOrAsync,
  dummyPlatformAdapterAsync,
  dummyPlatformAdapterAsyncHandlerToSyncOrAsyncProtocol,
  dummyPlatformAdapterAsyncHandlerToSyncProtocol,
  dummyPlatformAdapterSync,
  dummyPlatformAdapterSyncOrAsync,
  dummyPlatformAdapterSyncOrAsyncHandlerToAsyncProtocol,
  dummyPlatformAdapterSyncOrAsyncHandlerToSyncProtocol,
  dummyPlatformAdapterSyncOrAsyncStrict,
  DummyProtocolAsync,
  DummyProtocolSync,
  DummyProtocolSyncOrAsync,
  ServerlesslyAsync,
  ServerlesslyAsyncProtocolWithSyncMiddlewares,
  ServerlesslyAsyncProtocolWithSyncOrAsyncMiddlewares,
  ServerlesslySync,
  ServerlesslySyncOrAsync,
  ServerlesslySyncOrAsyncProtocolWithAsyncMiddlewares,
  ServerlesslySyncOrAsyncProtocolWithSyncMiddlewares,
} from './dummies';

describe('ServerlesslySync', () => {
  test('Serverlessly instance has correct type', () => {
    expect<ServerlesslySync>(
      new Serverlessly({
        middlewareEngine: dummyMiddlewareEngineSync,
      })
    );
  });

  let serverlessly: ServerlesslySync;

  beforeEach(() => {
    serverlessly = new Serverlessly({
      middlewareEngine: dummyMiddlewareEngineSync,
    });
  });

  test('pipe() returns correct type.', () => {
    expect<ServerlesslySync>(serverlessly.pipe(dummyMiddlewaresSync[0]));
  });

  test('getHandler() with every Platform Adapter returns correct type', () => {
    /**
     * Following Platform Adapters are not incompatible with protocol:
     * dummyPlatformAdapterAsync
     * dummyPlatformAdapterSyncOrAsyncHandlerToAsyncProtocol
     */
    expect<DummyProtocolSync>(
      serverlessly.pipe(dummyMiddlewaresSync[0]).getHandler()
    );
    expect<DummyHandlerSync>(
      serverlessly
        .pipe(dummyMiddlewaresSync[0])
        .getHandler({ platformAdapter: dummyPlatformAdapterSync })
    );
    expect<DummyHandlerAsync>(
      serverlessly.pipe(dummyMiddlewaresSync[0]).getHandler({
        platformAdapter: dummyPlatformAdapterAsyncHandlerToSyncProtocol,
      }) as DummyHandlerAsync
    );
    expect<DummyHandlerSyncOrAsync>(
      serverlessly
        .pipe(dummyMiddlewaresSync[0])
        .getHandler({ platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict })
    );
    expect<DummyHandlerSyncOrAsync>(
      serverlessly
        .pipe(dummyMiddlewaresSync[0])
        .getHandler({ platformAdapter: dummyPlatformAdapterSyncOrAsync })
    );
    expect<DummyHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddlewaresSync[0]).getHandler({
        platformAdapter: dummyPlatformAdapterSyncOrAsyncHandlerToSyncProtocol,
      })
    );
    expect<DummyHandlerAsync>(
      serverlessly.pipe(dummyMiddlewaresSync[0]).getHandler({
        platformAdapter: dummyPlatformAdapterAsyncHandlerToSyncOrAsyncProtocol,
      }) as DummyHandlerAsync
    );
  });
});

describe('ServerlesslyAsync', () => {
  test('Serverlessly instance has correct type', () => {
    expect<ServerlesslyAsync>(
      new Serverlessly({
        middlewareEngine: dummyMiddlewareEngineAsync,
      })
    );
  });

  let serverlessly: ServerlesslyAsync;

  beforeEach(() => {
    serverlessly = new Serverlessly({
      middlewareEngine: dummyMiddlewareEngineAsync,
    });
  });

  test('pipe() returns correct type.', () => {
    expect<ServerlesslyAsync>(serverlessly.pipe(dummyMiddlewaresAsync[0]));
  });

  test('getHandler() with every Platform Adapter returns correct type', () => {
    /**
     * Following Platform Adapters are not incompatible with protocol:
     * dummyPlatformAdapterSync
     * dummyPlatformAdapterAsyncHandlerToSyncProtocol
     * dummyPlatformAdapterSyncOrAsyncHandlerToSyncProtocol
     */
    expect<DummyProtocolAsync>(
      serverlessly.pipe(dummyMiddlewaresAsync[0]).getHandler()
    );
    expect<DummyHandlerAsync>(
      serverlessly.pipe(dummyMiddlewaresAsync[0]).getHandler({
        platformAdapter: dummyPlatformAdapterAsync,
      }) as DummyHandlerAsync
    );
    expect<DummyHandlerSyncOrAsync>(
      serverlessly
        .pipe(dummyMiddlewaresAsync[0])
        .getHandler({ platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict })
    );
    expect<DummyHandlerSyncOrAsync>(
      serverlessly
        .pipe(dummyMiddlewaresAsync[0])
        .getHandler({ platformAdapter: dummyPlatformAdapterSyncOrAsync })
    );
    expect<DummyHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddlewaresAsync[0]).getHandler({
        platformAdapter: dummyPlatformAdapterSyncOrAsyncHandlerToAsyncProtocol,
      })
    );
    expect<DummyHandlerAsync>(
      serverlessly.pipe(dummyMiddlewaresAsync[0]).getHandler({
        platformAdapter: dummyPlatformAdapterAsyncHandlerToSyncOrAsyncProtocol,
      }) as DummyHandlerAsync
    );
  });
});

describe('ServerlesslyAsyncProtocolWithSyncMiddlewares', () => {
  test('Serverlessly instance has correct type', () => {
    expect<ServerlesslyAsyncProtocolWithSyncMiddlewares>(
      new Serverlessly({
        middlewareEngine: dummyMiddlewareEngineSyncMiddlewareToAsyncProtocol,
      })
    );
  });

  let serverlessly: ServerlesslyAsyncProtocolWithSyncMiddlewares;

  beforeEach(() => {
    serverlessly = new Serverlessly({
      middlewareEngine: dummyMiddlewareEngineSyncMiddlewareToAsyncProtocol,
    });
  });

  test('pipe() returns correct type.', () => {
    expect<ServerlesslyAsyncProtocolWithSyncMiddlewares>(
      serverlessly.pipe(dummyMiddlewaresSync[0])
    );
  });

  test('getHandler() with every Platform Adapter returns correct type', () => {
    /**
     * Following Platform Adapters are not incompatible with protocol:
     * dummyPlatformAdapterSync
     * dummyPlatformAdapterAsyncHandlerToSyncProtocol
     * dummyPlatformAdapterSyncOrAsyncHandlerToSyncProtocol
     */
    expect<DummyProtocolAsync>(
      serverlessly.pipe(dummyMiddlewaresSync[0]).getHandler()
    );
    expect<DummyHandlerAsync>(
      serverlessly.pipe(dummyMiddlewaresSync[0]).getHandler({
        platformAdapter: dummyPlatformAdapterAsync,
      }) as DummyHandlerAsync
    );
    expect<DummyHandlerSyncOrAsync>(
      serverlessly
        .pipe(dummyMiddlewaresSync[0])
        .getHandler({ platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict })
    );
    expect<DummyHandlerSyncOrAsync>(
      serverlessly
        .pipe(dummyMiddlewaresSync[0])
        .getHandler({ platformAdapter: dummyPlatformAdapterSyncOrAsync })
    );
    expect<DummyHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddlewaresSync[0]).getHandler({
        platformAdapter: dummyPlatformAdapterSyncOrAsyncHandlerToAsyncProtocol,
      })
    );
    expect<DummyHandlerAsync>(
      serverlessly.pipe(dummyMiddlewaresSync[0]).getHandler({
        platformAdapter: dummyPlatformAdapterAsyncHandlerToSyncOrAsyncProtocol,
      }) as DummyHandlerAsync
    );
  });
});

describe('ServerlesslySyncOrAsync', () => {
  test('Serverlessly instance has correct type', () => {
    expect<ServerlesslySyncOrAsync>(
      new Serverlessly({
        middlewareEngine: dummyMiddlewareEngineSyncOrAsync,
      })
    );
  });

  let serverlessly: ServerlesslySyncOrAsync;

  beforeEach(() => {
    serverlessly = new Serverlessly({
      middlewareEngine: dummyMiddlewareEngineSyncOrAsync,
    });
  });

  test('pipe() returns correct type.', () => {
    expect<ServerlesslySyncOrAsync>(
      serverlessly.pipe(
        dummyMiddlewaresSyncOrAsync[0],
        dummyMiddlewaresSyncOrAsync[1]
      )
    );
  });

  test('getHandler() with every Platform Adapter returns correct type', () => {
    /**
     * Following Platform Adapters are not incompatible with protocol:
     * dummyPlatformAdapterSync
     * dummyPlatformAdapterAsync
     * dummyPlatformAdapterAsyncHandlerToSyncProtocol
     * dummyPlatformAdapterSyncOrAsyncHandlerToSyncProtocol
     * dummyPlatformAdapterSyncOrAsyncHandlerToAsyncProtocol
     */
    expect<DummyProtocolSyncOrAsync>(
      serverlessly
        .pipe(dummyMiddlewaresSyncOrAsync[0], dummyMiddlewaresSyncOrAsync[1])
        .getHandler()
    );
    expect<DummyHandlerSyncOrAsync>(
      serverlessly
        .pipe(dummyMiddlewaresSyncOrAsync[0], dummyMiddlewaresSyncOrAsync[1])
        .getHandler({ platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict })
    );
    expect<DummyHandlerSyncOrAsync>(
      serverlessly
        .pipe(dummyMiddlewaresSyncOrAsync[0], dummyMiddlewaresSyncOrAsync[1])
        .getHandler({ platformAdapter: dummyPlatformAdapterSyncOrAsync })
    );
    expect<DummyHandlerAsync>(
      serverlessly
        .pipe(dummyMiddlewaresSyncOrAsync[0], dummyMiddlewaresSyncOrAsync[1])
        .getHandler({
          platformAdapter: dummyPlatformAdapterAsyncHandlerToSyncOrAsyncProtocol,
        }) as DummyHandlerAsync
    );
  });
});

describe('ServerlesslySyncOrAsyncProtocolWithSyncMiddlewares', () => {
  test('Serverlessly instance has correct type', () => {
    expect<ServerlesslySyncOrAsyncProtocolWithSyncMiddlewares>(
      new Serverlessly({
        middlewareEngine: dummyMiddlewareEngineSyncMiddlewareToSyncOrAsyncProtocol,
      })
    );
  });

  let serverlessly: ServerlesslySyncOrAsyncProtocolWithSyncMiddlewares;

  beforeEach(() => {
    serverlessly = new Serverlessly({
      middlewareEngine: dummyMiddlewareEngineSyncMiddlewareToSyncOrAsyncProtocol,
    });
  });

  test('pipe() returns correct type.', () => {
    expect<ServerlesslySyncOrAsyncProtocolWithSyncMiddlewares>(
      serverlessly.pipe(dummyMiddlewaresSync[0])
    );
  });

  test('getHandler() with every Platform Adapter returns correct type', () => {
    /**
     * Following Platform Adapters are not incompatible with protocol:
     * dummyPlatformAdapterSync
     * dummyPlatformAdapterAsync
     * dummyPlatformAdapterAsyncHandlerToSyncProtocol
     * dummyPlatformAdapterSyncOrAsyncHandlerToSyncProtocol
     * dummyPlatformAdapterSyncOrAsyncHandlerToAsyncProtocol
     */
    expect<DummyProtocolSyncOrAsync>(
      serverlessly.pipe(dummyMiddlewaresSync[0]).getHandler()
    );
    expect<DummyHandlerSyncOrAsync>(
      serverlessly
        .pipe(dummyMiddlewaresSync[0])
        .getHandler({ platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict })
    );
    expect<DummyHandlerSyncOrAsync>(
      serverlessly
        .pipe(dummyMiddlewaresSync[0])
        .getHandler({ platformAdapter: dummyPlatformAdapterSyncOrAsync })
    );
    expect<DummyHandlerAsync>(
      serverlessly.pipe(dummyMiddlewaresSync[0]).getHandler({
        platformAdapter: dummyPlatformAdapterAsyncHandlerToSyncOrAsyncProtocol,
      }) as DummyHandlerAsync
    );
  });
});

describe('ServerlesslySyncOrAsyncProtocolWithAsyncMiddlewares', () => {
  test('Serverlessly instance has correct type', () => {
    expect<ServerlesslySyncOrAsyncProtocolWithAsyncMiddlewares>(
      new Serverlessly({
        middlewareEngine: dummyMiddlewareEngineAsyncMiddlewareToSyncOrAsyncProtocol,
      })
    );
  });

  let serverlessly: ServerlesslySyncOrAsyncProtocolWithAsyncMiddlewares;

  beforeEach(() => {
    serverlessly = new Serverlessly({
      middlewareEngine: dummyMiddlewareEngineAsyncMiddlewareToSyncOrAsyncProtocol,
    });
  });

  test('pipe() returns correct type.', () => {
    expect<ServerlesslySyncOrAsyncProtocolWithAsyncMiddlewares>(
      serverlessly.pipe(dummyMiddlewaresAsync[0])
    );
  });

  test('getHandler() with every Platform Adapter returns correct type', () => {
    /**
     * Following Platform Adapters are not incompatible with protocol:
     * dummyPlatformAdapterSync
     * dummyPlatformAdapterAsync
     * dummyPlatformAdapterAsyncHandlerToSyncProtocol
     * dummyPlatformAdapterSyncOrAsyncHandlerToSyncProtocol
     * dummyPlatformAdapterSyncOrAsyncHandlerToAsyncProtocol
     */
    expect<DummyProtocolSyncOrAsync>(
      serverlessly.pipe(dummyMiddlewaresAsync[0]).getHandler()
    );
    expect<DummyHandlerSyncOrAsync>(
      serverlessly
        .pipe(dummyMiddlewaresAsync[0])
        .getHandler({ platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict })
    );
    expect<DummyHandlerSyncOrAsync>(
      serverlessly
        .pipe(dummyMiddlewaresAsync[0])
        .getHandler({ platformAdapter: dummyPlatformAdapterSyncOrAsync })
    );
    expect<DummyHandlerAsync>(
      serverlessly.pipe(dummyMiddlewaresAsync[0]).getHandler({
        platformAdapter: dummyPlatformAdapterAsyncHandlerToSyncOrAsyncProtocol,
      }) as DummyHandlerAsync
    );
  });
});

describe('ServerlesslyAsyncProtocolWithSyncOrAsyncMiddlewares', () => {
  test('Serverlessly instance has correct type', () => {
    expect<ServerlesslyAsyncProtocolWithSyncOrAsyncMiddlewares>(
      new Serverlessly({
        middlewareEngine: dummyMiddlewareEngineSyncOrAsyncMiddlewareToAsyncProtocol,
      })
    );
  });

  let serverlessly: ServerlesslyAsyncProtocolWithSyncOrAsyncMiddlewares;

  beforeEach(() => {
    serverlessly = new Serverlessly({
      middlewareEngine: dummyMiddlewareEngineSyncOrAsyncMiddlewareToAsyncProtocol,
    });
  });

  test('pipe() returns correct type.', () => {
    expect<ServerlesslyAsyncProtocolWithSyncOrAsyncMiddlewares>(
      serverlessly.pipe(dummyMiddlewaresSync[0])
    );
  });

  test('getHandler() with every Platform Adapter returns correct type', () => {
    /**
     * Following Platform Adapters are not incompatible with protocol:
     * dummyPlatformAdapterSync
     * dummyPlatformAdapterAsyncHandlerToSyncProtocol
     * dummyPlatformAdapterSyncOrAsyncHandlerToSyncProtocol
     */
    expect<DummyProtocolAsync>(
      serverlessly.pipe(dummyMiddlewaresSync[0]).getHandler()
    );
    expect<DummyHandlerSyncOrAsync>(
      serverlessly
        .pipe(dummyMiddlewaresSync[0])
        .getHandler({ platformAdapter: dummyPlatformAdapterSyncOrAsyncStrict })
    );
    expect<DummyHandlerSyncOrAsync>(
      serverlessly
        .pipe(dummyMiddlewaresSync[0])
        .getHandler({ platformAdapter: dummyPlatformAdapterSyncOrAsync })
    );
    expect<DummyHandlerSyncOrAsync>(
      serverlessly.pipe(dummyMiddlewaresSync[0]).getHandler({
        platformAdapter: dummyPlatformAdapterSyncOrAsyncHandlerToAsyncProtocol,
      })
    );
    expect<DummyHandlerAsync>(
      serverlessly.pipe(dummyMiddlewaresSync[0]).getHandler({
        platformAdapter: dummyPlatformAdapterAsyncHandlerToSyncOrAsyncProtocol,
      }) as DummyHandlerAsync
    );
  });
});
