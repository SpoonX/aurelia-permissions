import * as utils from '../../src/utils';

describe('utils', () => {


  it('contains desired functions', () => {
    expect(Object.keys(utils)).toEqual(
      jasmine.arrayContaining([
        'exists',
        'isObject',
        'isBoolean',
        'isString',
        'isFunction',
        'extend',
        'isSubset'
      ]
      ));
  });

});
