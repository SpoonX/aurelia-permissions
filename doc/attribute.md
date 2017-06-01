# Custom Attribute: allowed

The `allowed` attribute can be used to show or hide an element based on the user's permission directly on the
targeted element.

Imagine a tool that can be used by different types of users. For this example, we have a `customer` and a `accountant`.
We don't want a customer to have the same access level as an accountant, so we define some basic permissions:

```js
  ajax.get( '/user', user => {
    acl.permit('user', 'products');

    if (user.type === 'accountant') {
      acl.permit('user', 'statistics');
    }
  });
```

With the permissions set, we can use the `allowed` attribute to show only what the user has permission to access.

```html
  <products allowed="{user: 'products'}'"></products>

  <statistics allowed="{user: 'statistics'}"></statistics>
```

If the permissions were correctly set, only an accountant will be able to see the statistics.
