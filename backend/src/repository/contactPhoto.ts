import { PrismaClient } from "@prisma/client";
import { IContactPhotoCreate } from "../interfaces/contact";

export class ContactPhotoRepository {
  private readonly prisma = new PrismaClient({ log: ["error", "warn"] });

  create(photo: IContactPhotoCreate, contactId: string) {
    return this.prisma.contactPhoto.create({ data: { ...photo, contactId } });
  }

  updateByContactId(photo: IContactPhotoCreate, contactId: string) {
    return this.prisma.contactPhoto.update({
      where: { contactId },
      data: { ...photo },
    });
  }

  deleteByContactId(contactId: string) {
    return this.prisma.contactPhoto.delete({ where: { contactId } });
  }
}
