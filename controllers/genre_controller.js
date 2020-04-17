const Genre = require("../models/genre_modele");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Attention vide!"
        });
    }

    const genre = new Genre({
        Genre: req.body.Genre
    });

    Genre.create(genre, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Erreur création genre."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Genre.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Erreur récupération genre."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Genre.FindAllBooks(req.params.genresNAME, (err, data) => {
        if (err) {
            if (err.kind === "pas trouvé") {
                res.status(404).send({
                    message: `Genre pas trouvé nom ${req.params.genresNAME}.`
                });
            } else {
                res.status(500).send({
                    message: "Erreur lors de la recherche genre avec nom " + req.params.genresNAME
                });
            }
        } else res.send(data);
    });
};

exports.findGenreLivre = (req, res) => {
    Genre.FindGenreOf(req.params.livresID, (err, data) => {
        if (err) {
            if (err.kind === "pas trouvé") {
                res.status(404).send({
                    message: `livre pas trouvé id ${req.params.livresID}.`
                });
            } else {
                res.status(500).send({
                    message: "Erreur lors de la recherche genre avec id livre " + req.params.livresID
                });
            }
        } else res.send(data);
    });
};

exports.findGenre = (req, res) => {
    Genre.FindGenreID(req.params.genresNAME, (err, data) => {
        if (err) {
            if (err.kind === "pas trouvé") {
                res.status(404).send({
                    message: `Genre pas trouvé nom ${req.params.genresNAME}.`
                });
            } else {
                res.status(500).send({
                    message: "Erreur lors de la recherche genre avec nom " + req.params.genresNAME
                });
            }
        } else res.send(data);
    });
};

exports.delete = (req, res) => {
    Genre.remove(req.params.genresID, (err, data) => {
        if (err) {
            if (err.kind === "pas trouvé") {
                res.status(404).send({
                    message: `Genre pas trouvé avec id ${req.params.genresID}.`
                });
            } else {
                res.status(500).send({
                    message: "Impossible de supprimer genre avec id " + req.params.genresID
                });
            }
        } else res.send({ message: `Genre supprimé` });
    });
};