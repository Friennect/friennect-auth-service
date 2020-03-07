"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _env = _interopRequireDefault(require("../env"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var jwt_secret = _env["default"].jwt_secret;

var Jwt =
/*#__PURE__*/
function () {
  function Jwt() {
    _classCallCheck(this, Jwt);
  }

  _createClass(Jwt, null, [{
    key: "sign",
    value: function sign(payload) {
      return _jsonwebtoken["default"].sign(payload, jwt_secret, {
        expiresIn: "3d"
      });
    }
  }, {
    key: "decode",
    value: function decode(token) {
      return _jsonwebtoken["default"].verify(token, jwt_secret);
    }
  }]);

  return Jwt;
}();

exports["default"] = Jwt;