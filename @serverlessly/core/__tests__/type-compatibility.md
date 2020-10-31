# Type Compatibility Report

Based on Types

## Platform Adapters Incompatible with Protocol

### DummyProtocolSync

- dummyPlatformAdapterAsync
- dummyPlatformAdapterSyncOrAsyncHandlerToAsyncProtocol

### DummyProtocolAsync

- dummyPlatformAdapterSync
- dummyPlatformAdapterAsyncHandlerToSyncProtocol
- dummyPlatformAdapterSyncOrAsyncHandlerToSyncProtocol

### DummyProtocolSyncOrAsync

- dummyPlatformAdapterSync
- dummyPlatformAdapterAsync
- dummyPlatformAdapterAsyncHandlerToSyncProtocol
- dummyPlatformAdapterSyncOrAsyncHandlerToSyncProtocol
- dummyPlatformAdapterSyncOrAsyncHandlerToAsyncProtocol

## Protocols Inompatible with Platform Adapters

### dummyPlatformAdapterSync

- DummyProtocolAsync
- DummyProtocolSyncOrAsync

### dummyPlatformAdapterAsync

- DummyProtocolSync
- DummyProtocolSyncOrAsync

### dummyPlatformAdapterAsyncHandlerToSyncProtocol

- DummyProtocolAsync
- DummyProtocolSyncOrAsync

### dummyPlatformAdapterSyncOrAsyncStrict

None

### dummyPlatformAdapterSyncOrAsync

None

### dummyPlatformAdapterSyncOrAsyncHandlerToSyncProtocol

- DummyProtocolAsync
- DummyProtocolSyncOrAsync

### dummyPlatformAdapterSyncOrAsyncHandlerToAsyncProtocol

- DummyProtocolSync
- DummyProtocolSyncOrAsync

### dummyPlatformAdapterAsyncHandlerToSyncOrAsyncProtocol

None
