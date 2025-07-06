import express from "express";
import { loginUser, registerUser } from "../controller/auth.controller.js";
import jwt from "jsonwebtoken";
import { findById } from "../DAO/user.dao.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/me", async (req, res) => {
  const token = req.cookies.accessToken;
  console.log("from /me", token);

  if (!token) {
    return res.status(401).json({ message: "Not logged in" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // 👈 use process.env
    const user = await findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Don't send password or sensitive data
    return res.status(200).json({
      id: user._id,
      email: user.email,
      name: user.name,
      // any other safe fields
    });
  } catch (err) {
    console.error("JWT Verify Error:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
});

export default router;
