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

router.patch(
  "/update",
  AuthMiddleware.checkToken,
  AuthController.update
);

router.get(
  "/logged",
  AuthMiddleware.checkToken,
  AuthController.getAuthenticatedUser
);

router.get(
  "/logout",
  AuthMiddleware.checkToken,
  AuthController.logOut
);

export default router;
