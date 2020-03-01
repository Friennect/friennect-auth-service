import { Sequelize, DataTypes } from "sequelize";
import models from "./models";
import configuration from "./config";

const sequelize = new Sequelize(
  configuration[process.env.NODE_ENV]
);

const db = { sequelize };

Object.keys(models).forEach((key) => {
  db[key] = models[key](sequelize, DataTypes);
});

export default db;
