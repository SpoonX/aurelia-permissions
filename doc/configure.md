## Configuration

You can configure your app permissions statically or dynamically.

### Statically, in your `main.js`

#### Passing in an object literal

```js
aurelia.use
   .plugin('aurelia-acl', {
     chat      : ['read', 'post'],
     statistics: true // has access to all statistics
   });
```

#### Chaining `.permit()`

```js
aurelia.use
   .plugin('aurelia-acl', acl => {
     acl.permit('chat', ['read', 'post'])
       .permit('statistics', true);
   });
```

### Dynamically, in your `app.js`

```js
userRequest.get('permissions').then(permissions => {
  this.acl.setPermissions(permissions);
});
```
