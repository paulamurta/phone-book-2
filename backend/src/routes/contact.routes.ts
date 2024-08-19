import { Router } from "express";
import multer from "multer";

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

const storage = multer.memoryStorage();
const uploadMiddleware = multer({ storage });

router.post(
  "/contacts",
  uploadMiddleware.single("photo"),
  createContactController
);
router.get("/contacts", getContactsController);
router.get("/contacts/:id", getContactByIdController);
router.delete("/contacts/:id", deleteContactsController);
router.patch(
  "/contacts/:id",
  uploadMiddleware.single("photo"),
  updateContactController
);

export default router;
