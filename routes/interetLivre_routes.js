module.exports = app => {
    const interetLivre = require("../controllers/interetLivre_controller");

    // Nouvel relation genre-livre
    app.post("/livres/interets/:livresID/:personneID", interetLivre.InteretOf);

    // Del genre-livre
    app.delete("/livres/interets/:livresID/:personneID", interetLivre.delete);
  };