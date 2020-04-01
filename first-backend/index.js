const express = require("express");
const fruits = require("./fruits");
const cars = require("./cars");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
const port = 4001;

app.use("/files", express.static("public"));
app.get("/hello", (req, res) => res.send("Hello World, I am here"));

app.get("/fruits", (req, res) => fruits.getFruits(req, res));
app.post("/fruits", (req, res) => fruits.addFruit(req, res));
app.delete("/fruits/:id", (req, res) => fruits.removeFruit(req, res));

app.get("/cars", (req, res) => cars.getCars(req, res));
app.get("/cars/count", (req, res) => cars.getCarsCount(req, res));
app.post("/cars", (req, res) => cars.addCar(req, res));
app.delete("/cars/:id", (req, res) => cars.removeCar(req, res));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
