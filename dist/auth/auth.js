'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signToken = exports.verifyUser = exports.getUser = exports.decodeToken = undefined;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _pick = require('lodash/pick');

var _pick2 = _interopRequireDefault(_pick);

var _model = require('../api/user/model');

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 토큰을 해독한 후, 사용자 ID를 request에 추가합니다.
var decodeToken = exports.decodeToken = function decodeToken() {
  return function (req, res, next) {
    // 토큰이 query에 들어있는 경우 header로 복사합니다.
    if (req.query && req.query.hasOwnProperty('access_token')) req.headers.authorization = 'Bearer ' + req.query.access_token;

    var token = '';

    if (req.headers.authorization) token = req.headers.authorization.split(' ')[1];

    if (token) {
      // 토큰을 해독한 후, 사용자 정보(id)를 request에 추가합니다.
      _jsonwebtoken2.default.verify(token, _config2.default.secrets.jwt, function (err, decoded) {
        if (err) res.status(401).send('사용자 인증에 실패했습니다.');else {
          req.user = decoded;
          next();
        }
      });
    } else {
      res.status(403).send('토큰이 필요합니다.');
    }
  };
};

// 토큰 해독에서 나온 사용자 정보를 DB에서 찾아온 정보로 대체합니다.
var getUser = exports.getUser = function getUser() {
  return function (req, res, next) {
    try {
      var user = (0, _model.findUser)({ id: req.user.id });

      if (!user) res.status(401).send('사용자 정보를 찾을 수 없습니다.');else {
        req.user = (0, _pick2.default)(user, ['id', 'username', 'email']);
        next();
      }
    } catch (e) {
      next(e);
    }
  };
};

// Verifies a user from a request body.
var verifyUser = exports.verifyUser = function verifyUser() {
  return function (req, res, next) {
    var _req$body = req.body;
    var identifier = _req$body.identifier;
    var password = _req$body.password;


    var user = (0, _model.findUser)({ username: identifier }) || (0, _model.findUser)({ email: identifier });

    if (!user) {
      res.status(401).json({ errors: { form: '정보가 올바르지 않습니다.' } });
    } else {
      if ((0, _model.authenticate)(user, password)) {
        req.user = user;
        next();
      } else {
        res.status(401).json({ errors: { form: '정보가 올바르지 않습니다.' } });
      }
    }
  };
};

// Given a user ID, generates a token.
var signToken = exports.signToken = function signToken(id) {
  return _jsonwebtoken2.default.sign({ id: id }, _config2.default.secrets.jwt, { expiresIn: _config2.default.expireTime });
};