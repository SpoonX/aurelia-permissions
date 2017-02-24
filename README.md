# aurelia-permissions

[![Build Status](https://travis-ci.org/SpoonX/aurelia-acl.svg?branch=master)](https://travis-ci.org/SpoonX/aurelia-acl)
[![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg?maxAge=2592000?style=plastic)](https://gitter.im/SpoonX/Dev)

> ACL for your aurelia application.


## Usage

First configure the user permissions statically or dynamically.

> statically in your main.js

```js
.plugin('aurelia-acl', acl => {
  acl.permit('user', 'swim');
  acl.permit('admin', 'fly');
})
```

> dynamically in your app.js

```js
userRequest.get('permissions').then(permissions => {
  this.acl.setPermissions(actionsGroupedByModel(permissions));
});
```

You can then use the acl service in your view model

```js
import {Acl} from 'aurelia-acl';
import {inject} from 'aurelia-framework';

@inject(Acl)
export class Chatroom {

  constructor(acl) {
    // do not forget to bind to the acl instance
    this.isAllowed = acl.isAllowed.bind(acl);
    this.chatBoxIsVisible = acl.isAllowed('chat', 'read');
  }
}
```

Or use the acl attribute instead

```js

<template>

  <chatbox acl.bind="{chat: 'read'}">
  </chatbox>

</template>

```

The chatbox is only visible when acl is granted for `chat.read`.

## Documentation

You can find detailed documentation, including installation instructions over at the [aurelia-acl documentation](http://aurelia-acl.spoonx.org/).

The [changelog](https://aurelia-acl.spoonx.org/CHANGELOG.html) provides you with information about important changes made over releases.

## Contributing

Report bugs, request features, send pull requests for fixes and features and
read the [CONTRIBUTING.md](./CONTRIBUTING.md)

## License

MIT
