const sql = require("../DataB");

const Client = function(client) {
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
    console.log("nouveau client: ", {...newClient });
    result(null, {...newClient });
  });
};

Client.findById = (clientsID, result) => {
  sql.query("SELECT * FROM Client WHERE ID_personne = ?", clientsID, (err, res) => {
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

Client.getAll = result => {
  sql.query("SELECT * FROM Client", (err, res) => {
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
  sql.query("DELETE FROM Client WHERE ID_personne = ?", id, (err, res) => {
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
