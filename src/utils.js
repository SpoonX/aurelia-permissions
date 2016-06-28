/* leverage existing libraries instead of writing them myself */
export exists         from 'existy';
import isObject       from 'is-object';
export isBoolean      from 'is-boolean';
export isString       from 'is-string';
export isFunction     from 'is-function';
export extend         from 'extend';

export function isSubset(a, b) {
  if (isObject(a) && isObject(b)) {
    for (let key in b) {
      if (!isSubset(a[key], b[key])) {
        return false;
      }
    }
    return true;
  }
  return (a === b);
}

export {
  isObject
};
