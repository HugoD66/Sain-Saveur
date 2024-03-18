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
  {
    type_id: "4",
    type_name: "Végan",
  },
  {
    type_id: "5",
    type_name: "Sans gluten",
  },
  {
    type_id: "6",
    type_name: "Italienne",
  },
  {
    type_id: "7",
    type_name: "Mexicaine",
  },
  {
    type_id: "8",
    type_name: "Japonaise",
  },
  {
    type_id: "9",
    type_name: "Chinoise",
  },
  {
    type_id: "10",
    type_name: "Indienne",
  },
  {
    type_id: "11",
    type_name: "Méditerranéenne",
  },
  {
    type_id: "12",
    type_name: "Rapide et facile",
  },
  {
    type_id: "13",
    type_name: "Gastronomique",
  },
];
async function insertTypes() {
  try {
    const createdTypes = await Type.insertMany(types);
    console.log(
      `${createdTypes.length} types de plats différents ont été créés avec succès.`,
    );
  } catch (error) {
    console.log("erreur");
  }
}
module.exports = insertTypes;
