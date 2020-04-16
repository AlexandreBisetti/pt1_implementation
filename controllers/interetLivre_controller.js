const InteretLivre = require("../models/interetLivre_modele");

exports.InteretOf = (req, res) => {
    InteretLivre.InteretPour(req.params.ISBN, req.params.personneID, (err, data) => {
        if (err) {
            if (err.kind === "pas trouvé") {
                res.status(404).send({
                    message: `Livre pas trouvé avec ISBN ${req.params.ISBN}.`
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
    InteretLivre.remove(req.params.ISBN, req.params.personneID, (err, data) => {
        if (err) {
            if (err.kind === "pas trouvé") {
                res.status(404).send({
                    message: `Livre pas trouvé avec ISBN ${req.params.ISBN}.`
                });
            } else {
                res.status(500).send({
                    message: "Impossible de supprimer Interet avec Personne id " + req.params.personneID
                });
            }
        } else res.send({ message: `InteretLivre supprimé` });
    });
};