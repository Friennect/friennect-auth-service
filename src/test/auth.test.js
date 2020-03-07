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
    it("should log a user in", (done) => {
      request(app)
        .post(`${root}/login`)
        .send({ email, password })
        .end((err, res) => {
          const { status, body } = res;
          console.table([body.body]);
          token = body.body.token;
          console.log(token);
          expect(status).to.be.eql(200);
          done(err);
        });
    });
    it("should respond with a 404 if user doesn't exist", (done) => {
      request(app)
        .post(`${root}/login`)
        .send({
          email: "wrongdetail@app.com",
          password
        })
        .end((err, res) => {
          const { status, body } = res;
          console.table([body.body]);
          expect(status).to.be.eql(404);
          done(err);
        });
    });
    it("should respond with a 400 if password is incorrect", (done) => {
      request(app)
        .post(`${root}/login`)
        .send({
          email,
          password: "incorrectpassword"
        })
        .end((err, res) => {
          const { status, body } = res;
          console.table([body.body]);
          expect(status).to.be.eql(400);
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
