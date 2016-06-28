import {configure} from '../../src/aurelia-acl';
import {AclManager} from '../../src/acl-manager';

describe('configure', () => {

  let aurelia;
  let aclManager;

  beforeEach(() => {
    /* mock aurelia.container.get*/
    aurelia = {container: {get: (Constructor) => {
      aclManager = new Constructor();
      return aclManager;
    }}};
  });

  it('does not require a config', () => {
    configure(aurelia);
  });

  it('accepts a function', () => {
    let config = acl => {
      aclManager = acl;
      acl.grant('user', 'all');
    };
    configure(aurelia, config);
    expect(aclManager.get('user')).toEqual(['all']);
  });

  it('accpets an object', () => {
    let config = {
      user: ['all'],
      admin: ['foo']
    };
    configure(aurelia, config);
    expect(aclManager.get('user')).toEqual(['all']);
    expect(aclManager.get('admin')).toEqual(['foo']);
  });

});
