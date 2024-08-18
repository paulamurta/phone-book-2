import { Router } from "express";

import validateTokenMiddleware from "../middlewares/validateToken.middleware";
import authRoutes from "./auth.route";
import contactRoutes from "./contact.routes";
import groupRoutes from "./group.routes";
import userRoutes from "./user.routes";

const router = Router();

router.use("/api", authRoutes);
router.use("/api", validateTokenMiddleware, userRoutes);
router.use("/api", validateTokenMiddleware, contactRoutes);
router.use("/api", validateTokenMiddleware, groupRoutes);

export default router;
