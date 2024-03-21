const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ error: "Accès refusé, token non fourni" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: "Token invalide" });
  }
};

module.exports = authMiddleware;
