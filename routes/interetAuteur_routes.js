module.exports = app => {
    const interetAuteur = require("../controllers/interetAuteur_controller");
    app.post("/auteurs/interets/:auteursID/:personneID", interetAuteur.InteretOf);
    app.delete("/auteurs/interets/:auteursID/:personneID", interetAuteur.delete);
  };