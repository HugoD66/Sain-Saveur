const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("./tokenService");
const { getIo } = require("../db/socketIo/socket");
const { v4: uuidv4 } = require("uuid");

const loginUser = async (req, res) => {
  try {
    console.log("loginUser!!!");
    console.log(req.body);
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Email et mot de passe sont requis." });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé." });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: "Mot de passe incorrect." });
    }

    const token = generateToken(user);

    const io = getIo();
    //TODO
    // Ici, au lieu d'émettre à tous, vous pouvez émettre à un seul utilisateur si vous avez son identifiant de socket
    // Pour cet exemple, nous émettons globalement
    io.emit("notification", {
      id: uuidv4(),
      type: "user",
      title: "Connexion réussie",
      content: {
        pseudo: user.username,
        message: "Bienvenue !",
      },
      date: new Date().toISOString(),
      seen: false,
    });

    res.json({ message: "Connexion réussie", token });
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    res.status(500).send("Erreur interne du serveur.");
  }
};

module.exports = loginUser;
