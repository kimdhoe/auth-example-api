'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _router = require('./user/router');

var _router2 = _interopRequireDefault(_router);

var _router3 = require('./protected/router');

var _router4 = _interopRequireDefault(_router3);

var _router5 = require('./me/router');

var _router6 = _interopRequireDefault(_router5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use('/users', _router2.default);
router.use('/protected', _router4.default);
router.use('/me', _router6.default);

exports.default = router;