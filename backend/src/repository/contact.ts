import { Prisma, PrismaClient } from "@prisma/client";

import {
  IContact,
  IContactCreate,
  IContactPhotoCreate,
  IContactSearch,
  IContactUpdate,
} from "../interfaces/contact";

class ContactRepository {
  private prisma = new PrismaClient({
    log: ["error", "warn", "info", "query"],
  });

  constructor() {}

  async create(
    contact: IContactCreate,
    ownerId: string,
    photo?: IContactPhotoCreate
  ): Promise<IContact> {
    let photoAggregate = {};
    if (photo) {
      photoAggregate = {
        photo: {
          create: {
            mimeType: photo.mimeType,
            photoData: photo.photoData,
          },
        },
      };
    }

    const newContact = await this.prisma.$transaction([
      this.prisma.contact.create({
        data: {
          ...contact,
          ...photoAggregate,
          ownerId,
        },
      }),
    ]);

    return newContact as unknown as IContact;
  }

  async getAll(
    ownerId: string,
    searchQuery: IContactSearch
  ): Promise<IContact[]> {
    let nameWhereClause: Prisma.ContactWhereInput | undefined;
    const { search, ...others } = searchQuery;
    if (search) {
      const nameParts = search
        .split(" ")
        .map((item) => item.trim())
        .filter((value) => !!value);

      if (nameParts.length === 1) {
        nameWhereClause = {
          OR: [
            { firstName: { contains: nameParts[0], mode: "insensitive" } },
            { lastName: { contains: nameParts[0], mode: "insensitive" } },
          ],
        };
      } else if (nameParts.length > 1) {
        nameWhereClause = {
          AND: nameParts.map((part) => ({
            OR: [
              { firstName: { contains: part, mode: "insensitive" } },
              { lastName: { contains: part, mode: "insensitive" } },
            ],
          })),
        };
      }
    }

    const whereClause: Prisma.ContactWhereInput = {
      ...others,
      ownerId,
      ...nameWhereClause,
    };

    const contactsList = await this.prisma.contact.findMany({
      where: whereClause,
      orderBy: [{ firstName: "asc" }, { lastName: "asc" }],
      include: {
        group: {
          select: {
            id: true,
            name: true,
          },
        },
        photo: {
          select: {
            photoData: true,
            mimeType: true,
          },
        },
      },
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
    photo: IContactPhotoCreate | undefined | null,
    ownerId: string
  ): Promise<IContact> {
    const updatedContact = await this.prisma.$transaction(
      async (transaction) => {
        if (photo === null) {
          transaction.contactPhoto.delete({ where: { contactId: id } });
        } else if (photo) {
          this.prisma.contactPhoto.update({
            where: {
              contactId: id,
            },
            data: {
              photoData: photo.photoData,
              mimeType: photo.mimeType,
            },
          });
        }

        const updatedContact = await transaction.contact.update({
          where: { id, ownerId },
          data: { ...data },
        });

        return updatedContact;
      }
    );

    return updatedContact as IContact;
  }
}

export const contactRepository = new ContactRepository();
