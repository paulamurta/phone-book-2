import { Router } from "express";

import {
  createContactController,
  deleteContactsController,
  getContactByIdController,
  getContactsController,
  updateContactController,
} from "../controllers/contact.controller";
import validateSerializerMiddleware from "../middlewares/validateSerializer.middleware";
import {
  createContactSerializer,
  updateContactSerializer,
} from "../serializers/contact.serializer";

const router = Router();

router.post(
  "/contacts",
  validateSerializerMiddleware(createContactSerializer),
  createContactController
);
router.get("/contacts", getContactsController);
router.get("/contacts/:id", getContactByIdController);
router.delete("/contacts/:id", deleteContactsController);
router.patch(
  "/contacts/:id",
  validateSerializerMiddleware(updateContactSerializer),
  updateContactController
);

export default router;
