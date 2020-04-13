module.exports = app => {
    const personne = require("../controllers/personne_controller");
    // Nouvelle personne --> Post personne
    app.post("/personnes", personne.create);

    // Del personne par ID
    app.delete("/personnes/:personnesID", personne.delete);
  };