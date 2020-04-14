const GenreLivre = require("../models/genreLivre_modele");

exports.GenreOf = (req, res) => {
    GenreLivre.GenreDu(req.params.genresID, req.params.livresID, (err, data) => {
        if (err) {
            if (err.kind === "pas trouvé") {
                res.status(404).send({
                    message: `Genre pas trouvé avec id ${req.params.genresID}.`
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
    GenreLivre.remove(req.params.genresID, req.params.livresID, (err, data) => {
        if (err) {
            if (err.kind === "pas trouvé") {
                res.status(404).send({
                    message: `Genre pas trouvé avec id ${req.params.genresID}.`
                });
            } else {
                res.status(500).send({
                    message: "Impossible de supprimer livreGenre avec id " + req.params.livresID
                });
            }
        } else res.send({ message: `GenreLivre supprimé` });
    });
};