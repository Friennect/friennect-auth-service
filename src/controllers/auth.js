import db from "../db";
import helpers from "../helpers";

const { Auth } = db;
const { Jwt, Crypt } = helpers;

export default class AuthController {
  static async signUp(req, res) {
    try {
      const { body } = req;
      const { email, id, password } = await Auth.create(body);
      const data = { email, id, token: Jwt.sign({ id, password }) };
      res.status(201).json({
        statusCode: 201,
        body: data
      });
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        body: error
      });
    }
  }

  static async signIn(req, res) {
    try {
      const { email, password } = req.body;
      const user = await Auth.findByEmail(email);
      if (!user) {
        return res.status(404).json({
          statusCode: 404,
          body: "User not found."
        });
      }
      if (!Crypt.compare(password, user.password)) {
        return res.status(400).json({
          statusCode: 400,
          body: "Incorrect password."
        });
      }
      const body = {
        id: user.id,
        email: user.email,
        token: Jwt.sign({
          id: user.id,
          password: user.password
        })
      };
      res.status(200).json({
        statusCode: 200,
        body
      });
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        body: error
      });
    }
  }
}
