# aurelia-acl

[![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg?maxAge=2592000?style=plastic)](https://gitter.im/SpoonX/Dev)

> ACL for your aurelia application.

Simple and small. Set permissions, and then use the provided tools to verify them.

## Installation

### Jspm

Run `jspm i aurelia-acl` from your project root.

And add following to the `bundles.dist.aurelia.includes` section of `build/bundles.js`:

```js
  "aurelia-acl"
```

If the installation results in having forks, try resolving them by running:

```sh
jspm inspect --forks
jspm resolve --only registry:package-name@version
```

## Configuration

The most basic way to configure your permissions is by passing them as an object literal. More configuration options can
 be found on the [documentation](./configure.md);


```js
aurelia.use
   .plugin('aurelia-acl', {
     chat: ['read', 'post'],
     statistics: true // grants access to all statistics
   });
```

## Usage

```html
<template>
  <chatbox allowed="{chat: 'read'}"></chatbox>
</template>
```

The `chatbox` is only visible when acl is granted for `chat.read`.

## Documentation

You can find detailed documentation, including installation instructions over at the [aurelia-acl documentation](http://aurelia-acl.spoonx.org/).

The [changelog](https://aurelia-acl.spoonx.org/CHANGELOG.html) provides you with information about important changes made over releases.

## Contributing

Report bugs, request features, send pull requests for fixes and features and read the [CONTRIBUTING.md](./CONTRIBUTING.md)

## License

MIT
