module.exports = app => {
    const livre = require("../controllers/livre_controller");
    // Nouveau Livre
    app.post("/livres", livre.create);
  
    // Liste des Auteurs
    app.get("/livres", livre.findAll);
  
    // Livre par ID
    app.get("/livres/:livresID", livre.findOne);

    // Del livre par ID
    app.delete("/livres/:livresID", livre.delete);
  };