"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _middlewares = _interopRequireDefault(require("../middlewares"));

var _controllers = _interopRequireDefault(require("../controllers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
var AuthController = _controllers["default"].AuthController;
var AuthMiddleware = _middlewares["default"].AuthMiddleware;
router.post("/", AuthMiddleware.checkKeysPresent, AuthMiddleware.checkIfUserExists, AuthController.signUp);
var _default = router;
exports["default"] = _default;