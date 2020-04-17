const Auteur = require("../models/auteur");

// créer 1 auteur
exports.create = (req, res) => {
     // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Attention vide!"
    });
  }

  //  Création auteur
  const auteur = new Auteur({
    Nom: req.body.Nom,
    Prenom: req.body.Prenom
  });

  // Save auteur dans la BD
  Auteur.create(auteur, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Erreur création auteur."
      });
    else res.send(data);
  });
};

// liste de tout les auteurs
exports.findAll = (req, res) => {
    Auteur.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Erreur récupération auteur."
          });
        else res.send(data);
      });
};

// trouver 1 auteur par ID
// req.params.auteursID correspond à la route setup.
exports.findOne = (req, res) => {
    Auteur.findById(req.params.auteursID, (err, data) => {
        if (err) {
          if (err.kind === "pas trouvé") {
            res.status(404).send({
              message: `Auteur pas trouvé avec id ${req.params.auteursID}.`
            });
          } else {
            res.status(500).send({
              message: "Erreur lors de la recherche auteur avec id " + req.params.auteursID
            });
          }
        } else res.send(data);
      });
};

exports.findExistentAuteur = (req, res) => {
  Auteur.findByNameLastName(req.params.auteursNOMcomplet, (err, data) => {
    if (err) {
      if (err.kind === "pas trouvé") {
        res.status(404).send({
          message: `Auteur pas trouvé avec nom ${req.params.auteursNOMcomplet}.`
        });
      } else {
        res.status(500).send({
          message: "Erreur lors de la recherche auteur nom " + req.params.auteursNOMcomplet
        });
      }
    } else res.send(data);
  });
};

// delete 1 auteur par ID
exports.delete = (req, res) => {
    Auteur.remove(req.params.auteursID, (err, data) => {
        if (err) {
          if (err.kind === "pas trouvé") {
            res.status(404).send({
              message: `Auteur pas trouvé avec id ${req.params.auteursID}.`
            });
          } else {
            res.status(500).send({
              message: "Impossible de supprimer auteur avec id " + req.params.auteursID
            });
          }
        } else res.send({ message: `Auteur supprimé` });
      });
};