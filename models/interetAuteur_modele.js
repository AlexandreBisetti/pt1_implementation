const sql = require("../DataB");

const InteretAuteur = function (interetAuteur) {
    this.ID_auteur = interetAuteur.ID_genre;
    this.ID_personne = interetAuteur.ID_personne;
};

InteretAuteur.InteretPour = (auteursID, personneID, result) => {
    sql.query(`INSERT INTO Interet_Auteur SET ID_auteur = ${auteursID}, ID_personne = ${personneID}, estInteresse_auteur = 1`, (err, res) => {
        if (err) {
            console.log("erreur: ", err);
            result(err, null);
            return;
        }
        console.log("Intéret Auteur", { id_auteur: auteursID, id_personne: personneID });
        result(null, { id_auteur: auteursID, id_personne: personneID });
    });
};

InteretAuteur.remove = (auteursID, personneID, result) => {
    sql.query(`DELETE FROM Interet_Auteur WHERE ID_personne = ${personneID} and ID_auteur = ${auteursID}`, (err, res) => {
        if (err) {
            console.log("erreur: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "interetAuteur pas trouvé" }, null);
            return;
        }

        console.log("interetAuteur avec id supprimé: ", auteursID);
        result(null, res);
    });
};

module.exports = InteretAuteur;