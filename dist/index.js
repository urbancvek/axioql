'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _queryModifier = require('./queryModifier');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AxioQL = function () {
  function AxioQL() {
    _classCallCheck(this, AxioQL);
  }

  _createClass(AxioQL, [{
    key: 'setQLEndpoint',
    value: function setQLEndpoint(endpoint) {
      this.endpoint = endpoint;
    }
  }, {
    key: 'setAuthHeader',
    value: function setAuthHeader(header) {
      this.authHeader = header;
    }
  }, {
    key: 'request',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { query: null, variables: null },
            query = _ref2.query,
            variables = _ref2.variables;

        var modifiedQuery, stringifiedVariables, response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (query) {
                  _context.next = 2;
                  break;
                }

                throw new Error('Query is required!');

              case 2:
                if (this.endpoint) {
                  _context.next = 4;
                  break;
                }

                throw new Error('Endpoint is required. Use AxioQL.setQLEndpoint(endpoint: string) method.');

              case 4:
                modifiedQuery = (0, _queryModifier.modifyQuery)(query);
                stringifiedVariables = JSON.stringify(variables);
                _context.prev = 6;
                _context.next = 9;
                return _axios2.default.post(this.endpoint, {
                  query: modifiedQuery,
                  variables: stringifiedVariables,
                  headers: {
                    Authorization: this.authHeader
                  }
                });

              case 9:
                response = _context.sent;
                return _context.abrupt('return', response);

              case 13:
                _context.prev = 13;
                _context.t0 = _context['catch'](6);
                throw _context.t0;

              case 16:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[6, 13]]);
      }));

      function request() {
        return _ref.apply(this, arguments);
      }

      return request;
    }()
  }]);

  return AxioQL;
}();

exports.default = new AxioQL();
