module.exports = app => {
  const interetLivre = require("../controllers/interetLivre_controller");
  app.post("/livres/interets/:ISBN/:personneID", interetLivre.InteretOf);
  app.get("/livres/disponible/:ISBN", interetLivre.LivresDisponible);
  app.get("/livres/interetsPERSONNE/:personneID", interetLivre.FindByIDPersonne);
  app.delete("/livres/interets/:ISBN/:personneID", interetLivre.delete);
};