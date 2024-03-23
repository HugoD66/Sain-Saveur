const User = require("../models/UserModel");
const { hashPassword } = require("./authHelpers");
const { generateToken } = require("./tokenService");
const { getIo } = require("../db/socketIo/socket");
const { v4: uuidv4 } = require("uuid");

const registerUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
      return res.status(400).json({ error: "Tous les champs sont requis" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ error: "L'email est déjà utilisé par un autre compte." });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      email,
      username,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    const token = generateToken(savedUser);

    const io = getIo();
    io.emit("notification", {
      id: uuidv4(),
      type: "user",
      title: "Nouvel utilisateur inscrit",
      content: {
        username: savedUser.username,
        email: savedUser.email,
      },
      date: new Date().toISOString(),
      seen: false,
    });
    res.status(201).json({ user: savedUser, token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur interne du serveur");
  }
};

module.exports = registerUser;
