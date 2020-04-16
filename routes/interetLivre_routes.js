module.exports = app => {
    const interetLivre = require("../controllers/interetLivre_controller");

    // Nouvel relation genre-livre
    app.post("/livres/interets/:ISBN/:personneID", interetLivre.InteretOf);

    // Del genre-livre
    app.delete("/livres/interets/:ISBN/:personneID", interetLivre.delete);
  };