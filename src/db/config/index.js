import env from "../../env";

const { db: { development, production, test } } = env;

export default {
  development: {
    database: development.name,
    host: development.host,
    port: development.port,
    username: development.username,
    password: development.password,
    dialect: "postgres",
    define: {
      underscored: true
    },
    sync: {
      force: false
    }
  },
  production: {
    database: production.name,
    host: production.host,
    port: production.port,
    username: production.username,
    password: production.password,
    dialect: "postgres",
    define: {
      underscored: true
    },
    sync: {
      force: false
    }
  },
  test: {
    database: test.name,
    host: test.host,
    port: test.port,
    username: test.username,
    password: test.password,
    dialect: "postgres",
    define: {
      underscored: true
    },
    sync: {
      force: true
    }
  }
};
