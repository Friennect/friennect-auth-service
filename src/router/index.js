import { Router } from "express";

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

export default router;
