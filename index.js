const mysql = require("mysql2/promise");
const express = require("express");
require("dotenv").config();
const app = express();

app.use(express.json());

const PORT = 5_000;

const MYSQL_CONFIG =
{
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  port: process.env.port,
  database: process.env.database,
};

app.get("/items", async (req, res) => {
    const  lenght = req.query.lenght;

 let cleanLength=5; //default SELECT query lenght

 if (lenght) cleanLength = +mysql.escape(lenght).replaceAll("'","")
  
    if ( cleanLength < 0 || Number.isNaN(cleanLength) || typeof cleanLength !== "number") {
      return res
        .status(400)
        .send(`Incorrect query lenght provided: ${lenght}`)
        .end();
    }

    try {
      const con = await mysql.createConnection(MYSQL_CONFIG);
  
      const result = (await con.execute(
        `SELECT * FROM items LIMIT ${cleanLength}`
      ))[0];
       
      await con.end();
  
      res.send(result).end();
    } catch (err) {
      res.status(500).send(err).end(); 
      return console.error(err);
    }
  });
  
app.post("/items", async (req, res) => {
    const title = req.body.title.trim();
    const cleanTitle = mysql.escape(title).replaceAll("'","");

    if (typeof title !== "string" || !title) {
        return res
          .status(400)
          .send(`Incorrect title provided: ${title}`)
          .end();
      }

    try {
      const con = await mysql.createConnection(MYSQL_CONFIG);

      const result = await con.execute(
        `INSERT INTO items (title) VALUES('${cleanTitle}')`
      );
       
      await con.end();
  
      res.send(result[0]).end();
    } catch (err) {
      res.status(500).send(err).end(); 
      return console.error(err);
    }
  });

app.delete("/items/:id", async (req, res) => {
    const itemId = req.params.id;
    const cleanId = +mysql.escape(itemId).replaceAll("'","")

    if ( cleanId < 0 || Number.isNaN(cleanId) || typeof cleanId !== "number") {
      return res
        .status(400)
        .send(`Incorrect delete id provided: ${itemId}`)
        .end();
    }

       try {
      const con = await mysql.createConnection(MYSQL_CONFIG);
  
      const result = await con.execute(
        `DELETE FROM items WHERE id = ${cleanId}`
      );
        
      await con.end();
  
      res.status(202).send(result).end();
    } catch (err) {
      res.status(500).send(err).end(); 
      return console.error(err);
    }
  });

app.post("/table", async (req, res) => {
    const name = req.body?.name.trim();
    const cleanName = mysql.escape(name).replaceAll("'","")


    //to do: pasidaryti escape table kodui
  
    if (!cleanName) {
      return res.status(400).send(`Incorrect table name provided: ${cleanName}`).end();
    }
    
    try {
      const con = await mysql.createConnection(MYSQL_CONFIG);
  
      const result = await con.execute(
        `CREATE table ${cleanName}(id int NOT NULL AUTO_INCREMENT, title varchar(35), PRIMARY KEY (id))`
      );
  
      await con.end();
  
      res.status(201).send("Table successfully created").end();
    } catch (err) {
      res.status(500).send(err).end();
      return console.error(err);
    }
  });

  app.listen(PORT, () => {
    console.log(`Server is running. Listening on Port: ${PORT}`);
  });