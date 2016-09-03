'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = undefined;

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _signup = require('../../validations/signup');

var _signup2 = _interopRequireDefault(_signup);

var _model = require('./model');

var _logger = require('../../util/logger');

var _auth = require('../../auth/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateUser = function validateUser(user) {
  var _validate = (0, _signup2.default)(user);

  var errors = _validate.errors;


  if ((0, _model.findUser)({ username: user.username })) errors.username = '이미 사용 중인 이름입니다.';

  if ((0, _model.findUser)({ email: user.email })) errors.email = '이미 사용 중인 이메일 주소입니다.';

  return { errors: errors,
    isValid: (0, _isEmpty2.default)(errors)
  };
};

var create = exports.create = function create(req, res, next) {
  var _validateUser = validateUser(req.body);

  var errors = _validateUser.errors;
  var isValid = _validateUser.isValid;


  if (isValid) {
    try {
      (0, _model.saveUser)(req.body);
    } catch (e) {
      (0, _logger.logError)(e);
      return res.status(500).json({ error: e });
    }

    // 사용자 등록 성공시 바로 토큰을 보냅니다.

    var _findUser = (0, _model.findUser)({ username: req.body.username });

    var id = _findUser.id;
    var username = _findUser.username;

    var token = (0, _auth.signToken)(id);

    res.json({ token: token, username: username });
  } else res.status(400).json(errors);
};