'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticate = exports.saveUser = exports.findUser = undefined;

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _find = require('lodash/find');

var _find2 = _interopRequireDefault(_find);

var _logger = require('../../util/logger');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// digest : string -> string
// Hashes a given string using bcrypt.
var digest = function digest(s) {
  return _bcrypt2.default.hashSync(s, 10);
};

// type User = { id:              string
//             , username:        string
//             , email:           string
//             , password_digest: string
//             }

// users : Array<User>
// state - User DB.
var users = [{ id: 'ByKT4GPs',
  username: 'guest',
  email: 'guest@example.com',
  password_digest: digest('guest')
}];

// makeUser : string * string -> User
// Produces a user.
var makeUser = function makeUser(username, email, password_digest) {
  return { id: _shortid2.default.generate(),
    username: username,
    email: email,
    password_digest: password_digest
  };
};

// findUser : string -> User or undefined
// effect - Finds a user with the given information in users DB.
// e.g. findUser({ username: 'foo' })
var findUser = exports.findUser = function findUser(info) {
  return (0, _find2.default)(users, info);
};

// saveUser : string * string -> void
// effect - saves a new user with the given name and password to users db.
var saveUser = exports.saveUser = function saveUser(_ref) {
  var username = _ref.username;
  var email = _ref.email;
  var password = _ref.password;

  var newUser = makeUser(username, email, digest(password));

  users.push(newUser);

  (0, _logger.logInfo)('saved a new user:');
  (0, _logger.logInfo)(newUser);
};

// authenticate : User * string -> boolean
// Is a given password correct?
var authenticate = exports.authenticate = function authenticate(user, password) {
  return _bcrypt2.default.compareSync(password, user.password_digest);
};