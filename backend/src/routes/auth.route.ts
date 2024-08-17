import { Router } from "express";

import { UserController } from "../controllers/user.controller";

const router = Router();
const userController = new UserController();

router.post("/auth/signup", userController.signUp);

router.post("/auth/login", userController.login);

export default router;
