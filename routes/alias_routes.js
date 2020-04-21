module.exports = app => {
    const alias = require("../controllers/alias_controller");
    app.post("/alias", alias.create);
    app.get("/alias", alias.findAll);
    app.get("/alias/:auteursID", alias.findOne);
    app.delete("/alias/:auteursID", alias.delete);
  };