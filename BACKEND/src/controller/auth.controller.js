// import { findUserByEmail } from "../DAO/user.dao";
import { cookieConfigurations } from "../config/cookieConfig.js";
import {
  loginUserService,
  registerUserService,
} from "../services/User.service.js";
import { catchAsync } from "../utils/TryCatchWrapper.js";

export const registerUser = catchAsync(async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ message: "All fields are required" });
  } else {
    const { token, user } = await registerUserService(email, password, name);
    console.log("typing token",token);
    //  setting  cookie with  jwt token
    req.user = user;
    res.cookie("accessToken", token, cookieConfigurations());
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        password: password,
        hashed: user.password,
      },
    });
  }
});

export const loginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const { token, user } = await loginUserService(email, password);
  console.log(user);
  req.user = user;
  res.cookie("accessToken", token, cookieConfigurations());
  console.log(req.cookies);
  
  res.status(200).json({
    success: true,
    message: "Login successful",
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
    },
  });
});
