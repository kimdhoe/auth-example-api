'use strict';

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _logger = require('./util/logger');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_app2.default.listen(_config2.default.port, function () {
          return (0, _logger.logInfo)('Listening on port ' + _config2.default.port + '.');
});