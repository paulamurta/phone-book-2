import { Request, Response } from "express";

import { AppError, handleError } from "../common/app.Error";
import { JwtTokenPayload } from "../common/app.type";
import {
  IContactCreate,
  IContactPhotoCreate,
  IContactUpdate,
} from "../interfaces/contact";
import {
  contactSearchSerializer,
  createContactSerializer,
  updateContactSerializer,
} from "../serializers/contact.serializer";
import {
  createContactService,
  deleteContactService,
  getContactByIdService,
  getContactsService,
  updateContactService,
} from "../services/contact.service";
import { jwtService } from "../services/jwt.service";

export const createContactController = async (req: Request, res: Response) => {
  try {
    const authHeader = req.header("Authorization") ?? "";
    const tokenPayload = jwtService.decodeTokenFromHeader(
      authHeader
    ) as JwtTokenPayload;

    const rawBodyData: IContactCreate = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      birthday: req.body.birthday || undefined,
      email: req.body.email || undefined,
      groupId: req.body.groupId ?? undefined,
    };

    let photo: IContactPhotoCreate | undefined;
    if (req.file) {
      photo = {
        mimeType: req.file?.mimetype,
        photoData: req.file?.buffer,
      };
    }

    const validated = await createContactSerializer.validate(rawBodyData);

    const newContact = await createContactService(
      validated,
      tokenPayload.sub,
      photo
    );
    return res.status(201).json(newContact);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export const getContactsController = async (req: Request, res: Response) => {
  try {
    const authHeader = req.header("Authorization") ?? "";
    const tokenPayload = jwtService.decodeTokenFromHeader(
      authHeader
    ) as JwtTokenPayload;

    const { search, favorite, groupId } = req.query;

    const searchParams = await contactSearchSerializer.validate({
      search,
      groupId,
      favorite: favorite ? favorite === "true" : undefined,
    });

    const contacts = await getContactsService(tokenPayload.sub, searchParams);
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
    const authHeader = req.header("Authorization") ?? "";
    const tokenPayload = jwtService.decodeTokenFromHeader(
      authHeader
    ) as JwtTokenPayload;

    const contact = await getContactByIdService(id, tokenPayload.sub);
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
    const authHeader = req.header("Authorization") ?? "";
    const tokenPayload = jwtService.decodeTokenFromHeader(
      authHeader
    ) as JwtTokenPayload;

    await deleteContactService(id, tokenPayload.sub);
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
    const authHeader = req.header("Authorization") ?? "";
    const tokenPayload = jwtService.decodeTokenFromHeader(
      authHeader
    ) as JwtTokenPayload;

    const rawBodyData: IContactUpdate = {
      firstName: req.body.firstName || undefined,
      lastName: req.body.lastName || undefined,
      phoneNumber: req.body.phoneNumber || undefined,
      birthday: req.body.birthday || undefined,
      email: req.body.email || undefined,
      groupId: req.body.groupId || undefined,
      favorite: req.body.favorite || undefined,
    };

    let photo: IContactPhotoCreate | undefined | null;
    if (req.file === null) {
      photo = null;
    } else if (req.file) {
      photo = {
        mimeType: req.file?.mimetype,
        photoData: req.file?.buffer,
      };
    }

    await updateContactService(id, rawBodyData, photo, tokenPayload.sub);
    return res.status(204).send({ message: "Contact successfully updated" });
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};
