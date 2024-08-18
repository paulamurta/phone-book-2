import { Request, Response } from "express";

import {
  createContactService,
  deleteContactService,
  getContactByIdService,
  getContactsByLastNameService,
  getContactsService,
  updateContactService,
} from "../services/contact.service";
import { AppError, handleError } from "../common/app.Error";
import { jwtService } from "../services/jwt.service";
import { JwtTokenPayload } from "../common/app.type";

export const createContactController = async (req: Request, res: Response) => {
  try {
    const authHeader = req.header("Authorization") ?? "";
    const tokenPayload = jwtService.decodeTokenFromHeader(
      authHeader
    ) as JwtTokenPayload;
    const newContact = await createContactService(req.body, tokenPayload.sub);
    return res.status(201).json(newContact);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export const getContactsController = async (req: Request, res: Response) => {
  try {
    const contacts = await getContactsService();
    return res.json(contacts);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export const getContactsByLastNameController = async (
  req: Request,
  res: Response
) => {
  const { search } = req.params;
  try {
    const contacts = await getContactsByLastNameService(search);
    return res.json(contacts);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};
export const getContactByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const contact = await getContactByIdService(id);
    return res.json(contact);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export const deleteContactsController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await deleteContactService(id);
    return res.status(200).json({ message: "Contact successfully deleted" });
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export const updateContactController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await updateContactService(id, req.body);
    return res.status(204).send({ message: "Contact successfully updated" });
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};
