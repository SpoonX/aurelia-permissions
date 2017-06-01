var _dec, _dec2, _class2;

import { getLogger } from 'aurelia-logging';
import { inject, Optional } from 'aurelia-dependency-injection';
import { customAttribute, Animator } from 'aurelia-templating';
import { DOM } from 'aurelia-pal';

const logger = getLogger('aurelia-acl');

export { logger };

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

export function configure(aurelia, config) {
  aurelia.globalResources('./attribute/allowed');

  if (!config) {
    return;
  }

  let acl = aurelia.container.get(Acl);

  if (typeof config === 'object') {
    acl.setPermissions(config);
  }

  if (typeof config === 'function') {
    config(acl);
  }
}

export let Allowed = (_dec = customAttribute('allowed'), _dec2 = inject(DOM.Element, Animator, Optional.of(DOM.boundary, true), Acl), _dec(_class2 = _dec2(_class2 = class Allowed {
  constructor(element, animator, domBoundary, acl) {
    this.acl = acl;
    this.element = element;
    this.animator = animator;
    this.domBoundary = domBoundary;
  }

  valueChanged(newValue) {
    if (this.acl.isAllowed(newValue)) {
      this.animator.removeClass(this.element, 'aurelia-hide');
    } else {
      this.animator.addClass(this.element, 'aurelia-hide');
    }
  }

  bind(bindingContext) {
    this.valueChanged(this.value);
  }
}) || _class2) || _class2);