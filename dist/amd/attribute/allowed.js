define(['exports', 'aurelia-dependency-injection', 'aurelia-templating', 'aurelia-pal', '../acl'], function (exports, _aureliaDependencyInjection, _aureliaTemplating, _aureliaPal, _acl) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Allowed = undefined;

  

  var _dec, _dec2, _class;

  var Allowed = exports.Allowed = (_dec = (0, _aureliaTemplating.customAttribute)('allowed'), _dec2 = (0, _aureliaDependencyInjection.inject)(_aureliaPal.DOM.Element, _aureliaTemplating.Animator, _aureliaDependencyInjection.Optional.of(_aureliaPal.DOM.boundary, true), _acl.Acl), _dec(_class = _dec2(_class = function () {
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
  }()) || _class) || _class);
});