"use strict";

var _chai = require("chai");

var _supertest = _interopRequireDefault(require("supertest"));

var _ = _interopRequireDefault(require(".."));

var _db = _interopRequireDefault(require("../db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var sequelize = _db["default"].sequelize,
    Auth = _db["default"].Auth;
var root = "/api/v1/auth";
var email = "testemail@app.com";
var password = "testpassword";
var token = null;
describe("TESTS", function () {
  before(function (done) {
    sequelize.sync({}).then(function () {
      done();
    });
  });
  describe("POST", function () {
    it("should create a new user", function (done) {
      (0, _supertest["default"])(_["default"]).post("".concat(root, "/")).send({
        email: email,
        password: password
      }).end(function (err, res) {
        var status = res.status,
            body = res.body;
        console.table([body.body]);
        token = body.body.token;
        console.log(token);
        (0, _chai.expect)(status).to.be.eql(201);
        done(err);
      });
    });
  });
  after(function (done) {
    Auth.destroy({
      where: {
        email: email
      }
    }).then(function () {
      done();
    });
  });
});