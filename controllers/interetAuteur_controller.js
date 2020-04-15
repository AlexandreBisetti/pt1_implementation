const InteretAuteur = require("../models/interetAuteur_modele");

exports.InteretOf = (req, res) => {
    InteretAuteur.InteretPour(req.params.auteursID, req.params.personneID, (err, data) => {
        if (err) {
            if (err.kind === "pas trouvé") {
                res.status(404).send({
                    message: `Auteur pas trouvé avec id ${req.params.auteursID}.`
                });
            } else {
                res.status(500).send({
                    message: "Erreur lors de la supression interet de Client ID " + req.params.personneID
                });
            }
        } else res.send(data);
    });
}

exports.delete = (req, res) => {
    InteretAuteur.remove(req.params.auteursID, req.params.personneID, (err, data) => {
        if (err) {
            if (err.kind === "pas trouvé") {
                res.status(404).send({
                    message: `Auteur pas trouvé avec id ${req.params.auteursID}.`
                });
            } else {
                res.status(500).send({
                    message: "Impossible de supprimer Interet avec Personne id " + req.params.personneID
                });
            }
        } else res.send({ message: `InteretAuteur supprimé` });
    });
};