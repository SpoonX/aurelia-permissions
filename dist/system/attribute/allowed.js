'use strict';

System.register(['aurelia-dependency-injection', 'aurelia-templating', 'aurelia-pal', '../acl'], function (_export, _context) {
  "use strict";

  var inject, Optional, customAttribute, Animator, DOM, Acl, _dec, _dec2, _class, Allowed;

  

  return {
    setters: [function (_aureliaDependencyInjection) {
      inject = _aureliaDependencyInjection.inject;
      Optional = _aureliaDependencyInjection.Optional;
    }, function (_aureliaTemplating) {
      customAttribute = _aureliaTemplating.customAttribute;
      Animator = _aureliaTemplating.Animator;
    }, function (_aureliaPal) {
      DOM = _aureliaPal.DOM;
    }, function (_acl) {
      Acl = _acl.Acl;
    }],
    execute: function () {
      _export('Allowed', Allowed = (_dec = customAttribute('allowed'), _dec2 = inject(DOM.Element, Animator, Optional.of(DOM.boundary, true), Acl), _dec(_class = _dec2(_class = function () {
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
      }()) || _class) || _class));

      _export('Allowed', Allowed);
    }
  };
});