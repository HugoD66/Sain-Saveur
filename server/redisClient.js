const redis = require("redis");

// Création et connexion du client Redis
const redisClient = redis.createClient({
    url: "redis://localhost:6380" // Assurez-vous que cette URL correspond à votre configuration Redis
});

redisClient.connect().catch(console.error);

// Exporter le client pour l'utiliser dans d'autres parties de l'application
module.exports = redisClient;
