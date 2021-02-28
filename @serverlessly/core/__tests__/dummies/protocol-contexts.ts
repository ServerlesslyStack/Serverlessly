import { ProtocolContext } from '@serverlessly/core';

// Dummy Protocol Context Interfaces
export class DummyProtocolContextSync extends ProtocolContext {
  constructor(public listener: (prefix: string) => string) {
    super();
  }
}

export class DummyProtocolContextAsync extends ProtocolContext {
  constructor(public listener: (prefix: string) => Promise<string>) {
    super();
  }
}

export class DummyProtocolContextSyncOrAsync extends ProtocolContext {
  constructor(public listener: (prefix: string) => string | Promise<string>) {
    super();
  }
}
