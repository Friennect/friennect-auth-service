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

router.post(
  "/login",
  AuthMiddleware.checkKeysPresent,
  AuthController.signIn
);

export default router;
