import Type from "../models/TypeModel";

const getType = async (req, res) => {
  try {
    const typeId = req.params.type_id;
    const type = await Type.find({});
  } catch (err) {
    console.error(error);
    res.status(500).send("Erreur serveur");
  }
};

const getTypes = async (req, res) => {
  try {
    const types = await Type.find({});
  } catch (err) {
    console.error(error);
    res.status(500).send("Erreur serveur");
  }
};
