define(['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  

  var Acl = exports.Acl = function () {
    function Acl() {
      

      this.permissions = {};
    }

    Acl.prototype.setPermissions = function setPermissions(permissions) {
      this.permissions = {};

      for (var resource in permissions) {
        if (!permissions.hasOwnProperty(resource)) {
          continue;
        }

        this.permit(resource, permissions[resource]);
      }

      return this;
    };

    Acl.prototype.permit = function permit(resource, rules) {
      var _this = this;

      if (!this.permissions[resource]) {
        this.permissions[resource] = {};
      }

      switch (true) {

        case typeof rules === 'string':
          this.permissions[resource][rules] = true;
          break;

        case ['boolean', 'object'].indexOf(typeof rules === 'undefined' ? 'undefined' : _typeof(rules)) > -1 && !Array.isArray(rules):
          this.permissions[resource] = rules;
          break;

        case Array.isArray(rules):
          rules.forEach(function (rule) {
            _this.permissions[resource][rule] = true;
          });
          break;

        default:
          throw new Error('Invalid rule type supplied. Expected one of string, boolean or object.');
      }

      return this;
    };

    Acl.prototype.isAllowed = function isAllowed(resource, action) {
      var _this2 = this;

      if ((typeof resource === 'undefined' ? 'undefined' : _typeof(resource)) === 'object') {
        return Object.getOwnPropertyNames(resource).every(function (resourceName) {
          return _this2.isAllowed(resourceName, resource[resourceName]);
        });
      }

      if (!Array.isArray(action)) {
        return !!(this.permissions[resource] === true || _typeof(this.permissions[resource]) === 'object' && this.permissions[resource][action]);
      }

      return action.every(function (actionName) {
        return _this2.isAllowed(resource, actionName);
      });
    };

    return Acl;
  }();
});