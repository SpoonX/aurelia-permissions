import {Acl} from '../../src/acl.js';

describe('Acl', () => {

  let acl;
  beforeEach(() => {
    acl = new Acl();
  });

  it('permissions can be set in mysterious ways', () => {
    let permissions = {
      'user': 'read',
      'admin': [{all: true }],
      'super': ['all', 'more'],
    };
    expect(acl.set(permissions)).not.toBe(permissions);
    let perms = acl.permissions;
    expect(perms.user.read).toBe(true);
    expect(perms.admin.all).toBe(true);
    expect(perms.super.all).toBe(true);
    expect(perms.super.more).toBe(true);
  });

  it('can add additional permissions', () => {
    acl.set({a: true });
    let grantPerms = {b: true };
    expect(acl.grant(grantPerms)).toEqual({a: true, b: true});
  });

  it('can revoke permissions', () => {
    acl.set({a: true});
    expect(acl.revoke({a: true})).toEqual({a: false});
  });

  it('can check if permissions are granted' , () => {
    let can = acl.isAllowed.bind(acl);

    acl.set({
      a: true,
      b: false,
      c: ['a'],
      d: {
        a: true,
        b: {
          a: true
        },
        c: false
      }
    });

    expect(can(['a'])).toBe(true);
    expect(can(['b'])).not.toBe(true);
    expect(can({b: false})).toBe(true);

    /* now for nested permississions */

    expect(can({d: ['a']})).toBe(true);
    expect(can({d: {c: false}})).toBe(true);
    expect(can({d: {b: ['a']}})).toBe(true);
    expect(can({d: {b: {a: false}}})).toBe(false);

  });

});
