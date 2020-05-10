module.exports = app => {
  const client = require("../controllers/client_controller");
  app.post("/clients", client.create);
  app.get("/clients", client.findAll);
  app.get("/clients/verification/:clientsMAIL/:clientsMDP", client.findLoginClient);
  app.get("/clients/verificationMAIL/:clientsMAIL", client.findClientMail);
  app.get("/credits/verification/:clientsID", client.findCreditClient);
  app.post("/credits/ajouter/:clientsID", client.crediterClient);
  app.post("/credits/enlever/:clientsID", client.decrediterClient);
  app.get("/clients/:clientsID", client.findOne);
  app.delete("/clients/:clientsID", client.delete);
};