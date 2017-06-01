export let Acl = class Acl {
  constructor() {
    this.permissions = {};
  }

  setPermissions(permissions) {
    this.permissions = {};

    for (let resource in permissions) {
      if (!permissions.hasOwnProperty(resource)) {
        continue;
      }

      this.permit(resource, permissions[resource]);
    }

    return this;
  }

  permit(resource, rules) {
    if (!this.permissions[resource]) {
      this.permissions[resource] = {};
    }

    switch (true) {

      case typeof rules === 'string':
        this.permissions[resource][rules] = true;
        break;

      case ['boolean', 'object'].indexOf(typeof rules) > -1 && !Array.isArray(rules):
        this.permissions[resource] = rules;
        break;

      case Array.isArray(rules):
        rules.forEach(rule => {
          this.permissions[resource][rule] = true;
        });
        break;

      default:
        throw new Error('Invalid rule type supplied. Expected one of string, boolean or object.');
    }

    return this;
  }

  isAllowed(resource, action) {
    if (typeof resource === 'object') {
      return Object.getOwnPropertyNames(resource).every(resourceName => {
        return this.isAllowed(resourceName, resource[resourceName]);
      });
    }

    if (!Array.isArray(action)) {
      return !!(this.permissions[resource] === true || typeof this.permissions[resource] === 'object' && this.permissions[resource][action]);
    }

    return action.every(actionName => {
      return this.isAllowed(resource, actionName);
    });
  }
};