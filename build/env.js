"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

var _default = {
  db: {
    development: {
      name: process.env.DB_NAME,
      port: parseInt(process.env.DB_PORT),
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASS
    },
    production: {
      name: process.env.DB_NAME,
      port: parseInt(process.env.DB_PORT),
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASS
    },
    test: {
      name: process.env.TEST_DB_NAME,
      port: parseInt(process.env.TEST_DB_PORT),
      host: process.env.TEST_DB_HOST,
      username: process.env.TEST_DB_USER,
      password: process.env.TEST_DB_PASS
    }
  },
  port: {
    development: process.env.PORT || 4600,
    production: process.env.PORT || 80,
    test: process.env.TEST_PORT || 9000
  },
  jwt_secret: process.env.jwt_secret
};
exports["default"] = _default;