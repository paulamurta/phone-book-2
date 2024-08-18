import { Router } from "express";
import { getUserController } from "../controllers/user.controller";

const router = Router();

router.get("/users/whoami", getUserController);

export default router;
