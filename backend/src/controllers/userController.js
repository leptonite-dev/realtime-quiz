import { User } from "../models/UserModel.js";

export const createUser = async (user) => {
  try {
    return await User.create(user);
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (id, attributes = false) => {
  try {
    return await User.findOne({
      where: {
        id,
      },
      attributes,
    });
  } catch (error) {
    throw error;
  }
};

export const getUserByEmail = async (email) => {
  try {
    return await User.findOne({
      where: { email: email },
      attributes: ["id", "role", "email", "password"],
    });
  } catch (error) {
    throw error;
  }
};

export const getAllUser = async () => {
  try {
    return await User.findAll();
  } catch (error) {
    throw error;
  }
};
