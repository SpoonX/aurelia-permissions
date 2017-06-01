'use strict';

System.register(['aurelia-logging', 'aurelia-dependency-injection', 'aurelia-templating', 'aurelia-pal'], function (_export, _context) {
  "use strict";

  var getLogger, inject, Optional, customAttribute, Animator, DOM, _dec, _dec2, _class2, _typeof, logger, Acl, Allowed;

  

  function configure(aurelia, config) {
    aurelia.globalResources('./attribute/allowed');

    if (!config) {
      return;
    }

    var acl = aurelia.container.get(Acl);

    if ((typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object') {
      acl.setPermissions(config);
    }

    if (typeof config === 'function') {
      config(acl);
    }
  }

  _export('configure', configure);

  return {
    setters: [function (_aureliaLogging) {
      getLogger = _aureliaLogging.getLogger;
    }, function (_aureliaDependencyInjection) {
      inject = _aureliaDependencyInjection.inject;
      Optional = _aureliaDependencyInjection.Optional;
    }, function (_aureliaTemplating) {
      customAttribute = _aureliaTemplating.customAttribute;
      Animator = _aureliaTemplating.Animator;
    }, function (_aureliaPal) {
      DOM = _aureliaPal.DOM;
    }],
    execute: function () {
      _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };

      _export('logger', logger = getLogger('aurelia-acl'));

      _export('logger', logger);

      _export('Acl', Acl = function () {
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
      }());

      _export('Acl', Acl);

      _export('Allowed', Allowed = (_dec = customAttribute('allowed'), _dec2 = inject(DOM.Element, Animator, Optional.of(DOM.boundary, true), Acl), _dec(_class2 = _dec2(_class2 = function () {
        function Allowed(element, animator, domBoundary, acl) {
          

          this.acl = acl;
          this.element = element;
          this.animator = animator;
          this.domBoundary = domBoundary;
        }

        Allowed.prototype.valueChanged = function valueChanged(newValue) {
          if (this.acl.isAllowed(newValue)) {
            this.animator.removeClass(this.element, 'aurelia-hide');
          } else {
            this.animator.addClass(this.element, 'aurelia-hide');
          }
        };

        Allowed.prototype.bind = function bind(bindingContext) {
          this.valueChanged(this.value);
        };

        return Allowed;
      }()) || _class2) || _class2));

      _export('Allowed', Allowed);
    }
  };
});