import { NextFunction, Request, Response } from "express";
import { jwtService } from "../services/jwt.service";

export default async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const token = request.header("authorization") ?? "";
    jwtService.validateTokenFromHeader(token);
    return next();
  } catch (err: any) {
    return response.status(403).json({ message: "Invalid access token" });
  }
};
