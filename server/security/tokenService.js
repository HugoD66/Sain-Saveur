const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const secretKey =
  "5ab6a472fe1a8f99d816b07df75becd4d24b9f78daaa3c5cbbf111b0e1d9f315";

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username, email: user.email },
    secretKey,
    { expiresIn: "24h" },
  );
};
const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    console.error(err);
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
