module.exports = app => {
  const genre = require("../controllers/genre_controller");
  app.post("/genres", genre.create);
  app.get("/genres", genre.findAll);
  app.get("/liste/genres/:livresID", genre.findGenreLivre);
  app.delete("/genres/:genresID", genre.delete);
  app.get("/genres/:genresNAME", genre.findOne);
  app.get("/id/genres/:genresNAME", genre.findGenre);
};