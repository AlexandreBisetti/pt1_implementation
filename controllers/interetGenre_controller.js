const InteretGenre = require("../models/interetGenre_modele");

exports.InteretOf = (req, res) => {
    InteretGenre.InteretPour(req.params.genresID, req.params.personneID, (err, data) => {
        if (err) {
            if (err.kind === "pas trouvé") {
                res.status(404).send({
                    message: `Genre pas trouvé avec id ${req.params.genresID}.`
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
    InteretGenre.remove(req.params.genresID, req.params.personneID, (err, data) => {
        if (err) {
            if (err.kind === "pas trouvé") {
                res.status(404).send({
                    message: `Genre pas trouvé avec id ${req.params.genresID}.`
                });
            } else {
                res.status(500).send({
                    message: "Impossible de supprimer Interet avec Personne id " + req.params.personneID
                });
            }
        } else res.send({ message: `GenreLivre supprimé` });
    });
};