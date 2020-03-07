import bcrypt from "bcryptjs";

export default class Crypt {
  static compare(raw, hash) {
    return bcrypt.compareSync(raw, hash);
  }
}
