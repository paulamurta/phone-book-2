import { Request, Response } from "express";
import { ValidationError } from "yup";

import { UserService } from "../services/user.service";
import {
  newUserSerializer,
  userLoginSerializer,
} from "../serializers/user.serializer";

export class UserController {
  private readonly userService = new UserService();

  async signUp(req: Request, res: Response) {
    try {
      const userData = await newUserSerializer.validate(req.body);
      const result = await this.userService.createUser(userData);
      return res.status(201).send({ ...result, password: undefined });
    } catch (err: any) {
      if (err instanceof ValidationError) {
        return res.status(400).send({ message: err.message });
      }

      res.status(500).send({ message: (err as Error)?.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const loginData = await userLoginSerializer.validate(req.body);
      const { email, password } = loginData;
      const result = await this.userService.isValidCredentials(email, password);
      if (!result) {
        return res.status(401).send({ message: "Invalid credentials" });
      }

      const token = this.userService.createAccessToken(email);
      return res.status(200).send({ accessToken: token });
    } catch (err) {
      if (err instanceof ValidationError) {
        return res.status(400).send({ message: err.message });
      }

      res.status(500).send({ message: (err as Error)?.message });
    }
  }
}
