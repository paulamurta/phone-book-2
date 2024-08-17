import { Router } from "express";

import {
  loginController,
  signUpController,
} from "../controllers/user.controller";

const router = Router();

router.post("/auth/signup", signUpController);

router.post("/auth/login", loginController);

export default router;
