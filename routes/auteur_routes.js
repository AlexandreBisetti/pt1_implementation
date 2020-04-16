module.exports = app => {
  const auteur = require("../controllers/auteur_controller");

  // SETUP des endpoints pour la reception des requetes HTTP des clients
  // determine comment le serv ca réagier à la réception de ces requetes HTTP

  // Nouvel Auteur --> Post auteur
  app.post("/auteurs", auteur.create);

  // Liste des Auteurs --> Get auteur
  app.get("/auteurs", auteur.findAll);

  // Liste des Auteurs --> Get auteur par ID
  app.get("/auteurs/:auteursID", auteur.findOne);

  // Liste des Auteurs --> Get auteur nom/prenom
  app.get("/verification/auteur/:auteursPRENOM/:auteursNOM", auteur.findExistentAuteur);

  // Del auteur par ID
  app.delete("/auteurs/:auteursID", auteur.delete);
};