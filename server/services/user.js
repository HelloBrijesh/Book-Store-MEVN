import { User } from "../models/user";

export const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId).select(
      "-password -verified -updatedAt -__V"
    );
    return user;
  } catch (error) {
    return error;
  }
};

export const updateUserById = async (
  userId,
  userName,
  firstName,
  lastName,
  email,
  image
) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        userName: userName,
        firstName: firstName,
        lastName: lastName,
        email: email,
        image: image,
      },
      { new: true }
    );
    return updatedUser;
  } catch (error) {
    return error;
  }
};

export const createUser = async (userName, email, password) => {
  const newUser = new User({
    userName,
    email,
    password,
  });
  try {
    const createdUser = await newUser.save();
    return createdUser;
  } catch (error) {
    return error;
  }
};

export const updatePasswordByUserId = async (userId, newPassword) => {
  try {
    await User.findByIdAndUpdate(userId, {
      password: newPassword,
    });
  } catch (error) {
    return error;
  }
};

export const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email: email });
    return user;
  } catch (error) {
    return error;
  }
};

export const updateUserVerified = async (userId) => {
  try {
    await User.findByIdAndUpdate(userId, {
      verified: true,
    });
  } catch (error) {
    return error;
  }
};
