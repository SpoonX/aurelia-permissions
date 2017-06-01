import {getLogger} from 'aurelia-logging';
import {inject,Optional} from 'aurelia-dependency-injection';
import {customAttribute,Animator} from 'aurelia-templating';
import {DOM} from 'aurelia-pal';

export declare class Acl {
  permissions: any;
  
  /**
     * Set the permissions object with new permissions
     *
     * @param {object} permissions
     *
     * @chainable
     */
  setPermissions(permissions?: any): any;
  
  /**
     * @param {*} resource used to reference the permissions
     * @param {*} rules used to set the value of the resource
     *
     * @chainable
     */
  permit(resource?: any, rules?: any): any;
  
  /**
     * Return true when the resource has the desired permissions
     *
     * @param {*} resource used to reference the permissions
     * @param {*} rules used to set the value of the resource
     *
     * @returns {boolean}
     */
  isAllowed(resource?: any, action?: any): any;
}
export declare {
  logger
};
export declare class Acl {
  permissions: any;
  
  /**
     * Set the permissions object with new permissions
     *
     * @param {object} permissions
     *
     * @chainable
     */
  setPermissions(permissions?: any): any;
  
  /**
     * @param {*} resource used to reference the permissions
     * @param {*} rules used to set the value of the resource
     *
     * @chainable
     */
  permit(resource?: any, rules?: any): any;
  
  /**
     * Return true when the resource has the desired permissions
     *
     * @param {*} resource used to reference the permissions
     * @param {*} rules used to set the value of the resource
     *
     * @returns {boolean}
     */
  isAllowed(resource?: any, action?: any): any;
}
export declare function configure(aurelia?: any, config?: any): any;

/**
* Binding to conditionally show markup in the DOM based on the value.
* - different from "if" in that the markup is still added to the DOM, simply not shown.
*/
export declare class Allowed {
  
  /**
    * Creates a new instance of Hide.
    * @param element Target element to conditionally hide.
    * @param animator The animator that conditionally adds or removes the aurelia-hide css class.
    * @param domBoundary The DOM boundary. Used when the behavior appears within a component that utilizes the shadow DOM.
    */
  constructor(element?: any, animator?: any, domBoundary?: any, acl?: any);
  
  /**
    * Invoked everytime the bound value changes.
    * @param newValue The new value.
    */
  valueChanged(newValue?: any): any;
  
  /**
    * Binds the Hide attribute.
    */
  bind(bindingContext?: any): any;
}
export declare {
  logger
};
/**
* Binding to conditionally show markup in the DOM based on the value.
* - different from "if" in that the markup is still added to the DOM, simply not shown.
*/
export declare class Allowed {
  
  /**
    * Creates a new instance of Hide.
    * @param element Target element to conditionally hide.
    * @param animator The animator that conditionally adds or removes the aurelia-hide css class.
    * @param domBoundary The DOM boundary. Used when the behavior appears within a component that utilizes the shadow DOM.
    */
  constructor(element?: any, animator?: any, domBoundary?: any, acl?: any);
  
  /**
    * Invoked everytime the bound value changes.
    * @param newValue The new value.
    */
  valueChanged(newValue?: any): any;
  
  /**
    * Binds the Hide attribute.
    */
  bind(bindingContext?: any): any;
}