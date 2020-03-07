import db from "../db";
import helpers from "../helpers";

const { Auth, Token } = db;
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

  static async update(req, res) {
    try {
      const { _user, body } = req;
      const update = await Auth.update(body, {
        individualHooks: true,
        where: {
          id: _user.id
        }
      });
      if (!update) {
        throw new Error("Unable to update");
      }
      res.status(200).json({
        statusCode: 200,
        body: "Successfully updated user detail"
      });
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        body: error
      });
    }
  }

  static async getAuthenticatedUser(req, res) {
    try {
      const { _user } = req;
      const body = {
        id: _user.id,
        email: _user.email
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

  static async logOut(req, res) {
    try {
      const { _user, _token } = req;
      const actual = _token;
      const loggedOut = await Token.create({ actual });
      if (!loggedOut) {
        throw new Error("Cannot sign user out");
      }
      res.status(200).json({
        statusCode: 200,
        body: `Successfully signed out user with email ${_user.email}`
      });
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        body: error
      });
    }
  }
}
