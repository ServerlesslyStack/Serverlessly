# @serverlessly/core

The core package of Serverlessly stack. This is required to create all Serverlessly microservices.

## Installation

`npm install @serverlessly/core`

or

`yarn add @serverlessly/core`

## Usage

```ts
import { Serverlessly } from '@serverlessly/core';
import { http } from '@serverlessly/protocol-http';
import { awsLamda } from '@serverlessly/platform-aws';

import { dbConnect, apiAuth } from './middlewares/essentials';
import { businessLogic1, businessLogic2 } from './middlewares/business';

new Serverlessly({ protocol: http })
  .pipe(dbConnect)
  .pipe(apiAuth)
  .pipe(businessLogic1, businessLogic2)
  .getHandler({ platformAdapter: awsLambda });
```

You can export the handler as per need. To change the platform (say, from AWS Lambda to Azure Functions), just change the `platformAdapter`.

## Multi-Cloud

You can grab multiple handlers of a Serverlessly microservice in your CI/CD pipeline to truly go multi-cloud.

```ts
// api/foo.ts

export default new Serverlessly({ protocol: http }).pipe(...);
```

```ts
// deploy.ts
import serverlessly from './api/foo';

// Deploy awsLambdaHandler to AWS Lambda
const awsLambdaHandler = serverlessly.getHandler({
  platformAdapter: awsLambda,
});

// Deploy azureFunctionsHandler to Azure Functions
const azureFunctionsHandler = serverlessly.getHandler({
  platformAdapter: azureFunctions,
});
```

## Self-Managed Infrastructure

A working Serverlessly microservice is guaranteed to run on custom Node.js infrastructure (which ensures no vendor lock-in). All Serverlessly protocols ship with a `Protocol Server` which can listen to protocol requests (For more details, look at documentation of individual protocol).

```ts
new Serverlessly({ protocol: http })
  .pipe(...)
  .getServer()
  .listen(8080, 'example.com', () => {
    console.info('Serverlessly HTTP Server Online');
  });
```

### Advanced Use Case: Custom Server

If you want to handle the microservice by your own server code, you've multiple options:

- Create a `platformAdapter` which can be used with `getHandler()`.

- Get `Protocol Context` either by calling `getHandler()` with `protocolServerAdapter` platform adapter or by calling `getProtocolContext()`.

```ts
import { Serverlessly, protocolServerAdapter } from '@serverlessly/core';
import { createServer } from 'http'; // This can be your server

const httpHandler = new Serverlessly({ protocol: http })
  .pipe(...)
  .getHandler({
    platformAdapter: protocolServerAdapter
  });

createServer(httpHandler).listen(8080, 'example.com', () => {
  console.info('HTTP Server Online');
})
```

If you need to do this all the time, you can incorporate your server code into `Serverlessly` by extending it:

```ts
import { Serverlessly } from '@serverlessly/core';
import { createServer } from 'http';

class MyServerlessly extends Serverlessly {
  getCustomServer(): Server {
    return createServer(this.getProtocolContext());
  }
}

new MyServerlessly({ protocol: http })
  .pipe(...)
  .getCustomServer()
  .listen(8080, 'example.com', () => {
    console.info('Custom Server Online');
  })
```

## Debugging

`Serverlessly` is an [Event Emitter](https://nodejs.org/api/events.html) which emits four types of events: `LOG`, `ERROR`, `MIDDLEWARES` & `NEW_MIDDLEWARES` (last two are emitted only by `pipe()` method).

```ts
new Serverlessly({ protocol: http })
  .on('ERROR', (error) => { console.error(error) })
  .on('LOG', (log) => { console.log(log) })
  .pipe(...)
  .getHandler({ platformAdapter: awsLambda });
```

Make sure to attach event listener before the method you're interested in.

```ts
new Serverlessly({ protocol: http })
  .pipe(...) // events emitted by pipe() won't be captured
  .on('LOG', (log) => { console.log(log) })
  .getHandler({ platformAdapter: awsLambda });
```
