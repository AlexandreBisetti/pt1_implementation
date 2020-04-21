const Auteur = require("../models/auteur");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Attention vide!"
    });
  }

  const auteur = new Auteur({
    Nom_complet: req.body.Nom_complet
  });

  Auteur.create(auteur, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Erreur création auteur."
      });
    else res.send(data);
  });
};

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

exports.findAuteurLivre = (req, res) => {
  Auteur.findAuteurOf(req.params.livresID, (err, data) => {
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