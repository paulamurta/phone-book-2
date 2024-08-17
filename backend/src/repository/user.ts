import { Prisma, PrismaClient } from "@prisma/client";

import { IUserCreate } from "../interfaces/user";

export class UserRepository {
  private readonly prisma = new PrismaClient();

  async create(userData: IUserCreate) {
    return this.prisma.user.create({
      data: { ...userData },
    });
  }

  async findOne(userId: string) {
    return this.prisma.user.findUniqueOrThrow({ where: { id: userId } });
  }

  async findByEmail(userEmail: string) {
    return this.prisma.user.findUniqueOrThrow({ where: { email: userEmail } });
  }
}
