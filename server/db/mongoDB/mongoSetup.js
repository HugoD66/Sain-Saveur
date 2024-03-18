const mongoose = require('mongoose');

async function initMongo() {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect('mongodb://localhost:27017/mydatabase', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
    console.log('Connecté à MongoDB avec succès.');
  } catch (error) {
    console.error('Erreur de connexion à MongoDB:', error);
  }
}

module.exports = initMongo;
