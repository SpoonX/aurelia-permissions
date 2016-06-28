# Quick start

## Configure

Example where the priviliges are defined in the main.js using an object
literal.

```js
  .plugin('aurelia-acl', {
    chat: ['read', 'post'],
    product: ['read'],
    user: ['read'],
    statistics: ['*'] // has acces to all statistics
  });
```

## View Model

Implement aclManager in your view model.

```js
import {AclManager} from 'aurelia-acl';

@inject(AclManager)
export class Page {
  constructor(aclManager) {
    this.isAllowed = aclManager.has;
  }
}

```

## View

Now tell the view to only render the element if has the `read` and `post` priv
for messages.

```html
  <messages if.bind="isAllowed('chat', 'read', 'post')"></messages>
```

We configured that in a way that grants the current user the read and write for
chat. The messages should be visible.
