const sql = require("../DataB");

const InteretLivre = function (interetLivre) {
    this.ID_livre = interetLivre.ID_livre;
    this.ID_personne = interetLivre.ID_personne;
};

InteretLivre.InteretPour = (ISBN, personneID, result) => {
    sql.query(`INSERT INTO Interet_Livre SET ISBN_livre = ${ISBN}, ID_personne = ${personneID}, estInteresse_livre = 1`, (err, res) => {
        if (err) {
            console.log("erreur: ", err);
            result(err, null);
            return;
        }
        console.log("Intéret Livre", { ISBN_livre: ISBN, id_personne: personneID });
        result(null, { ISBN_livre: ISBN, id_personne: personneID });
    });
};

InteretLivre.remove = (ISBN, personneID, result) => {
    sql.query(`DELETE FROM Interet_Livre WHERE ID_personne = ${personneID} and ISBN_livre = ${ISBN}`, (err, res) => {
        if (err) {
            console.log("erreur: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "interetLivre pas trouvé" }, null);
            return;
        }

        console.log("InteretLivre avec ISBN supprimé: ", ISBN);
        result(null, res);
    });
};

module.exports = InteretLivre;