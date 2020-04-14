const sql = require("../DataB");

const GenreLivre = function (genreLivre) {
    this.ID_genre = genreLivre.ID_genre;
    this.ID_livre = genreLivre.ID_livre;
};

GenreLivre.GenreDu = (genresID, livresID, result) => {
    sql.query(`INSERT INTO Genre_livre SET ID_livre = ${livresID}, ID_genre = ${genresID}`, (err, res) => {
        if (err) {
            console.log("erreur: ", err);
            result(err, null);
            return;
        }
        console.log("Livre pris", { id_livre: livresID, id_genre: genresID });
        result(null, { id_livre: livresID, id_genre: genresID });
    });
};

GenreLivre.remove = (genresID, livresID, result) => {
    sql.query(`DELETE FROM Genre_livre WHERE ID_livre = ${livresID} and ID_genre = ${genresID}`, (err, res) => {
        if (err) {
            console.log("erreur: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "genreLivre pas trouvé" }, null);
            return;
        }

        console.log("genreLivre avec id supprimé: ", genresID);
        result(null, res);
    });
};

module.exports = GenreLivre;