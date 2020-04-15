const sql = require("../DataB");

const InteretGenre = function (interetGenre) {
    this.ID_genre = interetGenre.ID_genre;
    this.ID_personne = interetGenre.ID_personne;
};

InteretGenre.InteretPour = (genresID, personneID, result) => {
    sql.query(`INSERT INTO Interet_Genre SET ID_genre = ${genresID}, ID_personne = ${personneID}, estInteresse_genre = 1`, (err, res) => {
        if (err) {
            console.log("erreur: ", err);
            result(err, null);
            return;
        }
        console.log("Intéret Genre", { id_genre: genresID, id_personne: personneID });
        result(null, { id_genre: genresID, id_personne: personneID });
    });
};

InteretGenre.remove = (genresID, personneID, result) => {
    sql.query(`DELETE FROM Interet_Genre WHERE ID_personne = ${personneID} and ID_genre = ${genresID}`, (err, res) => {
        if (err) {
            console.log("erreur: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "interetGenre pas trouvé" }, null);
            return;
        }

        console.log("interetGenre avec id supprimé: ", genresID);
        result(null, res);
    });
};

module.exports = InteretGenre;