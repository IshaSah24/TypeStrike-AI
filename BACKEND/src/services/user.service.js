import { createUser, findUserByEmail } from "../DAO/user.dao.js";
import { AppError } from "../utils/appError.js";
import { signToken } from "../utils/helper.js";
import bcrypt from "bcrypt";

export const registerUserService = async (email, password, name) => {
  const user = await findUserByEmail(email);

  if (user) {
    throw new AppError("User already  exist", 409);
  }

  const newUser = await createUser(email, password, name);
  const token = signToken({ id: newUser._id });

  return { token, user: newUser };
};

export const loginUserService = async (email, password) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new AppError("Invalid credentials!", 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError("Invalid credentials!", 401);
  }

  const token = signToken({ id: user._id });

  return {token, user};
};
