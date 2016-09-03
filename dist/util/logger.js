'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logError = exports.logInfo = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _colors = require('colors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// Given an array, console-logs the elements.
var logXs = function logXs(xs) {
  var _console;

  return (_console = console).log.apply(_console, _toConsumableArray(xs));
};

var consoleLog = _config2.default.shouldLog ? logXs : function () {};

// Logs colorful messages with a tag prefixed.
var logInfo = exports.logInfo = function logInfo() {
  for (var _len = arguments.length, xs = Array(_len), _key = 0; _key < _len; _key++) {
    xs[_key] = arguments[_key];
  }

  var tag = (0, _colors.green)('[* LOG *]');

  var format = function format(x) {
    return (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object' ? tag + '  ' + (0, _colors.cyan)(JSON.stringify(x, null, 2)) : tag + '  ' + (0, _colors.cyan)(x);
  };

  consoleLog(xs.map(format));
};

// Logs colorful error messages with a tag prefixed.
var logError = exports.logError = function logError() {
  for (var _len2 = arguments.length, es = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    es[_key2] = arguments[_key2];
  }

  var format = function format(e) {
    e = e.stack || e;
    var name = e.name || 'ERR';
    var tag = (0, _colors.yellow)('[* ' + name + ' *]');

    return tag + '  ' + (0, _colors.red)(e);
  };

  consoleLog(es.map(format));
};