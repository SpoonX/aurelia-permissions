# Configure

It is possible to configure the aurelia acl in your configurations. You can
either get access to the `aclManager` or pass an object to set the privileges
that way.

```js

import {AclManager} from 'aurelia-acl';

/* ... */

  .plugin('aurelia-acl', acl => {

    /* acl.constructor === AclManager // => true */

    acl.grant('user', 'swim');

    acl.grant('admin', 'fly', 'clouds');

    acl.grant('me', 'crawl');

  })

/* ... */

```

Passing a simple javascript object is also a possibility

```js

  .plugin('aurelia-acl', {
    user: ['swim'],
    admin: ['fly', 'clouds'],
    me: ['crawl']
  });

```
