const Employe = require("../models/employe_modele");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Attention vide!"
    });
  }

  const employe = new Employe({
    ID_personne: req.body.ID_personne,
    Numero_avs: req.body.Numero_avs,
    Numero_telephone: req.body.Numero_telephone,
    Adresse_employe: req.body.Adresse_employe
  });

  Employe.create(employe, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Erreur création employe."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
    Employe.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Erreur récupération employe."
          });
        else res.send(data);
      });
};

exports.findOne = (req, res) => {
    Employe.findById(req.params.employesID, (err, data) => {
        if (err) {
          if (err.kind === "pas trouvé") {
            res.status(404).send({
              message: `Employe pas trouvé avec id ${req.params.employesID}.`
            });
          } else {
            res.status(500).send({
              message: "Erreur lors de la recherche employe avec id " + req.params.employesID
            });
          }
        } else res.send(data);
      });
};

exports.delete = (req, res) => {
    Employe.remove(req.params.employesID, (err, data) => {
        if (err) {
          if (err.kind === "pas trouvé") {
            res.status(404).send({
              message: `Employe pas trouvé avec id ${req.params.employesID}.`
            });
          } else {
            res.status(500).send({
              message: "Impossible de supprimer employe avec id " + req.params.employesID
            });
          }
        } else res.send({ message: `Employe supprimé` });
      });
};