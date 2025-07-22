require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const jwtAuthMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(400).json({ error: "Token missing, it means - cant access user data without signing in or try signing in again" });
  }

  try {
    const verified = jwt.verify(token, secret); // Correct method
    req.user = verified;
    console.log("Token is verified");
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ error: error.message });
  }
};

module.exports = jwtAuthMiddleware;
