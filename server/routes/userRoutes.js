const express = require("express");
const router = express.Router();
const {
  getUser,
  getUsers,
  addUser,
  removeUser,
  removeAllUsers,
} = require("../calls/callUsers");

router.get("/:userId", getUser);
router.get("/", getUsers);
router.post("/", addUser);
router.delete("/:userId", removeUser);
router.delete("/", removeAllUsers);

module.exports = router;
