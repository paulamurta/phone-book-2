import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { IUserCreate } from "../interfaces/user";
import { UserRepository } from "../repository/user";
import { APP_CONFIG } from "../config/app.config";
import { JwtTokenPayload } from "../common/app.type";

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

    const tokenPayload: JwtTokenPayload = {
      iss: APP_CONFIG.jwtIssuer,
      sub: user.id,
      email: user.email,
      iat: Date.now(),
    };

    const jwtToken = jwt.sign(tokenPayload, APP_CONFIG.jwtKey, {
      expiresIn: APP_CONFIG.jwtExpirationInSeconds,
    });

    return jwtToken;
  }
}
