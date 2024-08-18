import { PrismaClient } from "@prisma/client";
import { IGroupCreateUpdate } from "../interfaces/group";
import { log } from "console";

export class GroupRepository {
  private readonly prisma = new PrismaClient({ log: ["error", "warn"] });

  findAll(userId: string) {
    return this.prisma.group.findMany({ where: { userId } });
  }

  findOne(id: string, userId: string) {
    return this.prisma.group.findUnique({ where: { id, userId } });
  }

  create(group: IGroupCreateUpdate, userId: string) {
    return this.prisma.group.create({ data: { ...group, userId } });
  }

  update(id: string, group: IGroupCreateUpdate, userId: string) {
    return this.prisma.group.update({
      where: { id, userId },
      data: { ...group },
    });
  }

  delete(id: string, userId: string) {
    return this.prisma.group.delete({ where: { id, userId } });
  }
}
