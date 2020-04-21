module.exports = app => {
    const genreLivre = require("../controllers/genreLivre_controller");
    app.post("/genres/livres/:genresID/:livresID", genreLivre.GenreOf);
    app.delete("/genres/livres/:genresID/:livresID", genreLivre.delete);
  };