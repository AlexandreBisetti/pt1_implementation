const sql = require("../DataB");

const Genre = function (genre) {
  this.Genre = genre.Genre;
};

Genre.create = (newGenre, result) => {
  sql.query("INSERT INTO Genre SET ?", newGenre, (err, res) => {
    if (err) {
      console.log("erreur: ", err);
      result(err, null);
      return;
    }
    console.log("nouveau genre: ", { id: res.insertId, ...newGenre });
    result(null, { id: res.insertId, ...newGenre });
  });
};

Genre.getAll = result => {
  sql.query("SELECT * FROM Genre", (err, res) => {
    if (err) {
      console.log("erreur: ", err);
      result(null, err);
      return;
    }

    console.log("Liste des genres: ", res);
    result(null, res);
  });
};

Genre.FindAllBooks = (genresNAME, result) => {
  sql.query("SELECT DISTINCT * FROM Genre, Livre, Genre_livre WHERE Genre.ID_genre = Genre_livre.ID_genre and Genre_livre.ID_livre = Livre.ID_livre and Genre.Genre = ?", genresNAME, (err, res) => {
    if (err) {
      console.log("erreur: ", err);
      result(err, null);
      return;
    }
    console.log("Livres trouvé: ", res);
    result(null, res);
  });
};

Genre.FindGenreOf = (livresID, result) => {
  sql.query("SELECT Genre.Genre FROM Genre, Genre_livre, Livre WHERE Genre.ID_genre = Genre_livre.ID_genre and Genre_livre.ID_livre = Livre.ID_livre and Livre.ID_livre = ?", livresID, (err, res) => {
    if (err) {
      console.log("erreur: ", err);
      result(err, null);
      return;
    }
    console.log("Genre du livre trouvé: ", res);
    result(null, res);
  });
};

Genre.FindGenreID = (genresNAME, result) => {
  sql.query("SELECT * FROM Genre WHERE Genre = ?", genresNAME, (err, res) => {
    if (err) {
      console.log("erreur: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Genre trouvé: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "Genre pas trouvé" }, null);
  });
};

Genre.remove = (id, result) => {
  sql.query("DELETE FROM Genre WHERE ID_genre = ?", id, (err, res) => {
    if (err) {
      console.log("erreur: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "Genre pas trouvé" }, null);
      return;
    }

    console.log("Genre avec id supprimé: ", id);
    result(null, res);
  });
};

module.exports = Genre;
