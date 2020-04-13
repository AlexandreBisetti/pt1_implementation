module.exports = app => {
    const client = require("../controllers/client_controller");

    // Nouveau client --> Post client
    app.post("/clients", client.create);
  
    // Liste des Auteurs --> Get auteur
    app.get("/clients", client.findAll);
  
    // Liste des clients --> Get client par ID
    app.get("/clients/:clientsID", client.findOne);

    // Del client par ID
    app.delete("/clients/:clientsID", client.delete);
  };