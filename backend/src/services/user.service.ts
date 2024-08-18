import bcrypt from "bcrypt";

import { IUserCreate } from "../interfaces/user";
import { UserRepository } from "../repository/user";
import { jwtService } from "./jwt.service";

export class UserService {
  private userRepository = new UserRepository();
  private readonly saltRounts = 10;

  async createUser(userData: IUserCreate) {
    const hashedPassword = await bcrypt.hash(
      userData.password,
      this.saltRounts
    );

    return this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });
  }

  async isValidCredentials(email: string, plainTextPassword: string) {
    const user = await this.userRepository.findByEmail(email);
    return bcrypt.compare(plainTextPassword, user.password);
  }

  async createAccessToken(email: string) {
    const user = await this.userRepository.findByEmail(email);
    const jwtToken = jwtService.createAccessToken({
      sub: user.id,
      email: user.email,
    });

    return jwtToken;
  }
}
