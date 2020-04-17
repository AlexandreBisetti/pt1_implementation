module.exports = app => {
  const genre = require("../controllers/genre_controller");

  // Nouveau genre
  app.post("/genres", genre.create);

  // Liste de tout les genres
  app.get("/genres", genre.findAll);

  // liste genre d'un livre
  app.get("/liste/genres/:livresID", genre.findGenreLivre);

  // Del genre par ID
  app.delete("/genres/:genresID", genre.delete);

  // Liste de bouqins de ce genre
  app.get("/genres/:genresNAME", genre.findOne);

  // Liste de bouqins de ce genre
  app.get("/id/genres/:genresNAME", genre.findGenre);
};