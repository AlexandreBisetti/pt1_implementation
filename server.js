// import express + body-parser
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const connection = require("./DataB");

// parse pour le body --> req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// default route serveur
app.get("/", (req, res) => {
  res.json({ message: "Wallah t'es sur la page FDP." });
});

require("./routes/auteur_routes")(app);

// Connection MYSQL
  connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
  });

// le serv liste sur le port 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
