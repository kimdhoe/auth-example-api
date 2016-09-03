'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _methodOverride = require('method-override');

var _methodOverride2 = _interopRequireDefault(_methodOverride);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// effect - Installs application-wide middlewares into the given app.
var installAppMiddlewares = function installAppMiddlewares(app) {
  app.use(_bodyParser2.default.urlencoded({ extended: true }));
  app.use(_bodyParser2.default.json());
  app.use((0, _cors2.default)());
  app.use((0, _methodOverride2.default)());
  app.use((0, _morgan2.default)('dev'));
};

exports.default = installAppMiddlewares;