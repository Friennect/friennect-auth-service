"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _config = _interopRequireDefault(require("./config"));

var _db = _interopRequireDefault(require("./db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var sequelize = _db["default"].sequelize;

var configure = function configure(cb) {
  cb(_morgan["default"], _express["default"]);
};

var app = (0, _express["default"])();
configure((0, _config["default"])(app));
app.listen(process.env.PORT,
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee() {
  var s;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log("Express server is running");

          if (!(process.env.NODE_ENV !== "test")) {
            _context.next = 6;
            break;
          }

          _context.next = 4;
          return sequelize.sync({});

        case 4:
          s = _context.sent;
          if (s) console.log("Sequelize connected to db");

        case 6:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}))); // Export app for tests

var _default = app;
exports["default"] = _default;