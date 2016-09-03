'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = undefined;

var _auth = require('./auth');

// 사용자 정보로 토큰을 만들어 보냅니다.
var login = exports.login = function login(req, res) {
  var token = (0, _auth.signToken)(req.user.id);

  res.json({ token: token,
    username: req.user.username
  });
};