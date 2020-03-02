import { Router } from "express";
import AuthRouter from "./auth";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({
    statusCode: 200,
    body: "Welcome to the Friennect Auth API",
    routes: {
      prefix: "/api/v1"
    }
  });
});

router.use("/auth", AuthRouter);

export default router;
