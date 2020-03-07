import db from "../db";
import helpers from "../helpers";

const { Token, Auth } = db;
const { Keys, Jwt } = helpers;

export default class AuthMiddleware {
  static async checkKeysPresent(req, res, next) {
    try {
      const { body } = req;
      if (!Keys.arePresent(body, ["email", "password"])) {
        return res.status(400).json({
          statusCode: 400,
          body: "Missing required keys"
        });
      }
      next();
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        body: error
      });
    }
  }

  static async checkIfUserExists(req, res, next) {
    try {
      const { email } = req.body;
      const _user = await Auth.findByEmail(email);
      if (_user) {
        return res.status(400).json({
          statusCode: 400,
          body: "Email already in use."
        });
      }
      next();
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        body: error
      });
    }
  }

  static async checkToken(req, res, next) {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        return res.status(401).json({
          statusCode: 401,
          body: "Authorization header not present in request."
        });
      }
      if (!authorization.startsWith("Bearer")) {
        return res.status(401).json({
          statusCode: 401,
          body: "Authorization header must begin with 'Bearer' string."
        });
      }
      const _token = authorization.substring(7, authorization.length);
      if (!_token || _token.trim().length === 0) {
        return res.status(401).json({
          statusCode: 401,
          body: "Token is not present in authorization header."
        });
      }
      const _payload = Jwt.decode(_token);
      if (!_payload) {
        return res.status(401).json({
          statusCode: 401,
          body: "Expired or malformed Jwt found in authorization header."
        });
      }
      const _loggedOut = await Token.findByActual(_token);
      if (_loggedOut) {
        return res.status(401).json({
          statusCode: 401,
          body: "Only logged in users can access this resource."
        });
      }
      const _user = await Auth.findByPk(_payload.id);
      req._user = _user;
      req._token = _token;
      next();
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        body: error
      });
    }
  }
}
