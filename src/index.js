import express from "express";
import morgan from "morgan";
import configuration from "./config";
import db from "./db";
import env from "./env";

const { sequelize } = db;
const { port } = env;

const configure = (cb) => {
  cb(morgan, express);
};

const app = express();

configure(configuration(app));

app.listen(port[process.env.NODE_ENV], async () => {
  console.log("Express server is running on port ", port[process.env.NODE_ENV]);
  if (process.env.NODE_ENV !== "test") {
    const s = await sequelize.sync({});
    if (s) console.log("Sequelize connected to db");
  }
});

// Export app for tests
export default app;
