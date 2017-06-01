# Quick start

## Configuration

Configure `aurelia-acl` on your `main.js` file

```js
aurelia.use
   .plugin('aurelia-acl', {
     chat      : ['read', 'post'],
     user      : ['read'],
     statistics: true // has access to all statistics
   });
```

## Using the `allowed` attribute

```html
<messages allowed="{chat: ['read', 'post']}"></messages>
```

And you are **done**!

You can also use the view model instead if you prefer.

## View Model option

Implement acl in your view model.

```js
import {Acl} from 'aurelia-acl';

@inject(Acl)
export class Page {
  constructor(acl) {
    this.isAllowed = permission => acl.isAllowed(permission);
  }
}
```

Now tell the view to only render the element if it has `read` and `post` permissions for `chat`.

```html
  <messages if.bind="isAllowed({chat: ['read', 'post']})"></messages>
```
