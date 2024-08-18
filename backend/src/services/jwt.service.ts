import jwt from "jsonwebtoken";

import { APP_CONFIG } from "../config/app.config";

export class JwtService {
  private readonly supportedTokenTypes = ["Bearer"];
  async createAccessToken(payload: object) {
    const tokenPayload = {
      iss: APP_CONFIG.jwtIssuer,
      iat: Date.now(),
      ...payload,
    };

    const jwtToken = jwt.sign(tokenPayload, APP_CONFIG.jwtKey, {
      expiresIn: APP_CONFIG.jwtExpirationInSeconds,
    });

    return jwtToken;
  }

  validateToken(token: string) {
    const payload = jwt.verify(token, APP_CONFIG.jwtIssuer);
    return payload;
  }

  decodeToken(token: string, verify = false) {
    if (!verify) {
      return jwt.decode(token, { json: true });
    }
    return this.validateToken(token);
  }

  private separateTokenValue(rawAuthorizationHeader: string) {
    const [tokenType, tokenValue] = rawAuthorizationHeader.split(/\s+/);
    if (!this.supportedTokenTypes.includes(tokenType)) {
      throw new Error(`Unsupported token type "${tokenType}"`);
    }
    return tokenValue;
  }

  validateTokenFromHeader(rawHeader: string) {
    const tokenValue = this.separateTokenValue(rawHeader);
    return this.validateToken(tokenValue);
  }

  decodeTokenFromHeader(rawHeader: string) {
    const tokenValue = this.separateTokenValue(rawHeader);
    return this.decodeToken(tokenValue);
  }
}

export const jwtService = new JwtService();
