import jwt from "jsonwebtoken";
import { RefreshToken } from "../models/refreshToken";
import { EmailToken } from "../models/emailToken";
import {
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRY,
  ACCESS_TOKEN_EXPIRY,
  ACCESS_TOKEN_SECRET,
} from "../config";

export const createAccessToken = async (userId, role) => {
  try {
    const access_token = jwt.sign(
      { userId: userId, role: role },
      ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRY }
    );
    return access_token;
  } catch (error) {
    return error;
  }
};

export const verifyAccessToken = async (token) => {
  try {
    const { userId, role } = jwt.verify(token, ACCESS_TOKEN_SECRET);
    return { userId, role };
  } catch (error) {
    return error;
  }
};

export const createRefreshToken = async (userId, role) => {
  try {
    const refresh_token = jwt.sign(
      { userId: userId, role: role },
      REFRESH_TOKEN_SECRET,
      {
        expiresIn: REFRESH_TOKEN_EXPIRY,
      }
    );
    return refresh_token;
  } catch (error) {
    return error;
  }
};

export const verifyRefreshToken = async (token) => {
  try {
    const tokenData = jwt.verify(token, REFRESH_TOKEN_SECRET);
    return tokenData;
  } catch (error) {
    return error;
  }
};

export const saveRefreshToken = async (refresh_token) => {
  try {
    await RefreshToken.create({ savedRefreshToken: refresh_token });
  } catch (error) {
    return error;
  }
};

export const getRefreshToken = async (refresh_token) => {
  try {
    const verifiedRefreshToken = await RefreshToken.findOne({
      savedRefreshToken: refresh_token,
    });
    return verifiedRefreshToken;
  } catch (error) {
    return error;
  }
};

export const deleteRefreshtoken = async (refresh_token) => {
  try {
    await RefreshToken.deleteOne({ savedRefreshToken: refresh_token });
  } catch (error) {
    return error;
  }
};

export const saveEmailToken = async (userId, token) => {
  try {
    const emailToken = new EmailToken({
      emailToken: token,
      userId: userId,
    });
    await emailToken.save();
  } catch (error) {
    return error;
  }
};

export const getEmailToken = async (token) => {
  try {
    const verificationDetail = await EmailToken.findOne({
      emailToken: token,
    });

    return verificationDetail;
  } catch (error) {
    return error;
  }
};

export const deleteEmailToken = async (token) => {
  try {
    await EmailToken.deleteOne({
      emailToken: token,
    });
  } catch (error) {
    return error;
  }
};
