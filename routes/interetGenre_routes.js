module.exports = app => {
    const interetGenre = require("../controllers/interetGenre_controller");

    // Nouvel relation genre-livre
    app.post("/genres/interets/:genresID/:personneID", interetGenre.InteretOf);

    // Del genre-livre
    app.delete("/genres/interets/:genresID/:personneID", interetGenre.delete);
  };