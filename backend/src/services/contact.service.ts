import { Prisma } from "@prisma/client";
import { AppError } from "../common/app.Error";
import {
  IContact,
  IContactCreate,
  IContactPhotoCreate,
  IContactSearch,
  IContactUpdate,
} from "../interfaces/contact";
import { contactRepository } from "../repository/contact";

export const createContactService = async (
  contact: IContactCreate,
  ownerId: string,
  photo?: IContactPhotoCreate
): Promise<IContact> => {
  try {
    const newContact = await contactRepository.create(contact, ownerId, photo);
    return newContact;
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        throw new AppError(400, "Phone number already registered");
      }
      throw new AppError(400, `${err.code}: ${err.message}`);
    }
    throw new AppError(400, (err as Error)?.message);
  }
};

export const getContactsService = async (
  ownerId: string,
  searchParams: IContactSearch
): Promise<IContact[]> => {
  return contactRepository.getAll(ownerId, searchParams);
};

export const getContactsByLastNameService = async (
  ownerId: string,
  search: string
): Promise<IContact[]> => {
  return contactRepository.findByLastName(ownerId, search);
};

export const getContactByIdService = async (
  id: string,
  ownerId: string
): Promise<IContact | undefined> => {
  const foundContact = await contactRepository.findById(id, ownerId);

  if (!foundContact) {
    throw new AppError(404, "Contact not found.");
  }
  return foundContact;
};

export const deleteContactService = async (id: string, ownerId: string) => {
  try {
    await contactRepository.delete(id, ownerId);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      throw new AppError(400, `${err.code}: ${err.message}`);
    }
    throw new AppError(500, (err as Error)?.message);
  }
};

export const updateContactService = async (
  id: string,
  contact: IContactUpdate,
  photo: IContactPhotoCreate | undefined | null,
  ownerId: string
) => {
  const doHaveChanges = Object.values(contact).some(
    (value) => value !== null && value !== undefined && value !== ""
  );

  if (!doHaveChanges) {
    throw new AppError(422, "At least one field must be filled for update");
  }

  try {
    const updatedContact = await contactRepository.patchContact(
      id,
      contact,
      photo,
      ownerId
    );
    return updatedContact;
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2025") {
        throw new AppError(404, "Contact not found");
      }
      throw new AppError(400, `${err.code}: ${err.message}`);
    }
    throw new AppError(500, (err as Error)?.message);
  }
};
