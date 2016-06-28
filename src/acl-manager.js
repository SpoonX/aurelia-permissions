import {exists} from './utils';
import * as AclInstance from './acl-instance';

/* only stores the existing acl instances or creates them when not defined */
export class AclManager {

  instances = {};

  constructor() {
    /* the methods defined on acl instance, used to create convenience methods on
     * the AclManager */
    const methods = ['set', 'grant', 'has', 'revoke', 'get'];

    methods.forEach(method => {
      this[method] = (namespace, ...privs) => {
        return this.instance(namespace)[method](...privs);
      };
    });
  }

  instance(namespace) {
    if (!exists(this.instances[namespace])) {
      this.instances[namespace] = new AclInstance.AclInstance();
    }
    return this.instances[namespace];
  }

}
