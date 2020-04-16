module.exports = app => {
  const client = require("../controllers/client_controller");

  // Nouveau client --> Post client
  app.post("/clients", client.create);

  // Liste des clients
  app.get("/clients", client.findAll);

  // verif mail mdp
  app.get("/clients/verification/:clientsMAIL/:clientsMDP", client.findLoginClient);

  // verif unicité mail
  app.get("/clients/verificationMAIL/:clientsMAIL", client.findClientMail);

  // Liste des clients --> Get client par ID
  app.get("/clients/:clientsID", client.findOne);

  // Del client par ID
  app.delete("/clients/:clientsID", client.delete);
};