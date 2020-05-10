module.exports = app => {
    const auteurLivre = require("../controllers/auteurLivre_controller");
    app.post("/auteurs/livres/:auteursID/:livresID", auteurLivre.EcritPar);
    app.delete("/auteurs/livres/:auteursID/:livresID", auteurLivre.delete);
  };