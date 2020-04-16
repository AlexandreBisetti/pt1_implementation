const sql = require("../DataB");

const Livre = function (livre) {
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
  sql.query("SELECT DISTINCT * FROM Genre, Livre, Genre_livre, Auteur, Auteur_livre WHERE Genre.ID_genre = Genre_livre.ID_genre and Genre_livre.ID_livre = Livre.ID_livre and Auteur.ID_auteur = Auteur_livre.ID_auteur and Livre.ID_livre = Auteur_livre.ID_livre and Livre.Verifie = 1", (err, res) => {
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

Livre.RecommandationsBOTH = (personneID, result) => {
  sql.query(`SELECT DISTINCT Client.ID_personne, Livre.ID_Livre, Livre.Titre, Livre.Description,Genre.Genre, Auteur.Nom, Auteur.Prenom, Interet_Auteur.estInteresse_auteur, Interet_Genre.estInteresse_genre FROM Genre_livre, Livre, Auteur, Auteur_livre, Interet_Genre, Interet_Auteur, Client, Genre WHERE Livre.ID_livre = Auteur_livre.ID_livre and Auteur_livre.ID_auteur = Auteur.ID_auteur and Interet_Genre.ID_personne = Client.ID_personne and Interet_Auteur.ID_personne = Client.ID_personne and Interet_Auteur.ID_auteur = Auteur.ID_auteur and Interet_Genre.ID_genre = Genre.ID_genre and Interet_Genre.ID_genre = Genre_livre.ID_genre and Livre.ID_livre = Genre_livre.ID_livre and Livre.Verifie = 1 and estInteresse_genre = 1 and estInteresse_auteur = 1 and Client.ID_personne = ${personneID}`, (err, res) => {
    if (err) {
      console.log("erreur: ", err);
      result(null, err);
      return;
    }
    console.log("Liste des recommandations auteurs + genres: ", res);
    result(null, res);
  });
};

Livre.RecommandationsAUTEURS = (personneID, result) => {
  sql.query(`SELECT DISTINCT Client.ID_personne, Livre.ID_Livre, Livre.Titre, Livre.Description, Auteur.Nom, Auteur.Prenom, Interet_Auteur.estInteresse_auteur FROM Livre, Auteur, Auteur_livre, Interet_Auteur, Client WHERE Livre.ID_livre = Auteur_livre.ID_livre and Auteur_livre.ID_auteur = Auteur.ID_auteur and Interet_Auteur.ID_personne = Client.ID_personne and Interet_Auteur.ID_auteur = Auteur.ID_auteur and estInteresse_auteur = 1 and Client.ID_personne = ${personneID} and Livre.Verifie = 1`, (err, res) => {
    if (err) {
      console.log("erreur: ", err);
      result(null, err);
      return;
    }
    console.log("Liste des recommandations auteurs: ", res);
    result(null, res);
  });
};

Livre.RecommandationsGENRES = (personneID, result) => {
  sql.query(`SELECT DISTINCT Client.ID_personne, Livre.ID_Livre, Livre.Titre, Livre.Description, Genre.Genre, Interet_Genre.estInteresse_genre FROM Genre_livre, Livre, Interet_Genre, Client, Genre WHERE Interet_Genre.ID_personne = Client.ID_personne and Interet_Genre.ID_genre = Genre.ID_genre and Interet_Genre.ID_genre = Genre_livre.ID_genre and Livre.ID_livre = Genre_livre.ID_livre and estInteresse_genre = 1 and Client.ID_personne = ${personneID} and Livre.Verifie = 1`, (err, res) => {
    if (err) {
      console.log("erreur: ", err);
      result(null, err);
      return;
    }
    console.log("Liste des recommandations genres: ", res);
    result(null, res);
  });
};

Livre.livreInteretDispo = (personneID, result) => {
  sql.query(`SELECT DISTINCT Client.ID_personne, Livre.ID_Livre, Livre.Titre, Livre.Description, Auteur.Nom, Auteur.Prenom, estInteresse_livre FROM Livre, Auteur, Auteur_livre, Interet_Livre, Client WHERE Livre.ID_livre = Auteur_livre.ID_livre and Auteur_livre.ID_auteur = Auteur.ID_auteur and Interet_Livre.ISBN_livre = Livre.ISBN and estInteresse_livre = 1 and Client.ID_personne = ${personneID} and Livre.Verifie = 1`, (err, res) => {
    if (err) {
      console.log("erreur: ", err);
      result(null, err);
      return;
    }
    console.log("Liste de souhait des livres: ", res);
    result(null, res);
  });
};
module.exports = Livre;
