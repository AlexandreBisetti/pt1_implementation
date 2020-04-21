module.exports = app => {
    const personne = require("../controllers/personne_controller");
    app.post("/personnes", personne.create);
    app.delete("/personnes/:personnesID", personne.delete);
  };