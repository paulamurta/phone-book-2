import { Router } from "express";

import {
  createGroupController,
  deleteGroupController,
  getGroupController,
  listGroupsController,
  updateGroupController,
} from "../controllers/group.controller";
import validateSerializerMiddleware from "../middlewares/validateSerializer.middleware";
import { createUpdateGroupSerializer } from "../serializers/group.serializer";

const router = Router();

router.get("/groups", listGroupsController);
router.post(
  "/groups",
  validateSerializerMiddleware(createUpdateGroupSerializer),
  createGroupController
);
router.patch(
  "/groups/:id",
  validateSerializerMiddleware(createUpdateGroupSerializer),
  updateGroupController
);
router.delete("/groups/:id", deleteGroupController);
router.get("/groups/:id", getGroupController);

export default router;
