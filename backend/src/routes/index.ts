import { Router } from "express";

import validateTokenMiddleware from "../middlewares/validateToken.middleware";
import authRoutes from "./auth.route";
import contactRoutes from "./contact.routes";

const router = Router();

router.use("/api", authRoutes);
router.use("/api", validateTokenMiddleware, contactRoutes);

export default router;
