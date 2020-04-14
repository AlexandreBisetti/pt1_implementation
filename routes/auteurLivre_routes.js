module.exports = app => {
    const auteurLivre = require("../controllers/auteurLivre_controller");

    // Nouvel relation auteur-livre
    app.post("/auteurs/livres/:auteursID/:livresID", auteurLivre.EcritPar);

    // Del auteur-livre
    app.delete("/auteurs/livres/:auteursID/:livresID", auteurLivre.delete);
  };