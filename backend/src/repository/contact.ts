import { Prisma, PrismaClient } from "@prisma/client";

import {
  IContact,
  IContactCreate,
  IContactSearch,
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

  async getAll(ownerId: string, search: IContactSearch): Promise<IContact[]> {
    let nameWhereClause: Prisma.ContactWhereInput | undefined;

    if (search.search) {
      const nameParts = search.search
        .split(" ")
        .map((item) => item.trim())
        .filter((value) => !!value);

      if (nameParts.length === 1) {
        nameWhereClause = {
          OR: [
            { firstName: { contains: nameParts[0] } },
            { lastName: { contains: nameParts[0] } },
          ],
        };
      } else if (nameParts.length > 1) {
        nameWhereClause = {
          AND: nameParts.map((part) => ({
            OR: [
              { firstName: { contains: part } },
              { lastName: { contains: part } },
            ],
          })),
        };
      }
    }

    const whereClause: Prisma.ContactWhereInput = {
      ...search,
      ...nameWhereClause,
      ownerId,
    };

    //await this.prisma.$connect();

    const contactsList = await this.prisma.contact.findMany({
      where: { ...whereClause },
      orderBy: [{ firstName: "asc" }, { lastName: "asc" }],
    });

    return contactsList;
  }

  async findByPhone(
    phone: string,
    ownerId: string
  ): Promise<IContact | undefined> {
    const foundContact = await this.prisma.contact.findUnique({
      where: { phoneNumber: phone, ownerId },
    });
    return foundContact as IContact;
  }

  async findByLastName(lastName: string, ownerId: string): Promise<IContact[]> {
    const foundContacts = await this.prisma.contact.findMany({
      where: { lastName: { contains: lastName }, ownerId },
    });
    return foundContacts as IContact[];
  }

  async findById(id: string, ownerId: string): Promise<IContact | undefined> {
    const foundContact = await this.prisma.contact.findUnique({
      where: { id, ownerId },
    });
    return foundContact as IContact;
  }

  async delete(id: string, ownerId: string) {
    await this.prisma.contact.delete({ where: { id, ownerId } });
  }

  async patchContact(
    id: string,
    data: IContactUpdate,
    ownerId: string
  ): Promise<IContact> {
    const updatedContact = await this.prisma.contact.update({
      where: { id, ownerId },
      data: data,
    });

    return updatedContact as IContact;
  }
}

export const contactRepository = new ContactRepository();
