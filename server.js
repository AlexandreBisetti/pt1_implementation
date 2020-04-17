// import express + body-parser
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const connection = require("./DataB");
const cors = require('cors');

// parse pour le body --> req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());

// default route serveur, si une requête sur ce path on retourne
// comme "res (result)" un json.
app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur notre service d'échange de livre" });
});

require("./routes/auteur_routes")(app);
require("./routes/personne_routes")(app);
require("./routes/client_routes")(app);
require("./routes/employe_routes")(app);
require("./routes/livre_routes")(app);
require("./routes/genre_routes")(app);
require("./routes/alias_routes")(app);
require("./routes/auteurLivre_routes")(app);
require("./routes/genreLivre_routes")(app);
require("./routes/interetGenre_routes")(app)
require("./routes/interetLivre_routes")(app)
require("./routes/interetAuteur_routes")(app)

// Connection MYSQL
  connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
  });

// le serv liste sur le port 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
