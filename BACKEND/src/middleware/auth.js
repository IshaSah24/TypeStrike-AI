
import { findById } from "../DAO/user.dao.js";
import { verifyToken } from "../utils/helper.js";

export const isAuthenticated = async (req, res, next) => {
  console.log(req.cookies);

  const token = req.cookies.accessToken;
  console.log(token);
  

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = verifyToken(token) 
    const user = await findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user; // Attach user to req
    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
