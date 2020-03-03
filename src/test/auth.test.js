import { expect } from "chai";
import request from "supertest";
import app from "..";
import db from "../db";

const { sequelize, Auth } = db;

const root = "/api/v1/auth";
const email = "testemail@app.com";
const password = "testpassword";
let token = null;

describe("TESTS", () => {
  before((done) => {
    sequelize.sync({}).then(() => {
      done();
    });
  });
  describe("POST", () => {
    it("should create a new user", (done) => {
      request(app)
        .post(`${root}/`)
        .send({ email, password })
        .end((err, res) => {
          const { status, body } = res;
          console.table([body.body]);
          token = body.body.token;
          console.log(token);
          expect(status).to.be.eql(201);
          done(err);
        });
    });
  });
  after((done) => {
    Auth.destroy({ where: { email } }).then(() => {
      done();
    });
  });
});
