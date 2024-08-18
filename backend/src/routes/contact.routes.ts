import { Router } from "express";
import {
  createContactController,
  deleteContactsController,
  getContactByIdController,
  getContactsByLastNameController,
  getContactsController,
  updateContactController,
} from "../controllers/contact.controller";
import {
  createContactSerializer,
  updateContactSerializer,
} from "../serializers/contact.serializer";
import validateSerializerMiddleware from "../middlewares/validateSerializer.middleware";

const router = Router();

router.post(
  "/contacts",
  validateSerializerMiddleware(createContactSerializer),
  createContactController
);
router.get("/contacts", getContactsController);
router.get("/contacts/:id", getContactByIdController);
router.delete("/contacts/:id", deleteContactsController);
router.put(
  "/contacts/:id",
  validateSerializerMiddleware(updateContactSerializer),
  updateContactController
);

export default router;
