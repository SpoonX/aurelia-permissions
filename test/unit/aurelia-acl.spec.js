import {configure} from '../../src/aurelia-acl';
import {Acl} from '../../src/acl';

describe('configure', () => {

  let aurelia;
  let acl;

  beforeEach(() => {
    /* mock aurelia.container.get*/
    aurelia = {container: {get: (Constructor) => {
      acl = new Constructor();
      return acl;
    }},
    globalResources: () => {}};
  });

  it('does not require a config', () => {
    configure(aurelia);
  });

  it('accepts a function', () => {
    let config = acl => {
      acl = acl;
      acl.grant({user: 'all'});
    };
    configure(aurelia, config);
    expect(acl.permissions.user.all).toBe(true);
    expect(acl.isAllowed({user: 'all'})).toBe(true);
  });

  it('accepts an object', () => {
    let config = {
      user: ['all'],
      admin: ['foo']
    };
    configure(aurelia, config);
    expect(acl.permissions.user.all).toBe(true);
    expect(acl.permissions.admin.foo).toEqual(true);
  });
});
