import {AclManager} from '../../src/acl-manager';
import {AclInstance} from '../../src/acl-instance';
import {logger} from '../../src/logger';

describe('acl-manager', () => {

  let aclManager;
  let aclInstance;

  beforeEach(() => {
    aclManager = new AclManager();
    aclInstance = aclManager.instance('user');
  });

  it('has the desired methods', () => {
    const methods = ['set', 'grant', 'has', 'revoke', 'get'];
    expect(Object.keys(aclManager)).toEqual(jasmine.arrayContaining(methods));
  });

  it('creates instances when not defined', () => {
    expect(aclManager.instance('test').constructor).toBe(AclInstance);
  });

  it('grant', () => {
    expect(aclInstance.grant('a')).toEqual(['a']);
    expect(aclInstance.grant('b', 'c')).toEqual(['a', 'b', 'c']);
  });

  it('revoke', () => {
    expect(aclInstance.grant('a', 'b', 'c')).toEqual(['a', 'b', 'c']);
    expect(aclInstance.revoke('a')).toEqual(['b', 'c']);
  });

  it('revoke non existant privs', () => {
    /* could check if logger warns */
    expect(aclInstance.grant('b', 'c')).toEqual(['b', 'c']);
    expect(aclInstance.revoke('a')).toEqual(['b', 'c']);
  });

  it('set', () => {
    expect(aclInstance.grant('a')).toEqual(['a']);
    expect(aclInstance.set('a', 'b', 'c')).toEqual(['a', 'b', 'c']);
  });

  it('has', () => {
    expect(aclInstance.has('a')).toBe(false);
    aclInstance.grant('a');
    expect(aclInstance.has('a')).toBe(true);
    expect(aclInstance.has('a', 'b')).toBe(false);
    aclInstance.grant('b');
    expect(aclInstance.has('a', 'b')).toBe(true);
  });

  it('get', () => {
    expect(aclInstance.get()).toEqual([]);
    aclInstance.set('a', 'b');
    expect(aclInstance.get()).toEqual(['a', 'b']);
  });

  it('has priv of undefined instance', () => {
    expect(aclManager.has('undefined', 'undefined')).toBe(false);
  });

  it('* priv', () => {
    aclInstance.set('*');
    expect(aclInstance.has('something')).toBe(true);
  });

});
