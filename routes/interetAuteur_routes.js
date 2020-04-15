module.exports = app => {
    const interetAuteur = require("../controllers/interetAuteur_controller");

    // Nouvel relation genre-livre
    app.post("/auteurs/interets/:auteursID/:personneID", interetAuteur.InteretOf);

    // Del genre-livre
    app.delete("/auteurs/interets/:auteursID/:personneID", interetAuteur.delete);
  };