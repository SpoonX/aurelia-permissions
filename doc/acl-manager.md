# Acl Manager

Per user the priviliges for certain parts of the application can differ. These
parts are refered to as namespaces.

## .instance(namespace)

Returns an acl instance. When the instance for that namespace has not yet been
defined it returns a new instance. Otherwise the existing instance is returned.

All the methods on the an acl instance can also be used directly by the acl
manager. This is done for convenience and is done in the following manner.

```js
import {AclManager} from 'aurelia-acl';

@inject(AclManager)
class SomeClass {
  constructor(aclManager) {

    /* instead of doing */

    this.canSwim = aclManager.instance('user').has('swim'); // => false

    /* you can write */

    this.canSwim = aclManager.has('user', 'swim'); // => false

    /* the return value is false thus the 'user' acl instance does not have
     * the swim privilige */
  }
}

```

Read more about the available methods in the `acl instance` chapter.
