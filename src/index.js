import express from "express";
import morgan from "morgan";
import configuration from "./config";


const configure = (cb) => {
  cb(morgan, express);
};
const port =process.env.PORT||3000;

const app = express();

configure(configuration(app));

app.listen(port, () => {
  console.log("Express server is running");
});

// Export app for tests
export default app;
