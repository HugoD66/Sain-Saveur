const users = [
  {
    email: "user1@example.com",
    username: "user1",
    password: "password1",
  },
  {
    email: "user2@example.com",
    username: "user2",
    password: "password2",
  },
  {
    email: "user3@example.com",
    username: "user3",
    password: "password3",
  },
];

function insertUsers(db) {
  users.forEach((user) => {
    const { email, username, password } = user;
    const sql = `INSERT INTO Users (email, username, password) VALUES (?, ?, ?)`;
    db.run(sql, [email, username, password], function (err) {
      if (err) {
        console.error(
          `Erreur lors de l'ajout de l'utilisateur ${username}: ${err.message}`,
        );
      } else {
        console.log(`Utilisateur '${username}' ajouté avec succès.`);
      }
    });
  });
}

module.exports = insertUsers;
