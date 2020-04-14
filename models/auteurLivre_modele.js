const sql = require("../DataB");

const AuteurLivre = function(auteurLivre) {
    this.ID_Livre = auteurLivre.ID_Livre;
    this.ID_auteur = auteurLivre.ID_auteur;
};

AuteurLivre.AuteurDe = (auteursID, livresID, result) => {
    sql.query(`INSERT INTO Auteur_livre SET ID_Livre = ${livresID}, ID_auteur = ${auteursID}`, (err, res) => {
      if (err) {
        console.log("erreur: ", err);
        result(err, null);
        return;
      }
      console.log("Livre pris", { id_livre: livresID, id_auteur: auteursID });
      result(null, { id_livre: livresID, id_auteur: auteursID });
    });
  };

AuteurLivre.remove = (idAuteur, idLivre, result) => {
  sql.query(`DELETE FROM Auteur_livre WHERE ID_auteur = ${idAuteur} and ID_Livre = ${idLivre}`,(err, res) => {
    if (err) {
      console.log("erreur: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "auteurLivre pas trouvé" }, null);
      return;
    }

    console.log("auteurLivre avec id supprimé: ", idAuteur);
    result(null, res);
  });
};

module.exports = AuteurLivre;