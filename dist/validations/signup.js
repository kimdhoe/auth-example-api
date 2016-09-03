'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validate = function validate(_ref) {
  var username = _ref.username;
  var email = _ref.email;
  var password = _ref.password;
  var passwordConfirmation = _ref.passwordConfirmation;

  var errors = {};

  if (_validator2.default.isNull(username)) errors.username = '이름이 필요합니다.';

  if (!_validator2.default.isEmail(email)) errors.email = '이메일 주소가 올바르지 않습니다.';

  if (_validator2.default.isNull(email)) errors.email = '이메일 주소가 필요합니다.';

  if (_validator2.default.isNull(password)) errors.password = '암호가 필요합니다.';

  if (_validator2.default.isNull(passwordConfirmation)) errors.passwordConfirmation = '암호 확인이 필요합니다.';

  if (!_validator2.default.equals(password, passwordConfirmation)) errors.passwordConfirmation = '암호와 암호확인이 일치하지 않습니다.';

  return { errors: errors,
    isValid: (0, _isEmpty2.default)(errors)
  };
};

exports.default = validate;