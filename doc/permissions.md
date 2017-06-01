# Permissions

A permission in aurelia-acl can be set using strings, arrays or objects.
The idea is to have a flexible way of granting, revoking and checking for
permissions. Aurelia acl support *nested* permissions, meaning one can put
objects or strings in arrays and arrays in object's properties. This leaves it
up to you to choose what best fits your project's needs.

## Object

Describing permissions using purely an object is done like this.

```js

let userPermissions = {
  messages: {
    read: true,
    write: true,
    delete: false
  }
};

```

> Internally aurelia acl will normalize objects. Meaning that truthy values
> become true and otherwise false. It also converts arrays and strings to
> objects with boolean values.

## Array

Defining the same permissions as above using an array.

```js

let userPermissions = {
  messages: ['read', 'write', 'delete']
};

```

This array is normalized to the same shape as the example above.

## String

You can also use strings, if you prefer not to nest your permissions.

```js
let userPermissions = 'messages';
```
