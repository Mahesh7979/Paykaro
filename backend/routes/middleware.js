const jwt = require("jsonwebtoken");
require("dotenv").config();
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({
      msg: "!auth",
    });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded && decoded.userId) {
      req.userId = decoded.userId;
      next();
    } else
      return res.status(403).json({
        msg: "!decode",
      });
  } catch (error) {
    console.log("error", error);
    return res.status(403).json({
      msg: error,
    });
  }
};

module.exports = authMiddleware;
