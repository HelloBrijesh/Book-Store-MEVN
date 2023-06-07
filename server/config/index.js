import dotenv from "dotenv";
dotenv.config();

export const {
  DEV_PORT,
  DB_URL,
  CLIENT_URL,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  SERVICE,
  EMAIL_PORT,
  SECURE,
  USER,
  PASS,
} = process.env;
