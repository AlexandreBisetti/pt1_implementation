const Client = require("../models/client_modele");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Attention vide!"
    });
  }

  const client = new Client({
    ID_personne: req.body.ID_personne,
    Numero_telephone: req.body.Numero_telephone,
    Adresse_client: req.body.Adresse_client,
    Credits: req.body.Credits,
    Courriel: req.body.Courriel,
    Mot_de_passe: req.body.Mot_de_passe
  });

  Client.create(client, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Erreur création client."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
    Client.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Erreur récupération client."
          });
        else res.send(data);
      });
};

exports.findOne = (req, res) => {
    Client.findById(req.params.clientsID, (err, data) => {
        if (err) {
          if (err.kind === "pas trouvé") {
            res.status(404).send({
              message: `client pas trouvé avec id ${req.params.clientsID}.`
            });
          } else {
            res.status(500).send({
              message: "Erreur lors de la recherche client avec id " + req.params.clientsID
            });
          }
        } else res.send(data);
      });
};

exports.delete = (req, res) => {
    Client.remove(req.params.clientsID, (err, data) => {
        if (err) {
          if (err.kind === "pas trouvé") {
            res.status(404).send({
              message: `Client pas trouvé avec id ${req.params.clientsID}.`
            });
          } else {
            res.status(500).send({
              message: "Impossible de supprimer client avec id " + req.params.clientsID
            });
          }
        } else res.send({ message: `Client supprimé` });
      });
};