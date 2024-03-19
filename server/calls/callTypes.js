const Type = require("../models/TypeModel");

// ---------- GET ---------------- //

const getType = async (req, res) => {
  try {
    const typeId = req.params.type_id;
    const type = await Type.findById({ typeId });
    if (type) {
      res.json(type);
    }
  } catch (err) {
    console.error(error);
    res.status(500).send("Erreur serveur");
  }
};

const getTypes = async (req, res) => {
  try {
    const types = await Type.find({});
    res.json(types);
  } catch (err) {
    console.error(error);
    res.status(500).send("Erreur serveur");
  }
};

// -------------- POST ---------------- //
const addType = async (req, res) => {
  try {
    const typeData = req.body;
    const newType = new Type(typeData);
    const savedType = await newType.save();
    res.status(201).json(savedType);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
};

// ---------- REMOVE ---------------- //
const removeType = async (req, res) => {
  try {
    const typeId = req.params.typeId;
    const result = await Type.deleteOne({ _id: typeId });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
};
const removeTypes = async (req, res) => {
  try {
    const result = await Type.deleteMany({});
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
};

module.exports = { getType, getTypes, addType, removeType, removeTypes };
