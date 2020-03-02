export default class Keys {
  static arePresent(body, ...keys) {
    return keys.every((key) => Object.keys(body).some((bodyKey) => bodyKey === key));
  }
}
