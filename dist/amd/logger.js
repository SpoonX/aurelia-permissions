define(['exports', 'aurelia-logging'], function (exports, _aureliaLogging) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.logger = undefined;

  var logger = (0, _aureliaLogging.getLogger)('aurelia-acl');

  exports.logger = logger;
});