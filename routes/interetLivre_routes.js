module.exports = app => {
  const interetLivre = require("../controllers/interetLivre_controller");

  // Nouvel relation genre-livre
  app.post("/livres/interets/:ISBN/:personneID", interetLivre.InteretOf);

  // Nouvel relation genre-livre
  app.get("/livres/disponible/:ISBN", interetLivre.LivresDisponible);

  // Nouvel relation genre-livre
  app.get("/livres/interetsPERSONNE/:personneID", interetLivre.FindByIDPersonne);

  // Del genre-livre
  app.delete("/livres/interets/:ISBN/:personneID", interetLivre.delete);
};