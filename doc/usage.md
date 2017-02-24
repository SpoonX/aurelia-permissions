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

## Attrbiute

```html
<messages allowed="{chat: ['read', 'post']"></messages>>
```

An you are **done**.

You can also use the view model instead if you prefer.

## View Model

Implement acl in your view model.

```js
import {Acl} from 'aurelia-acl';

@inject(Acl)
export class Page {
  constructor(acl) {
    this.isAllowed = acl.isAllowed.bind(acl);
  }
}

```

## View

Now tell the view to only render the element if has the `read` and `post` priv
for `chat`.

```html
  <messages if.bind="isAllowed({chat: ['read', 'post'])"></messages>
```

We configured that in a way that grants the current user the read and write for
chat. The messages should be visible.

