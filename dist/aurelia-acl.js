import {getLogger} from 'aurelia-logging';
import {inject,Optional} from 'aurelia-dependency-injection';
import {customAttribute,Animator} from 'aurelia-templating';
import {DOM} from 'aurelia-pal';


const logger = getLogger('aurelia-acl');

export {logger};

export class Acl {
  permissions = {};

  /**
   * Set the permissions object with new permissions
   *
   * @param {object} permissions
   *
   * @chainable
   */
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

  /**
   * @param {*} resource used to reference the permissions
   * @param {*} rules used to set the value of the resource
   *
   * @chainable
   */
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

  /**
   * Return true when the resource has the desired permissions
   *
   * @param {*} resource used to reference the permissions
   * @param {*} rules used to set the value of the resource
   *
   * @returns {boolean}
   */
  isAllowed(resource, action) {
    if (typeof resource === 'object') {
      return Object.getOwnPropertyNames(resource).every(resourceName => {
        return this.isAllowed(resourceName, resource[resourceName]);
      });
    }

    if (!Array.isArray(action)) {
      return !!(this.permissions[resource] === true || (typeof this.permissions[resource] === 'object' && this.permissions[resource][action]));
    }

    return action.every(actionName => {
      return this.isAllowed(resource, actionName);
    });
  }
}

export function configure(aurelia, config) {
  aurelia.globalResources('./attribute/allowed');

  if (!config) {
    return; /* do nothing if config is falsy */
  }

  let acl = aurelia.container.get(Acl);

  if (typeof config === 'object') {
    acl.setPermissions(config);
  }

  if (typeof config === 'function') {
    config(acl);
  }
}

/**
* Binding to conditionally show markup in the DOM based on the value.
* - different from "if" in that the markup is still added to the DOM, simply not shown.
*/
@customAttribute('allowed')
@inject(DOM.Element, Animator, Optional.of(DOM.boundary, true), Acl)
export class Allowed {

  /**
  * Creates a new instance of Hide.
  * @param element Target element to conditionally hide.
  * @param animator The animator that conditionally adds or removes the aurelia-hide css class.
  * @param domBoundary The DOM boundary. Used when the behavior appears within a component that utilizes the shadow DOM.
  */
  constructor(element, animator, domBoundary, acl) {
    this.acl         = acl;
    this.element     = element;
    this.animator    = animator;
    this.domBoundary = domBoundary;
  }

  /**
  * Invoked everytime the bound value changes.
  * @param newValue The new value.
  */
  valueChanged(newValue) {
    if (this.acl.isAllowed(newValue)) {
      this.animator.removeClass(this.element, 'aurelia-hide');
    } else {
      this.animator.addClass(this.element, 'aurelia-hide');
    }
  }

  /**
  * Binds the Hide attribute.
  */
  bind(bindingContext) {
    this.valueChanged(this.value);
  }
}
