const express = require("express");
const router = express.Router();
const { getTypes } = require("../calls/callTypes");

router.get("/", getTypes);

module.exports = router;
