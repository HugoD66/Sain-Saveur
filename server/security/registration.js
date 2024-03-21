const User = require("../models/UserModel");
const { hashPassword } = require("./authHelpers");
const { generateToken } = require("./tokenService");

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

    res.status(201).json({ user: savedUser, token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur interne du serveur");
  }
};

module.exports = registerUser;
