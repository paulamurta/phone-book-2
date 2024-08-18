import { Request, Response } from "express";

import { AppError, handleError } from "../common/app.Error";
import { JwtTokenPayload } from "../common/app.type";
import {
  createGroupService,
  deleteGroupService,
  listGroupsService,
  updateGroupService,
} from "../services/group.service";
import { jwtService } from "../services/jwt.service";

export const listGroupsController = async (req: Request, res: Response) => {
  try {
    const authHeader = req.header("Authorization") ?? "";
    const tokenPayload = jwtService.decodeTokenFromHeader(
      authHeader
    ) as JwtTokenPayload;

    const groupsList = await listGroupsService(tokenPayload.sub);
    return res.status(200).json(groupsList);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export const createGroupController = async (req: Request, res: Response) => {
  try {
    const authHeader = req.header("Authorization") ?? "";
    const tokenPayload = jwtService.decodeTokenFromHeader(
      authHeader
    ) as JwtTokenPayload;

    const newGroup = await createGroupService(req.body, tokenPayload.sub);
    return res.status(201).json(newGroup);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export const updateGroupController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const authHeader = req.header("Authorization") ?? "";
    const tokenPayload = jwtService.decodeTokenFromHeader(
      authHeader
    ) as JwtTokenPayload;

    await updateGroupService(id, req.body, tokenPayload.sub);
    return res.status(204).send();
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export const deleteGroupController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const authHeader = req.header("Authorization") ?? "";
    const tokenPayload = jwtService.decodeTokenFromHeader(
      authHeader
    ) as JwtTokenPayload;

    await deleteGroupService(id, tokenPayload.sub);
    return res.status(200).send();
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};
