import { PrismaClient } from "@prisma/client";

import {
  IContact,
  IContactCreate,
  IContactUpdate,
} from "../interfaces/contact";

class ContactRepository {
  private prisma = new PrismaClient();

  constructor() {}

  async create(contact: IContactCreate, ownerId: string): Promise<IContact> {
    const newContact = await this.prisma.contact.create({
      data: {
        ...contact,
        ownerId,
      },
    });
    return newContact as IContact;
  }

  getAll(): Promise<IContact[]> {
    return this.prisma.contact.findMany();
  }

  async findByPhone(phone: string): Promise<IContact | undefined> {
    const foundContact = await this.prisma.contact.findUnique({
      where: { phoneNumber: phone },
    });
    return foundContact as IContact;
  }

  async findByLastName(lastName: string): Promise<IContact[]> {
    const foundContacts = await this.prisma.contact.findMany({
      where: { lastName: { contains: lastName } },
    });
    return foundContacts as IContact[];
  }

  async findById(id: string): Promise<IContact | undefined> {
    const foundContact = await this.prisma.contact.findUnique({
      where: { id },
    });
    return foundContact as IContact;
  }

  async delete(id: string) {
    await this.prisma.contact.delete({ where: { id } });
  }

  async patchContact(id: string, data: IContactUpdate): Promise<IContact> {
    const updatedContact = await this.prisma.contact.update({
      where: { id },
      data: data,
    });

    return updatedContact as IContact;
  }
}

export const contactRepository = new ContactRepository();
