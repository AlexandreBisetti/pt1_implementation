module.exports = app => {
  const auteur = require("../controllers/auteur_controller");
  app.post("/auteurs", auteur.create);
  app.get("/auteurs", auteur.findAll);
  app.get("/auteurs/:auteursID", auteur.findOne);
  app.get("/verification/auteur/:auteursNOMcomplet", auteur.findExistentAuteur);
  app.get("/liste/auteur/:livresID", auteur.findAuteurLivre);
  app.delete("/auteurs/:auteursID", auteur.delete);
};