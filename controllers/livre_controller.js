const Livre = require("../models/livre_modele");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Attention vide!"
    });
  }

  const livre = new Livre({
    ID_Personne_Enregistre: req.body.ID_Personne_Enregistre,
    ISBN: req.body.ISBN,
    Titre: req.body.Titre,
    Description: req.body.Description,
    Editeur: req.body.Editeur,
    Annee_parution: req.body.Annee_parution,
    Langue: req.body.Langue,
    Verifie: req.body.Verifie
  });

  Livre.create(livre, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Erreur création livre."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
    Livre.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Erreur récupération livre."
          });
        else res.send(data);
      });
};

exports.findOne = (req, res) => {
    Livre.findById(req.params.livresID, (err, data) => {
        if (err) {
          if (err.kind === "pas trouvé") {
            res.status(404).send({
              message: `Livre pas trouvé avec id ${req.params.livresID}.`
            });
          } else {
            res.status(500).send({
              message: "Erreur lors de la recherche livre avec id " + req.params.livresID
            });
          }
        } else res.send(data);
      });
};

exports.delete = (req, res) => {
    Livre.remove(req.params.livresID, (err, data) => {
        if (err) {
          if (err.kind === "pas trouvé") {
            res.status(404).send({
              message: `Livre pas trouvé avec id ${req.params.livresID}.`
            });
          } else {
            res.status(500).send({
              message: "Impossible de supprimer livre avec id " + req.params.livresID
            });
          }
        } else res.send({ message: `Livre supprimé` });
      });
};