const sql = require("../DataB");

const Alias = function (alias) {
    this.ID_auteur = alias.ID_auteur;
    this.Alias = alias.Alias;
};

Alias.create = (newAlias, result) => {
    sql.query("INSERT INTO Alias SET ?", newAlias, (err, res) => {
        if (err) {
            console.log("erreur: ", err);
            result(err, null);
            return;
        }
        console.log("nouvel alias: ", { id: res.insertId, ...newAlias });
        result(null, { id: res.insertId, ...newAlias });
    });
};

Alias.findById = (auteursID, result) => {
    sql.query("SELECT * FROM Alias, Auteur WHERE Alias.ID_auteur = Auteur.ID_auteur and Alias.ID_auteur = ?", auteursID, (err, res) => {
        if (err) {
            console.log("erreur: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Alias auteur trouvé: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "Alias auteur pas trouvé" }, null);
    });
};

Alias.getAll = result => {
    sql.query("SELECT * FROM Alias, Auteur WHERE Alias.ID_auteur = Auteur.ID_auteur", (err, res) => {
        if (err) {
            console.log("erreur: ", err);
            result(null, err);
            return;
        }

        console.log("Liste d'Alias: ", res);
        result(null, res);
    });
};

Alias.remove = (id, result) => {
    sql.query("DELETE FROM Alias WHERE ID_auteur = ?", id, (err, res) => {
        if (err) {
            console.log("erreur: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "Alias pas trouvé" }, null);
            return;
        }

        console.log("Alias avec id supprimé: ", id);
        result(null, res);
    });
};

module.exports = Alias;
