const pgp = require("pg-promise")();
const db = pgp({
  host: process.env.POSTGRES_HOST || "localhost",
  port: process.env.POSTGRES_PORT || 5432,
  database: process.env.POSTGRES_DB || "sample",
  user: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "postgres",
});

const getCars = (req, res) => {
  const { offset = 0, limit = 20 } = req.query;
  db.any("SELECT * FROM cars ORDER BY model OFFSET $1 LIMIT $2", [
    offset,
    limit,
  ])
    .then((carListFromDb) => res.send(carListFromDb))
    .catch((error) => res.status(500).send(error));
};

const getCarsCount = (req, res) =>
  db
    .any("SELECT COUNT(id) FROM cars")
    .then((carCountFromDb) => res.send(carCountFromDb[0]))
    .catch((error) => res.status(500).send(error));

const addCar = (req, res) => {
  const car = req.body;
  db.one("INSERT INTO cars(make, model) VALUES($1, $2) RETURNING id", [
    car.make,
    car.model,
  ])
    .then((result) => {
      res.send({
        id: result.id,
        make: car.make,
        model: car.model,
      });
    })
    .catch((error) => res.status(500).send(error));
};

const removeCar = (req, res) => {
  const id = req.params.id;
  db.result("DELETE FROM cars WHERE id = $1", [id])
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
  getCars,
  getCarsCount,
  addCar,
  removeCar,
};
