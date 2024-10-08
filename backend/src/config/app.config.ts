import path from "path";
import dotenv from "dotenv";

class AppConfig {
  jwtIssuer = "PhoneBook";
  jwtKey: string;
  jwtExpirationInSeconds: string;

  constructor() {
    this.loadEnvironments();

    this.jwtKey = process.env.JWT_SECRET_KEY ?? "s3cr3tkeyjwt!@#$";
    this.jwtExpirationInSeconds = process.env.JWT_EXPIRATION_SECONDS ?? "86400";
  }

  private loadEnvironments() {
    const envPath = path.resolve(__dirname, "..", "..", ".env");
    dotenv.config({ path: envPath });
  }
}

export const APP_CONFIG = new AppConfig();
