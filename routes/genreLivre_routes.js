module.exports = app => {
    const genreLivre = require("../controllers/genreLivre_controller");

    // Nouvel relation genre-livre
    app.post("/genres/livres/:genresID/:livresID", genreLivre.GenreOf);

    // Del genre-livre
    app.delete("/genres/livres/:genresID/:livresID", genreLivre.delete);
  };