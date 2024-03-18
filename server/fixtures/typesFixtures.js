const Type = require("../models/TypeModel");

const types = [
  {
    type_id: "1",
    type_name: "Vegetarien",
  },
  {
    type_id: "2",
    type_name: "Carnivore",
  },
  {
    type_id: "3",
    type_name: "Banal",
  },
];
async function insertTypes() {
  try {
    const createdTypes = await Type.insertMany(types);
  } catch (error) {
    console.log("erreur");
  }
}
module.exports = insertTypes;
