const AuteurLivre = require("../models/auteurLivre_modele");

exports.EcritPar = (req, res) => {
    AuteurLivre.AuteurDe(req.params.auteursID, req.params.livresID ,(err, data) => {
      if (err) {
        if (err.kind === "pas trouvé") {
          res.status(404).send({
            message: `Auteur pas trouvé avec id ${req.params.auteursID}.`
          });
        } else {
          res.status(500).send({
            message: "Erreur lors de la supression de l'auteur du livre " + req.params.livresID
          });
        }
      } else res.send(data);
    });
  }

exports.delete = (req, res) => {
    AuteurLivre.remove(req.params.auteursID, req.params.livresID, (err, data) => {
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
        } else res.send({ message: `AuteurLivre supprimé` });
      });
};