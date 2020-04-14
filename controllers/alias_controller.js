const Alias = require("../models/alias_modele");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Attention vide!"
        });
    }

    const alias = new Alias({
        ID_auteur: req.body.ID_auteur,
        Alias: req.body.Alias
    });

    Alias.create(alias, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Erreur création alias."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Alias.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Erreur récupération alias."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Alias.findById(req.params.auteursID, (err, data) => {
        if (err) {
            if (err.kind === "pas trouvé") {
                res.status(404).send({
                    message: `Alias pas trouvé avec id ${req.params.auteursID}.`
                });
            } else {
                res.status(500).send({
                    message: "Erreur lors de la recherche alias avec id " + req.params.auteursID
                });
            }
        } else res.send(data);
    });
};

exports.delete = (req, res) => {
    Alias.remove(req.params.auteursID, (err, data) => {
        if (err) {
            if (err.kind === "pas trouvé") {
                res.status(404).send({
                    message: `Alias pas trouvé avec id ${req.params.auteursID}.`
                });
            } else {
                res.status(500).send({
                    message: "Impossible de supprimer alias avec id " + req.params.auteursID
                });
            }
        } else res.send({ message: `Alias supprimé` });
    });
};