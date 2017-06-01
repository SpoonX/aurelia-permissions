'use strict';

exports.__esModule = true;

var _aureliaAcl = require('./aurelia-acl');

Object.keys(_aureliaAcl).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _aureliaAcl[key];
    }
  });
});