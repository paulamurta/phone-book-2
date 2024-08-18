import { Request, Response } from "express";
import { ValidationError } from "yup";

import { UserService } from "../services/user.service";
import {
  newUserSerializer,
  userLoginSerializer,
} from "../serializers/user.serializer";
import { JwtTokenPayload } from "../common/app.type";
import { jwtService } from "../services/jwt.service";

const userService = new UserService();

export const signUpController = async (req: Request, res: Response) => {
  try {
    const userData = await newUserSerializer.validate(req.body, {
      stripUnknown: true,
    });
    const result = await userService.createUser(userData);
    return res.status(201).send({ ...result, password: undefined });
  } catch (err: any) {
    if (err instanceof ValidationError) {
      return res.status(400).send({ message: err.message });
    }

    res.status(500).send({ message: (err as Error)?.message });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const loginData = await userLoginSerializer.validate(req.body);
    const { email, password } = loginData;
    const result = await userService.isValidCredentials(email, password);
    if (!result) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    const token = await userService.createAccessToken(email);
    return res.status(200).send({ accessToken: token });
  } catch (err) {
    if (err instanceof ValidationError) {
      return res.status(400).send({ message: err.message });
    }

    res.status(500).send({ message: (err as Error)?.message });
  }
};

export const getUserController = async (req: Request, res: Response) => {
  try {
    const authHeader = req.header("Authorization") ?? "";
    const tokenPayload = jwtService.decodeTokenFromHeader(
      authHeader
    ) as JwtTokenPayload;

    const user = await userService.getUser(tokenPayload.sub);
    res.status(200).json({ ...user, password: undefined });
  } catch (err) {
    if (err instanceof ValidationError) {
      return res.status(400).send({ message: err.message });
    }

    res.status(500).send({ message: (err as Error)?.message });
  }
};
