import { Router } from "express";
import middlewares from "../middlewares";
import controllers from "../controllers";

const router = Router();

const { AuthController } = controllers;
const { AuthMiddleware } = middlewares;

router.post(
  "/",
  AuthMiddleware.checkKeysPresent,
  AuthMiddleware.checkIfUserExists,
  AuthController.signUp
);

export default router;
