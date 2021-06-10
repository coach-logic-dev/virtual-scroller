"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = log;
exports.isDebug = isDebug;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function log() {
  if (isDebug()) {
    var _console;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    (_console = console).log.apply(_console, _toConsumableArray(['[virtual-scroller]'].concat(args)));
  }
}

function isDebug() {
  return typeof window !== 'undefined' && window.VirtualScrollerDebug;
}
//# sourceMappingURL=log.js.map