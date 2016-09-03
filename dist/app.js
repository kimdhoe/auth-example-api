'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _middlewares = require('./middlewares');

var _middlewares2 = _interopRequireDefault(_middlewares);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _router = require('./auth/router');

var _router2 = _interopRequireDefault(_router);

var _logger = require('./util/logger');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

(0, _middlewares2.default)(app);

app.use('/api', _api2.default);
app.use('/auth', _router2.default);

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') return res.status(401).send('Invalid token');

  (0, _logger.logError)(err.stack);

  res.status(500).send('Something went wrong.');
});

exports.default = app;