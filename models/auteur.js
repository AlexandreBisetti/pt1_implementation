const sql = require("../DataB");

// constructor Auteur
const Auteur = function(auteur) {
  this.Nom_complet = auteur.Nom_complet;
};


// on utilise query() pour se connecteur à la BD et passer les requêtes SQL insert/select/etc...
Auteur.create = (newAuteur, result) => {
  sql.query("INSERT INTO Auteur SET ?", newAuteur, (err, res) => {
    if (err) {
      console.log("erreur: ", err);
      result(err, null);
      return;
    }
    console.log("nouvel auteur: ", { id: res.insertId, ...newAuteur });
    result(null, { id: res.insertId, ...newAuteur });
  });
};

Auteur.findById = (auteursID, result) => {
  sql.query("SELECT * FROM Auteur WHERE ID_auteur = ?", auteursID, (err, res) => {
    if (err) {
      console.log("erreur: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Auteur trouvé: ", res[0]);
      result(null, res[0]);
      return;
    }

    // auteur pas trouvé avec cet ID
    result({ kind: "Auteur pas trouvé" }, null);
  });
};

Auteur.findByNameLastName = (auteursNOMcomplet, result) => {
  sql.query(`SELECT ID_auteur FROM Auteur WHERE Nom_complet = "${auteursNOMcomplet}"`, (err, res) => {
    if (err) {
      console.log("erreur: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("ID auteur: ", res[0]);
      result(null, res[0]);
      return;
    }
    console.log("Resultat ", { resultat : false});
    result(null, { resultat : false});
  });
};

Auteur.findAuteurOf = (livresID, result) => {
  sql.query(`SELECT Auteur.Nom_complet FROM Auteur, Auteur_livre, Livre WHERE Auteur.ID_auteur = Auteur_livre.ID_auteur and Auteur_livre.ID_livre = Livre.ID_livre and Livre.ID_livre = "${livresID}"`, (err, res) => {
    if (err) {
      console.log("erreur: ", err);
      result(err, null);
      return;
    }
    console.log("Auteurs du livre trouvé: ", res);
    result(null, res);
  });
};

Auteur.getAll = result => {
  sql.query("SELECT * FROM Auteur", (err, res) => {
    if (err) {
      console.log("erreur: ", err);
      result(null, err);
      return;
    }

    console.log("Liste d'auteurs: ", res);
    result(null, res);
  });
};

Auteur.remove = (id, result) => {
  sql.query("DELETE FROM Auteur WHERE ID_auteur = ?", id, (err, res) => {
    if (err) {
      console.log("erreur: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // pas trouvé d'auteur avec l'ID
      result({ kind: "auteur pas trouvé" }, null);
      return;
    }

    console.log("auteur avec id supprimé: ", id);
    result(null, res);
  });
};

module.exports = Auteur;
