module.exports = app => {
    const interetGenre = require("../controllers/interetGenre_controller");
    app.post("/genres/interets/:genresID/:personneID", interetGenre.InteretOf);
    app.delete("/genres/interets/:genresID/:personneID", interetGenre.delete);
  };