import {AclManager} from './acl-manager';
import {exists} from './utils';

export function configure(aurelia, config) {
  if (!exists(config)) {
    return;
  }

  let aclManager = aurelia.container.get(AclManager);

  if (typeof config === 'object') {
    for (let key of Object.keys(config)) {
      registerAclInstance(aclManager, key, config[key]);
    }
  } else if (typeof config === 'function') {
    config(aclManager);
  }
}

function registerAclInstance(aclManager, instance, privs) {
  aclManager.set(instance, ...privs);
}

export {
  AclManager
};
