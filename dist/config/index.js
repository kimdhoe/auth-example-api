'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// A NodeEnv is one of:
var DEVELOPMENT = 'development';
var TESTING = 'testing';
var PRODUCTION = 'production';

// state - Base configurations.
var base = { env: '',
  port: process.env.PORT || 8080,
  secrets: { jwt: process.env.JWT || 'secretiamlookingforajob' },
  expireIn: '7 days'
};

process.env.NODE_ENV = process.env.NODE_ENV || DEVELOPMENT;
base.env = process.env.NODE_ENV;

// Environment specific configurations.
var envConfig = {};
try {
  envConfig = require('./' + base.env);
} catch (e) {
  console.log('No configuration file for ' + base.env);
}

var config = _extends({}, base, envConfig);

exports.default = config;