import { AppError } from "../common/app.Error";
import { IContact, IContactCreate } from "../interfaces/contact";
import { contactRepository } from "../repository/contact";

export const createContactService = async (
  contact: IContactCreate
): Promise<IContact> => {
  const foundContact = await contactRepository.findByPhone(contact.phone);

  if (foundContact) {
    throw new AppError(400, "Phone number already registered");
  }
  return contactRepository.create(contact);
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
  const foundIndex = await contactRepository.findIndexById(id);

  if (foundIndex == -1) {
    throw new AppError(404, "Contact not found.");
  }
  return contactRepository.deleteContactByIndex(foundIndex);
};

export const updateContactService = async (id: string, contact: IContact) => {
  const { firstName, lastName, phone } = contact;

  if (!firstName && !lastName && !phone) {
    throw new AppError(422, "At least one field must be filled");
  }

  const foundIndex = await contactRepository.findIndexById(id);

  if (foundIndex === -1) {
    throw new AppError(404, "Contact not found.");
  }

  const foundContact = await contactRepository.findByPhone(phone);

  if (foundContact && foundContact.id !== id) {
    throw new AppError(400, "Phone number already registered");
  }

  return contactRepository.updateContactByIndex(foundIndex, contact);
};
