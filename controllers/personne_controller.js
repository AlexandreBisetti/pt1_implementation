const Personne = require("../models/personne_modele");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Attention vide!"
        });
    }
    const personne = new Personne({
        Nom: req.body.Nom,
        Prenom: req.body.Prenom,
        Date_naissance: req.body.Date_naissance,
        Nationalite: req.body.Nationalite
    });

    Personne.create(personne, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Erreur création personne."
            });
        else res.send(data);
    });
};

exports.delete = (req, res) => {
    Personne.remove(req.params.personnesID, (err, data) => {
        if (err) {
            if (err.kind === "pas trouvé") {
                res.status(404).send({
                    message: `Personne pas trouvé avec id ${req.params.personnesID}.`
                });
            } else {
                res.status(500).send({
                    message: "Impossible de supprimer personne avec id " + req.params.personnesID
                });
            }
        } else res.send({ message: `Personne supprimée` });
    });
};