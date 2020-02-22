import express from "express";
import morgan from "morgan";
import configuration from "./config";

const configure = (cb) => {
  cb(morgan, express);
};

const app = express();

configure(configuration(app));

app.listen(process.env.PORT, () => {
  console.log("Express server is running");
});

// Export app for tests
export default app;
