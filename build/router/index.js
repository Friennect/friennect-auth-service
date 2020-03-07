"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _auth = _interopRequireDefault(require("./auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.get("/", function (req, res) {
  res.status(200).json({
    statusCode: 200,
    body: "Welcome to the Friennect Auth API",
    routes: {
      prefix: "/api/v1"
    }
  });
});
router.use("/auth", _auth["default"]);
var _default = router;
exports["default"] = _default;