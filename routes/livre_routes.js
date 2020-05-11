module.exports = app => {
  const livre = require("../controllers/livre_controller");
  app.post("/livres", livre.create);
  app.post("/livres/prendre/:livresID/:idEchange", livre.prendreLivre);
  app.post("/livres/verifier/:livresID/:idEmploye", livre.verifierLivre);
  app.post("/livres/enregistrer/:livresID/:idEnregistre", livre.enregistrerLivre);
  app.get("/livres", livre.findAll);
  app.get("/livresNonVerifies", livre.findAllNotVerified);
  app.get("/livres/:livresID", livre.findOne);
  app.delete("/livres/:livresID", livre.delete);
  app.get("/livres/recommandations/listeBOTH/:idPersonne", livre.findRecommandationBOTH);
  app.get("/livres/recommandations/listeAUTEURS/:idPersonne", livre.findRecommandationAUTEURS);
  app.get("/livres/recommandations/listeGENRES/:idPersonne", livre.findRecommandationGENRES);
  app.get("/livres/souhaits/listeSOUHAIT/:idPersonne", livre.listeDesSouhaits);
};