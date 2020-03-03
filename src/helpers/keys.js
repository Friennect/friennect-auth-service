export default class Keys {
  static arePresent(body, ...keys) {
    return Object.keys(body).every((bodyKey) => keys.some((mainKey) => bodyKey === mainKey));
  }
}
