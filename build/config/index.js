"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _router = _interopRequireDefault(require("../router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(app) {
  return function (logger, _ref) {
    var json = _ref.json,
        urlencoded = _ref.urlencoded;
    app.use(json());
    app.use(urlencoded({
      extended: false
    }));
    app.use(logger("dev"));
    app.use("/api/v1", _router["default"]);
  };
};

exports["default"] = _default;