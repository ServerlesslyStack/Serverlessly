![Serverlessly Logo](https://github.com/ServerlesslyStack/Serverlessly/raw/main/assets/logo.png)

[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/ServerlesslyStack/Serverlessly/Matrix%20Test?label=matrix%20test&logo=GitHub%20Actions&logoColor=%23FFF)](https://github.com/ServerlesslyStack/Serverlessly/actions?query=workflow%3A%22Matrix+Test%22) [![Codecov](https://img.shields.io/codecov/c/github/ServerlesslyStack/Serverlessly?label=coverage&logo=Codecov&token=XO1C4ATYMM)](https://codecov.io/gh/ServerlesslyStack/Serverlessly) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/114b4d920d6243d9b6c9d560cd53f7c0)](https://www.codacy.com/gh/ServerlesslyStack/Serverlessly/dashboard?utm_source=github.com&utm_medium=referral&utm_content=ServerlesslyStack/Serverlessly&utm_campaign=Badge_Grade) [![GitHub last commit](https://img.shields.io/github/last-commit/ServerlesslyStack/Serverlessly?logo=github)](https://github.com/ServerlesslyStack/Serverlessly/commits/main) [![Mergify Status](https://img.shields.io/endpoint.svg?url=https://gh.mergify.io/badges/ServerlesslyStack/Serverlessly&style=flat)](https://github.com/ServerlesslyStack/Serverlessly/blob/main/.github/mergify.yml) [![GitHub](https://img.shields.io/github/license/ServerlesslyStack/Serverlessly?color=%2300cc00)](https://app.fossa.com/reports/b6bc87d4-04d0-44e6-bac5-14cc7991cbbd)

Serverlessly allows you to write _vendor-neutral_ cloud-native microservices which you can run on any FaaS (AWS Lambda, Azure Functions etc), CaaS (AWS Fargate, Google Cloud Run etc) or self-managed infrastructure (Auto-scaling EC2, Kubernetes etc) at scale.

---

:warning: **Notice:** Serverlessly is currently in early development phase. No release has been made so far.

---

## Philosophy

What problem does Serverlessly solve?

### Microservice Portability & No Vendor Lock-In

When you write microservices for AWS Lambda, you get locked into the system because the same code can't run on Azure Functions or self-managed infrastructure. With Serverlessly, you can move around by just switching `Platform Adapter`.

In contrast, Containers (which seem to solve same problem) are heavy on cold boot (AWS Fargate cold boot time can go upto 20 seconds) & keeping containers warm in CaaS or Kubernetes cluster can be costly. Besides, Serverlessly microservices can also be deployed in Containers if the need arises.

### Multi-Cloud

Your CI/CD pipeline can change `Platform Adapter` on the fly to make you truly go multi-cloud (for increasing service availability, decreasing latency etc). Serverlessly will offer tooling to make that easy.

### Middleware Ecosystem

Middlewares may look outdated, but they aren't. Currently, countless mankind hours get wasted solving same common problems because big cloud providers didn't bother to think about building middleware ecosystems for their FaaS offerings. For example, if you look at security middleware [Helmet](https://www.npmjs.com/package/helmet) for Express, it's useful even to microservices.

### Easy Debugging

Step-through debugging a microservice involves bringing FaaS execution environment locally which isn't always piece of cake. With Serverlessly, you can change to a `Platform Adapter` for self-managed infrastructure & debug your code [normally](https://nodejs.org/en/docs/guides/debugging-getting-started/) (For Typescript, if you want to avoid compilation, you can run `node --inspect-brk -r ts-node/register your-microservice.ts` or `node --inspect -r ts-node/register your-microservice.ts` before [attaching your favorite debugging client](https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_attaching-to-nodejs) over inspector protocol as usual).

## Glossary of Serverlessly Terms

### Protocol

A Serverlessly `Protocol` represents a network protocol like `http`, `ws` etc. It glues together multiple parts of Serverlessly system.

Official npm packages for protocols: `@serverlessly/protocol-*`
Third-party npm packages for protocols: `serverlessly-protocol-*`

### Protocol Context

Internal state of a Serverlessly `Protocol`.

### Middleware

Modular consumer code which can be shared across organization or the world.

### Middleware Engine

A `Middleware Engine` is responsible to process middlewares. Here, by processing, it's meant that it initializes the middlewares (if required), glue them together, creates a new `Protocol Context` using the glued code (which has consumer code) & register the `Protocol Context` to Serverlessly `Protocol`.

**Note:** In the entire lifespan of a Serverlessly microservice, a `Middleware Engine` runs only once (only during cold boot on FaaS), so it isn't a performance overhead.

Official npm packages for middleware engines: `@serverlessly/[protocol]-mengine-*`
Third-party npm packages for middleware engines: `serverlessly-[protocol]-mengine-*`

### Platform

A `Platform` represents a specific execution environment. AWS Lambda, Azure Function, Self-managed Node.js environment etc are all examples of `Platform`.

### Platform Adapter

A `Platform Adapter` makes it possible to run a Serverlessly microservice on a specific platform like `AWS Lambda`, `Azure Functions` etc. It does the translation from the `Platform` to Serverlessly `Protocol Context` & vice versa.

**Note:** In the entire lifespan of a Serverlessly microservice, a `Platform Adapter` runs only once (on FaaS, only during cold boot), so it isn't a performance overhead.

Official npm packages for platform adapters: `@serverlessly/[protocol]-platform-*`
Third-party npm packages for platform adapters: `serverlessly-[protocol]-platform-*`

---

[![FOSSA Detailed License Scan Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FServerlesslyStack%2FServerlessly.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FServerlesslyStack%2FServerlessly/)

[![Code Climate](https://img.shields.io/codeclimate/maintainability/ServerlesslyStack/Serverlessly?label=Code%20Climate&logo=code%20climate&style=for-the-badge)](https://codeclimate.com/github/ServerlesslyStack/Serverlessly/maintainability) [![Codecov](https://img.shields.io/codecov/c/github/ServerlesslyStack/Serverlessly?label=Codecov&logo=Codecov&style=for-the-badge&token=XO1C4ATYMM)](https://codecov.io/gh/ServerlesslyStack/Serverlessly) [![Codacy](https://img.shields.io/codacy/grade/114b4d920d6243d9b6c9d560cd53f7c0?label=Codacy&logo=codacy&style=for-the-badge)](https://www.codacy.com/gh/ServerlesslyStack/Serverlessly/dashboard)
