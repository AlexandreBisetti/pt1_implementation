module.exports = app => {
    const alias = require("../controllers/alias_controller");

    // nouvel alias
    app.post("/alias", alias.create);
  
    // Liste des alias
    app.get("/alias", alias.findAll);
  
    // Afficher alias par ID
    app.get("/alias/:auteursID", alias.findOne);

    // Del alias par ID
    app.delete("/alias/:auteursID", alias.delete);
  };