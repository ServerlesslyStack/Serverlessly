# Contributing to Serverlessly

Thanks for showing interest to improve Serverlessly. Your contribution will be appreciated.

The following is a set of guidelines for contributing to Serverlessly. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Prerequisites

- Pledge to uphold [Serverlessly Code Of Conduct](./CODE_OF_CONDUCT.md)

- Familiarity with [Forking Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/forking-workflow) & [GitHub Pull Requests](https://help.github.com/articles/using-pull-requests).

## How and What to Contribute

- **Ideas:** Participate in Ideas threads in [Serverlessly Discussions -> Ideas](https://github.com/ServerlesslyStack/Serverlessly/discussions?discussions_q=category%3AIdeas) or start your own thread to have your voice heard.

- **Bugs:** Report bugs by starting a new thread in [Serverlessly Issues](https://github.com/ServerlesslyStack/Serverlessly/issues) (always search the issues first in case the bug has already been reported). [DO NOT REPORT SECURITY VULNERABILITIES AS ISSUES](./SECURITY.md).

- **Docs:** Fix typos and clarify language in documentation markdown files (`*.md`) or [TSDOC](https://github.com/microsoft/tsdoc) of code files by opening [Pull Requests](https://help.github.com/articles/using-pull-requests) from a forked repo.

- **Code:** Fix bugs or add new features to any of Serverlessly package by opening a [Pull Requests](https://help.github.com/articles/using-pull-requests) from a forked repo. Adhere to repo's [linting rules](./.eslintrc.js). And, don't forget to add tests.

## Setting up development environment

1. [Fork](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo) this repo.

2. [Clone](https://docs.github.com/en/github/using-git/which-remote-url-should-i-use) the forked repo.

3. [Install Yarn](https://classic.yarnpkg.com/en/docs/install/) if it's not already installed (npm is NOT supported).

4. Run `yarn` command which will setup your environment.

For best experience, use [Visual Studio Code](https://code.visualstudio.com/) IDE & install all [extensions recommended by this project](./.vscode/extensions.json).

## Before opening Pull Request on GitHub

Run the following command & make sure that everything checks out okay:

```sh
yarn test && yarn lint && yarn format
```

## Pull Request

Pull Request titles are required to follow `Serverlessly Commit specification` which extends [Conventional Commit specification](https://www.conventionalcommits.org/en/v1.0.0/) and overrides types enum. Types `build` and `ci` from Conventional Commit specification have been removed. If you need to use them, you can use `devops` type. Complete set of types can be found [here](./configs/commitlint.config.js).
