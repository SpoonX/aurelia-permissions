/* leverage existing libraries instead of writing them myself */

export contains from 'array-contains-all';
import removeArrayItem from 'remove-array-item';
export exists from 'existy';

/**
 * removes the items from the b array from the a array
 *
 * @param {*[]} a
 * @param {*[]} b
 *
 * @returns {*[]}
 */
export function arraySubtract(a, b) {
  return removeArrayItem.call(this, a, ...b);
}
