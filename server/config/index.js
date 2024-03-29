import dotenv from "dotenv";
dotenv.config();

export const {
  DEV_PORT,
  DB_URL_ONLINE,
  DB_URL_LOCAL,
  CLIENT_URL,
  SERVER_URL,
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY,
  JWT_REFRESH_SECRET,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRY,
  EMAIL_SERVICE,
  EMAIL_PORT,
  EMAIL_SECURE,
  EMAIL_USERID,
  EMAIL_PASSWORD,
} = process.env;
