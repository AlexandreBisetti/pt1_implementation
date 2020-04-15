const sql = require("../DataB");

const InteretLivre = function (interetLivre) {
    this.ID_livre = interetLivre.ID_livre;
    this.ID_personne = interetLivre.ID_personne;
};

InteretLivre.InteretPour = (livresID, personneID, result) => {
    sql.query(`INSERT INTO Interet_Livre SET ID_livre = ${livresID}, ID_personne = ${personneID}, estInteresse_livre = 1`, (err, res) => {
        if (err) {
            console.log("erreur: ", err);
            result(err, null);
            return;
        }
        console.log("Intéret Livre", { id_livre: livresID, id_personne: personneID });
        result(null, { id_livre: livresID, id_personne: personneID });
    });
};

InteretLivre.remove = (livresID, personneID, result) => {
    sql.query(`DELETE FROM Interet_Livre WHERE ID_personne = ${personneID} and ID_livre = ${livresID}`, (err, res) => {
        if (err) {
            console.log("erreur: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "interetLivre pas trouvé" }, null);
            return;
        }

        console.log("InteretLivre avec id supprimé: ", livresID);
        result(null, res);
    });
};

module.exports = InteretLivre;