const sql = require("../DataB");

const Livre = function(livre) {
  this.ID_Personne_Enregistre = livre.ID_Personne_Enregistre;
  this.ISBN = livre.ISBN;
  this.Titre = livre.Titre;
  this.Description = livre.Description;
  this.Editeur = livre.Editeur;
  this.Annee_parution = livre.Annee_parution;
  this.Langue = livre.Langue;
  this.Verifie = livre.Verifie;
};

Livre.create = (newLivre, result) => {
  sql.query("INSERT INTO Livre SET ?", newLivre, (err, res) => {
    if (err) {
      console.log("erreur: ", err);
      result(err, null);
      return;
    }
    console.log("nouveau livre: ", { id: res.insertId, ...newLivre });
    result(null, { id: res.insertId, ...newLivre });
  });
};

Livre.findById = (livresID, result) => {
  sql.query(`SELECT * FROM Auteur WHERE ID_Livre = ${livresID}`, (err, res) => {
    if (err) {
      console.log("erreur: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Livre trouvé: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "Livre pas trouvé" }, null);
  });
};

Livre.getAll = result => {
  sql.query("SELECT * FROM Livre", (err, res) => {
    if (err) {
      console.log("erreur: ", err);
      result(null, err);
      return;
    }

    console.log("Liste des livres: ", res);
    result(null, res);
  });
};

Livre.remove = (id, result) => {
  sql.query(`DELETE FROM Livre WHERE ID_Livre = ${id}`, (err, res) => {
    if (err) {
      console.log("erreur: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "Livre pas trouvé" }, null);
      return;
    }

    console.log("Livre avec id supprimé: ", id);
    result(null, res);
  });
};

module.exports = Livre;
