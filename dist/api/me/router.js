'use strict';

Object.defineProperty(exports, "__esModule", {
       value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _auth = require('../../auth/auth');

var _controller = require('./controller');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', (0, _auth.decodeToken)(), (0, _auth.getUser)(), _controller.show);

exports.default = router;