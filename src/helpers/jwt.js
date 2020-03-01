import jwt from "jsonwebtoken";
import env from "../env";

const { jwt_secret } = env;

export default class Jwt {
  static sign(payload) {
    return jwt.sign(payload, jwt_secret, {
      expiresIn: "3d"
    });
  }

  static decode(token) {
    return jwt.verify(token, jwt_secret);
  }
}
