import dotenv from "dotenv";
import type { SignOptions } from "jsonwebtoken";
import ms from "ms";

dotenv.config();

const jwtExp = process.env.JWT_EXPIRATION || "24h";

export const config = {
  port: parseInt(process.env.PORT || "4000", 10),
  mongodbUri:
    process.env.MONGODB_URI || "mongodb://localhost:27017/algorithmics",
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
  nodeEnv: process.env.NODE_ENV || "development",

  jwtSecret: process.env.JWT_SECRET || "dev_secret_key",
  jwtExpiration: jwtExp as SignOptions["expiresIn"],

  cookieMaxAge: ms(jwtExp as ms.StringValue),
  saltRounds: parseInt(process.env.SALT_ROUNDS || "10", 10),

  refreshTokenSecret:
    process.env.REFRESH_TOKEN_SECRET || "dev_refresh_secret",
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d",
  refreshCookieMaxAge: ms(
    (process.env.REFRESH_TOKEN_EXPIRES_IN || "7d") as ms.StringValue,
  ),

  gmailUser: process.env.GMAIL_USER || "",
  gmailAppPassword: process.env.GMAIL_APP_PASSWORD || "",
};
