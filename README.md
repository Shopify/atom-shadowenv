# 0-shadowenv package

This package automatically loads the [Shadowenv](https://shopify.github.io/shadowenv) of the opened
project.

## Installation

```
apm install 0-shadowenv
```

## FAQ

##### Why does the package name starts with '0-'?

Load order is lexicographic. Starting with a zero loads this first, which means other extensions
will see the changes made to environment variables by this package.

## Commands

* `shadowenv:load`: reload the Shadowenv if you've changed the Shadowlisp code while a project is open.
* `shadowenv:trust`: trust the Shadowlisp code in the active project
* `shadowenv:version`: display the installed Shadowenv version

#### TODO

* Use
  [onDidChangePaths](https://flight-manual.atom.io/api/v1.40.1/Project/#instance-onDidChangePaths)
  to trigger reloads when Shadowlisp changes while Atom has a project open.

## Similar packages

* [000-project-shell-env](https://atom.io/packages/000-project-shell-env)
* [env-from-shell](https://atom.io/packages/env-from-shell)
* [atomenv](https://atom.io/packages/atomenv)
