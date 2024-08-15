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
  createUserSerializer,
  updateUserSerializer,
} from "../serializers/contact.serializer";
import validateSerializerMiddleware from "../middlewares/validateSerializer.middleware";

const router = Router();

router.post(
  "/contacts",
  validateSerializerMiddleware(createUserSerializer),
  createContactController
);
router.get("/contacts", getContactsController);
router.get("/contacts/lastname/:search", getContactsByLastNameController);
router.get("/contacts/:id", getContactByIdController);
router.delete("/contacts/:id", deleteContactsController);
router.put(
  "/contacts/:id",
  validateSerializerMiddleware(updateUserSerializer),
  updateContactController
);

export default router;
