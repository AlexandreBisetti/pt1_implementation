const sql = require("../DataB");

const Client = function (client) {
  this.ID_personne = client.ID_personne;
  this.Numero_telephone = client.Numero_telephone;
  this.Adresse_client = client.Adresse_client;
  this.Credits = client.Credits;
  this.Courriel = client.Courriel;
  this.Mot_de_passe = client.Mot_de_passe;
};

Client.create = (newClient, result) => {
  sql.query("INSERT INTO Client SET ?", newClient, (err, res) => {
    if (err) {
      console.log("erreur: ", err);
      result(err, null);
      return;
    }
    console.log("nouveau client: ", { ...newClient });
    result(null, { ...newClient });
  });
};

Client.findById = (clientsID, result) => {
  sql.query("SELECT * FROM Client, Personne WHERE Client.ID_personne = Personne.ID_personne and Client.ID_personne = ?", clientsID, (err, res) => {
    if (err) {
      console.log("erreur: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Client trouvé: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "Client pas trouvé" }, null);
  });
};

Client.findCredits = (clientsID, result) => {
  sql.query("SELECT Credits FROM Client WHERE Client.ID_personne = ?", clientsID, (err, res) => {
    if (err) {
      console.log("erreur: ", err);
      result(err, null);
      return;
    }
    console.log("Crédits", res);
    result(null, res);
    return;
  });
};

Client.findLogin = (clientsMAIL, clientsMDP, result) => {
  sql.query(`SELECT ID_personne FROM Client WHERE Courriel = "${clientsMAIL}" and Mot_de_passe = "${clientsMDP}"`, (err, res) => {
    if (err) {
      console.log("erreur: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("ID client: ", res[0]);
      result(null, res[0]);
      return;
    }
    console.log("Resultat ", { resultat: false });
    result(null, { resultat: false });
  });
};

Client.findMail = (clientsMAIL, result) => {
  sql.query(`SELECT ID_personne FROM Client WHERE Courriel = "${clientsMAIL}"`, (err, res) => {
    if (err) {
      console.log("erreur: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Mail existe déjà", { resultat: true });
      result(null, { resultat: true, mail: clientsMAIL });
      return;
    }
    console.log("Resultat ", { mail: clientsMAIL, resultat: false });
    result(null, { resultat: false });
  });
};

Client.Crediter = (clientsID, result) => {
  sql.query(`UPDATE Client SET Credits = Credits + 1 WHERE ID_personne = ${clientsID}`, (err, res) => {
    if (err) {
      console.log("erreur: ", err);
      result(err, null);
      return;
    }
    console.log("Créditer", res);
    result(null, res);
  });
};


Client.getAll = result => {
  sql.query("SELECT * FROM Client, Personne WHERE Client.ID_personne = Personne.ID_personne", (err, res) => {
    if (err) {
      console.log("erreur: ", err);
      result(null, err);
      return;
    }

    console.log("Liste de client: ", res);
    result(null, res);
  });
};

Client.remove = (id, result) => {
  sql.query("DELETE FROM Client, Personne WHERE Client.ID_personne = Personne.ID_personne and Client.ID_personne = ?", id, (err, res) => {
    if (err) {
      console.log("erreur: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "Client pas trouvé" }, null);
      return;
    }

    console.log("client avec id supprimé: ", id);
    result(null, res);
  });
};

module.exports = Client;
