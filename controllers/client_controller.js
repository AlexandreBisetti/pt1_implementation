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

exports.crediterClient = (req, res) => {
  Client.Crediter(req.params.clientsID, (err, data) => {
    if (err) {
      if (err.kind === "pas trouvé") {
        res.status(404).send({
          message: `Client pas trouvé avec id ${req.params.clientsID}.`
        });
      } else {
        res.status(500).send({
          message: "Erreur lors du crédit client " + req.params.clientsID
        });
      }
    } else res.send(data);
  });
}

exports.decrediterClient = (req, res) => {
  Client.Decrediter(req.params.clientsID, (err, data) => {
    if (err) {
      if (err.kind === "pas trouvé") {
        res.status(404).send({
          message: `Client pas trouvé avec id ${req.params.clientsID}.`
        });
      } else {
        res.status(500).send({
          message: "Erreur lors du crédit client " + req.params.clientsID
        });
      }
    } else res.send(data);
  });
}


exports.findCreditClient = (req, res) => {
  Client.findCredits(req.params.clientsID, (err, data) => {
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

exports.findLoginClient = (req, res) => {
  Client.findLogin(req.params.clientsMAIL, req.params.clientsMDP, (err, data) => {
    if (err) {
      if (err.kind === "pas trouvé") {
        res.status(404).send({
          message: `client pas trouvé avec mail ${req.params.clientsMAIL}.`
        });
      } else {
        res.status(500).send({
          message: "Erreur lors de la recherche client mail " + req.params.clientsMAIL
        });
      }
    } else res.send(data);
  });
};

exports.findClientMail = (req, res) => {
  Client.findMail(req.params.clientsMAIL, (err, data) => {
    if (err) {
      if (err.kind === "pas trouvé") {
        res.status(404).send({
          message: `erreur vérif mail`
        });
      } else {
        res.status(500).send({
          message: "Erreur lors de la recherche client mail " + req.params.clientsMAIL
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