"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _env = _interopRequireDefault(require("../../env"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _env$db = _env["default"].db,
    development = _env$db.development,
    production = _env$db.production,
    test = _env$db.test;
var _default = {
  development: {
    database: development.name,
    host: development.host,
    port: development.port,
    username: development.username,
    password: development.password,
    dialect: "postgres",
    define: {
      underscored: true
    },
    sync: {
      force: false
    }
  },
  production: {
    database: production.name,
    host: production.host,
    port: production.port,
    username: production.username,
    password: production.password,
    dialect: "postgres",
    define: {
      underscored: true
    },
    sync: {
      force: false
    }
  },
  test: {
    database: test.name,
    host: test.host,
    port: test.port,
    username: production.username,
    password: production.password,
    dialect: "postgres",
    define: {
      underscored: true
    },
    sync: {
      force: true
    }
  }
};
exports["default"] = _default;