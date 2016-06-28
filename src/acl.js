import {isSubset, isBoolean, isObject, isString, extend} from './utils';

export class Acl {

  permissions = {};

  /**
   * reset the permissions object. Previously set permissions are removed
   *
   * @param {(array|object|string)[]} permissions
   *
   * @returns {object} the permissions object
   */
  set(permissions) {
    this.permissions = normalizedPermissions(permissions);
    return this.permissions;
  }

  /**
   * set the given permissions to true
   *
   * @param {(array|object|string)[]} permissions
   * @param {boolean} [revoke=false]
   *
   * @returns {object} the permissions object
   */
  grant(permissions, revoke = false) {
    this.permissions = extend(true, this.permissions, normalizedPermissions(permissions, revoke));
    return this.permissions;
  }

  /**
   * sets the given permissions to false
   *
   * @param {(array|object|string)[]} permissions
   *
   * @returns {boolean} true when all the permissions are true
   */
  revoke(permissions) {
    return this.grant(permissions, true);
  }

  /**
   * returns true when all the permissions are true/granted
   *
   * @param {(array|object|string)[]} permissions
   * @param {boolean} isNormalized when true it does not perform permissions
   * normalization
   *
   * @returns {boolean}
   */
  isAllowed(permissions) {
    return isSubset(this.permissions, normalizedPermissions(permissions));
  }
}

/**
 * Acl allows multiple formats for registering permissions. This function
 * normalizes it so the permissions are stored in a specific form for other
 * methods to work on.
 *
 * @param {(array|object|string)[]} permissions
 * @param {boolean} [revoke=false] when truthy sets the permissions to false
 *
 * @returns {object}
 *
 * @todo could make a package of this function names normalize-to-objects
 */
export function normalizedPermissions(permissions, revoke = false) {
  if (Array.isArray(permissions)) {
    let result = {};
    permissions.forEach(item => {
      result = extend(true, result, normalizedPermissions(item), revoke);
    });
    return result;
  }

  if (isObject(permissions)) {
    let result = {};
    let keys   = Object.keys(permissions);
    keys.forEach(key => {
      result[key] = normalizedPermissions(permissions[key], revoke);
    });
    return result;
  }

  if (isString(permissions)) {
    return {[permissions]: isGranted(permissions)};
  }

  if (isBoolean(permissions)) {
    return isGranted(permissions);
  }

  function isGranted(permission) {
    return revoke ? false : !!permission;
  }

  return permissions;
}
