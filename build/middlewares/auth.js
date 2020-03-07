"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _db = _interopRequireDefault(require("../db"));

var _helpers = _interopRequireDefault(require("../helpers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Token = _db["default"].Token,
    Auth = _db["default"].Auth;
var Keys = _helpers["default"].Keys,
    Jwt = _helpers["default"].Jwt;

var AuthMiddleware =
/*#__PURE__*/
function () {
  function AuthMiddleware() {
    _classCallCheck(this, AuthMiddleware);
  }

  _createClass(AuthMiddleware, null, [{
    key: "checkKeysPresent",
    value: function () {
      var _checkKeysPresent = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res, next) {
        var body;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                body = req.body;

                if (Keys.arePresent(body, ["email", "password"])) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return", res.status(400).json({
                  statusCode: 400,
                  body: "Missing required keys"
                }));

              case 4:
                next();
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                res.status(500).json({
                  statusCode: 500,
                  body: _context.t0
                });

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 7]]);
      }));

      function checkKeysPresent(_x, _x2, _x3) {
        return _checkKeysPresent.apply(this, arguments);
      }

      return checkKeysPresent;
    }()
  }, {
    key: "checkIfUserExists",
    value: function () {
      var _checkIfUserExists = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res, next) {
        var email, _user;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                email = req.body.email;
                _context2.next = 4;
                return Auth.findByEmail(email);

              case 4:
                _user = _context2.sent;

                if (!_user) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt("return", res.status(400).json({
                  statusCode: 400,
                  body: "Email already in use."
                }));

              case 7:
                next();
                _context2.next = 13;
                break;

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2["catch"](0);
                res.status(500).json({
                  statusCode: 500,
                  body: _context2.t0
                });

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 10]]);
      }));

      function checkIfUserExists(_x4, _x5, _x6) {
        return _checkIfUserExists.apply(this, arguments);
      }

      return checkIfUserExists;
    }()
  }, {
    key: "checkToken",
    value: function () {
      var _checkToken = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res, next) {
        var authorization, _token, _payload, _loggedOut, _user;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                authorization = req.headers.authorization;

                if (authorization) {
                  _context3.next = 4;
                  break;
                }

                return _context3.abrupt("return", res.status(401).json({
                  statusCode: 401,
                  body: "Authorization header not present in request."
                }));

              case 4:
                if (authorization.startsWith("Bearer")) {
                  _context3.next = 6;
                  break;
                }

                return _context3.abrupt("return", res.status(401).json({
                  statusCode: 401,
                  body: "Authorization header must begin with 'Bearer' string."
                }));

              case 6:
                _token = authorization.substring(7, authorization.length);

                if (!(!_token || _token.trim().length === 0)) {
                  _context3.next = 9;
                  break;
                }

                return _context3.abrupt("return", res.status(401).json({
                  statusCode: 401,
                  body: "Token is not present in authorization header."
                }));

              case 9:
                _payload = Jwt.decode(_token);

                if (_payload) {
                  _context3.next = 12;
                  break;
                }

                return _context3.abrupt("return", res.status(401).json({
                  statusCode: 401,
                  body: "Expired or malformed Jwt found in authorization header."
                }));

              case 12:
                _context3.next = 14;
                return Token.findByActual(_token);

              case 14:
                _loggedOut = _context3.sent;

                if (!_loggedOut) {
                  _context3.next = 17;
                  break;
                }

                return _context3.abrupt("return", res.status(401).json({
                  statusCode: 401,
                  body: "Only logged in users can access this resource."
                }));

              case 17:
                _context3.next = 19;
                return Auth.findByPk(_payload.id);

              case 19:
                _user = _context3.sent;
                req._user = _user;
                req._token = _token;
                next();
                _context3.next = 28;
                break;

              case 25:
                _context3.prev = 25;
                _context3.t0 = _context3["catch"](0);
                res.status(500).json({
                  statusCode: 500,
                  body: _context3.t0
                });

              case 28:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 25]]);
      }));

      function checkToken(_x7, _x8, _x9) {
        return _checkToken.apply(this, arguments);
      }

      return checkToken;
    }()
  }]);

  return AuthMiddleware;
}();

exports["default"] = AuthMiddleware;