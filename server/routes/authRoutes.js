const express = require("express");
const router = express.Router();
const registerUser = require("../security/registration");
const loginUser = require("../security/login");

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
