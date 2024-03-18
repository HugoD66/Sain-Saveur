const express = require("express");
const router = express.Router();
const {
  getTypes,
  getType,
  addType,
  removeType,
  removeTypes,
} = require("../calls/callTypes");

router.get("/:type_id", getType);
router.get("/", getTypes);
router.post("/add", addType);
router.delete("/:typeId", removeType);
router.delete("/", removeTypes);

module.exports = router;
