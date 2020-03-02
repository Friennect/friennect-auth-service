import db from "../db";
import helpers from "../helpers";

const { Auth } = db;
const { Jwt } = helpers;

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
}
