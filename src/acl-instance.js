import {arraySubtract, contains} from './utils';

export class AclInstance {

  privs  = [];
  set    = set;
  grant  = grant;
  has    = has;
  revoke = revoke;
  get    = get;

}

/**
 * @param {array} privs
 *
 * @returns {array}
 */
export function set(...privs) {
  this.privs = privs;
  return this.privs;
}

/**
 * @param {array} privs
 *
 * @returns {array}
 */
export function grant(...privs) {
  this.privs = this.privs.concat(privs);
  return this.privs;
}

/**
 * returns true when all the provided privs are part of the instance it's
 * privs. Also contains an exception which returns true when has the '*' priv.
 *
 * @param {array} privs
 *
 * @returns {boolean} true when contains all privs
 */
export function has(...privs) {
  return contains(this.privs, ['*']) ? true : contains(this.privs, privs);
}

/**
 * remove privs from the instance
 *
 * @param {array} privs
 *
 * @returns {array}
 */
export function revoke(...privs) {
  this.privs = arraySubtract(this.privs, privs);
  return this.privs;
}

/**
 * remove privs from the instance
 *
 * @returns {array}
 */
export function get() {
  return this.privs;
}
