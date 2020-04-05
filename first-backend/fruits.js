const pgp = require("pg-promise")();
const db = pgp({
  host: process.env.POSTGRES_HOST || "localhost",
  port: process.env.POSTGRES_PORT || 5432,
  database: process.env.POSTGRES_DB || "sample",
  user: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "postgres",
});

const getFruits = (req, res) =>
  db
    .any("SELECT * FROM fruits")
    .then((fruitListFromDb) => res.send(fruitListFromDb))
    .catch((error) => res.status(500).send(error));

const addFruit = (req, res) => {
  const fruit = req.body;
  db.one(
    "INSERT INTO fruits(type, name, image) VALUES($1, $2, $3) RETURNING id",
    [fruit.type, fruit.name, fruit.image]
  )
    .then((result) => {
      res.send({
        id: result.id,
        type: fruit.type,
        name: fruit.name,
        image: fruit.image,
      });
    })
    .catch((error) => res.status(500).send(error));
};

const removeFruit = (req, res) => {
  const id = req.params.id;
  db.result("DELETE FROM fruits WHERE id = $1", [id])
    .then((result) => {
      if (result.rowCount > 0) {
        res.send("OK");
      } else {
        res.status(404).send("Not Found!");
      }
    })
    .catch((error) => res.status(500).send(error));
};

module.exports = {
  getFruits,
  addFruit,
  removeFruit,
};
