import { Prisma } from "@prisma/client";
import { AppError } from "../common/app.Error";
import {
  IContact,
  IContactCreate,
  IContactUpdate,
} from "../interfaces/contact";
import { contactRepository } from "../repository/contact";

export const createContactService = async (
  contact: IContactCreate,
  ownerId: string
): Promise<IContact> => {
  try {
    const newContact = contactRepository.create(contact, ownerId);
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

export const getContactsService = async (): Promise<IContact[]> => {
  return contactRepository.getAll();
};

export const getContactsByLastNameService = async (
  search: string
): Promise<IContact[]> => {
  return contactRepository.findByLastName(search);
};

export const getContactByIdService = async (
  id: string
): Promise<IContact | undefined> => {
  const foundContact = contactRepository.findById(id);

  if (!foundContact) {
    throw new AppError(404, "Contact not found.");
  }
  return foundContact;
};

export const deleteContactService = async (id: string) => {
  try {
    await contactRepository.delete(id);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      throw new AppError(400, `${err.code}: ${err.message}`);
    }
    throw new AppError(500, (err as Error)?.message);
  }
};

export const updateContactService = async (
  id: string,
  contact: IContactUpdate
) => {
  const hasChangedValue = Object.values(contact).some((value) => !!value);

  if (hasChangedValue) {
    throw new AppError(422, "At least one field must be filled for update");
  }

  try {
    const updatedContact = contactRepository.patchContact(id, contact);
    return updatedContact;
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      throw new AppError(400, `${err.code}: ${err.message}`);
    }
    throw new AppError(500, (err as Error)?.message);
  }
};
