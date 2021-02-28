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
import { awsLamda } from '@serverlessly/http-platform-aws';
import { express } from '@serverlessly/http-mengine-express';

import { dbConnect, apiAuth } from './middlewares/essentials';
import { businessLogic1, businessLogic2 } from './middlewares/business';

new Serverlessly({ protocol: http, middlewareEngine: express })
  .pipe(dbConnect)
  .pipe(apiAuth)
  .pipe(businessLogic1, businessLogic2)
  .getHandler({ platformAdapter: awsLambda });
```

You can export the handler as per need. To change the platform (say, from AWS Lambda to self-managed infrastructure), just change the `platformAdapter`.
