"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = require("sequelize");

var _models = _interopRequireDefault(require("./models"));

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var sequelize = new _sequelize.Sequelize(_config["default"][process.env.NODE_ENV]);
var db = {
  sequelize: sequelize
};
Object.keys(_models["default"]).forEach(function (key) {
  db[key] = _models["default"][key](sequelize, _sequelize.DataTypes);
});
var _default = db;
exports["default"] = _default;