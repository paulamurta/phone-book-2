import { Prisma } from "@prisma/client";
import { IGroupCreateUpdate } from "../interfaces/group";
import { GroupRepository } from "../repository/group";
import { AppError } from "../common/app.Error";

const groupRepository = new GroupRepository();

export const listGroupsService = async (userId: string) => {
  return groupRepository.findAll(userId);
};

export const createGroupService = async (
  group: IGroupCreateUpdate,
  userId: string
) => {
  try {
    const newGroup = await groupRepository.create(group, userId);
    return newGroup;
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      throw new AppError(400, `${err.code}: ${err.message}`);
    }
    throw new AppError(400, (err as Error)?.message);
  }
};

export const updateGroupService = async (
  id: string,
  group: IGroupCreateUpdate,
  userId: string
) => {
  try {
    const updatedGroup = await groupRepository.update(id, group, userId);
    return updatedGroup;
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2025") {
        throw new AppError(404, "Group not found");
      }
      throw new AppError(400, `${err.code}: ${err.message}`);
    }
    throw new AppError(400, (err as Error)?.message);
  }
};

export const deleteGroupService = async (id: string, userId: string) => {
  try {
    await groupRepository.delete(id, userId);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2025") {
        throw new AppError(404, "Group not found");
      }
      throw new AppError(400, `${err.code}: ${err.message}`);
    }
    throw new AppError(400, (err as Error)?.message);
  }
};

export const getGroupService = async (id: string, userId: string) => {
  try {
    const foundGroup = await groupRepository.findOne(id, userId);
    return foundGroup;
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2025") {
        throw new AppError(404, "Group not found");
      }
      throw new AppError(400, `${err.code}: ${err.message}`);
    }
    throw new AppError(400, (err as Error)?.message);
  }
};
