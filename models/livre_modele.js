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
  sql.query("SELECT DISTINCT * FROM Genre, Livre, Genre_livre, Auteur, Auteur_livre WHERE Genre.ID_genre = Genre_livre.ID_genre and Genre_livre.ID_livre = Livre.ID_livre and Auteur.ID_auteur = Auteur_livre.ID_auteur and Livre.ID_livre = Auteur_livre.ID_livre and Livre.ID_livre = ?", livresID, (err, res) => {
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
  sql.query("SELECT DISTINCT * FROM Genre, Livre, Genre_livre, Auteur, Auteur_livre WHERE Genre.ID_genre = Genre_livre.ID_genre and Genre_livre.ID_livre = Livre.ID_livre and Auteur.ID_auteur = Auteur_livre.ID_auteur and Livre.ID_livre = Auteur_livre.ID_livre", (err, res) => {
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
  sql.query("DELETE FROM Livre WHERE ID_Livre = ?", id, (err, res) => {
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

Livre.Prendre = (livresID, idEchange, result) => {
  sql.query(`UPDATE Livre SET ID_Personne_Echange = ${idEchange} WHERE ID_Livre = ${livresID}`, (err, res) => {
    if (err) {
      console.log("erreur: ", err);
      result(err, null);
      return;
    }
    console.log("Livre pris", { id_livre: livresID, id_preneur: idEchange });
    result(null, { id_livre: livresID, id_preneur: idEchange });
  });
};

Livre.Verifie = (livresID, idVerifie, result) => {
  sql.query(`UPDATE Livre SET ID_Personne_Employe = ${idVerifie}, Verifie = 1 WHERE ID_Livre = ${livresID}`, (err, res) => {
    if (err) {
      console.log("erreur: ", err);
      result(err, null);
      return;
    }
    console.log("Livre verifié", { id_livre: livresID, id_employeVerifiant: idVerifie });
    result(null, { id_livre: livresID, id_employeVerifiant: idVerifie });
  });
};

Livre.Enregistrer = (livresID, idEnregistre, result) => {
  sql.query(`UPDATE Livre SET ID_Personne_Enregistre = ${idEnregistre} WHERE ID_Livre = ${livresID}`, (err, res) => {
    if (err) {
      console.log("erreur: ", err);
      result(err, null);
      return;
    }
    console.log("Livre enregistré", { id_livre: livresID, id_enrigistrage: idEnregistre });
    result(null, { id_livre: livresID, id_enrigistrage: idEnregistre });
  });
};

module.exports = Livre;
