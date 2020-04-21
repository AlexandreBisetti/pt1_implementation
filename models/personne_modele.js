const sql = require("../DataB");

const Personne = function (personne) {
    this.Nom = personne.Nom;
    this.Prenom = personne.Prenom;
    this.Date_naissance = personne.Date_naissance;
    this.Nationalite = personne.Nationalite;
};

Personne.create = (newPersonne, result) => {
    sql.query("INSERT INTO Personne SET ?", newPersonne, (err, res) => {
        if (err) {
            console.log("erreur: ", err);
            result(err, null);
            return;
        }
        console.log("nouvelle personne: ", { id: res.insertId, ...newPersonne });
        result(null, { id: res.insertId, ...newPersonne });
    });
};

Personne.remove = (id, result) => {
    sql.query("DELETE FROM Personne WHERE ID_personne = ?", id, (err, res) => {
        if (err) {
            console.log("erreur: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "personne pas trouvé" }, null);
            return;
        }

        console.log("personne avec id supprimé: ", id);
        result(null, res);
    });
};

module.exports = Personne;
