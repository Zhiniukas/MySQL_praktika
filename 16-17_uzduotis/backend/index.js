const mysql = require("mysql2/promise");
const express = require("express");
require("dotenv").config();
const app = express();

app.use(express.json());

const PORT = 5_000;

const MYSQL_CONFIG = {
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  port: process.env.port,
  database: process.env.database,
};

app.get("/cars", async (_, res) => {
  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);

    const result = await con.execute(`SELECT * FROM cars;`);

    await con.end();

    res.send(result[0]).end();
  } catch (err) {
    res.status(500).send(err).end();
    return console.error(err);
  }
});

app.get("/cars/:id", async (req, res) => {
  const id = req.params.id;

  if (id) cleanId = +mysql.escape(id).replaceAll("'", "");

  if (cleanId < 0 || Number.isNaN(cleanId) || typeof cleanId !== "number") {
    return res.status(400).send(`Incorrect car ID provided: ${id}`).end();
  }

  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);

    const result = await con.execute(
      `SELECT * FROM cars WHERE id = ${cleanId}`
    );

    await con.end();

    res.send(result[0]).end();
  } catch (err) {
    res.status(500).send(err).end();
    return console.error(err);
  }
});

app.post("/cars", async (req, res) => {
  console.log(req.body);
  const title = req.body.title.trim();
  const url = req.body.image.trim();
  const price = req.body.price;
  const numberPlate = req.body.numberplates.trim();

  const cleanTitle = mysql.escape(title).replaceAll("'", "");
  const cleanUrl = mysql.escape(url).replaceAll("'", "");
  const cleanPrice = +mysql.escape(price).replaceAll("'", "");
  const cleanPlate = mysql.escape(numberPlate).replaceAll("'", "");

  console.log(cleanPlate,cleanPrice, cleanTitle, cleanUrl);
  const id = new Date().getTime().toString(36);
  const postDate = new Date().toISOString();

  if (typeof title !== "string" || !title) {
    return res.status(400).send(`Incorrect car title provided: ${title}`).end();
  }

  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);

    const result = await con.execute(
      `INSERT INTO cars (id, date, title, image, price, numberplates) VALUES('${id}', '${postDate}', '${cleanTitle}', '${cleanUrl}', '${cleanPrice}',' ${cleanPlate}')`
    );

    await con.end();

    res.send(result[0]).end();
  } catch (err) {
    res.status(500).send(err).end();
    return console.error(err);
  }
});

app.delete("/cars/:id", async (req, res) => {
  const itemId = req.params.id;
  const cleanId = +mysql.escape(itemId).replaceAll("'", "");

  if (cleanId < 0 || Number.isNaN(cleanId) || typeof cleanId !== "number") {
    return res
      .status(400)
      .send(`Incorrect delete id provided: ${itemId}`)
      .end();
  }

  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);

    const result = await con.execute(`DELETE FROM cars WHERE id = ${cleanId}`);

    await con.end();

    res.send(result[0]).end();
  } catch (err) {
    res.status(500).send(err).end();
    return console.error(err);
  }
});

app.post("/table", async (req, res) => {
  const name = req.body?.name.trim();

  if (!name) {
    return res.status(400).send(`Incorrect table name provided: ${name}`).end();
  }

  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);

    const result = await con.execute(
      `CREATE table ${name}(
          id  NOT NULL , PRIMARY KEY(id), title TEXT, image TEXT, price DECIMAL(10,2), numberplates VARCHAR(10))`
    );

    await con.end();

    res.status(201).send("Table successfully created").end();
  } catch (err) {
    res.status(500).send(err).end();
    return console.error(err);
  }
});

app.listen(PORT, () => {
  console.log(`Backend server is running on Port: ${PORT}`);
});
