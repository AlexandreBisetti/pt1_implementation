module.exports = app => {
    const employe = require("../controllers/employe_controller");
    app.post("/employes", employe.create);
    app.get("/employes", employe.findAll);
    app.get("/employes/:employesID", employe.findOne);
    app.delete("/employes/:employesID", employe.delete);
  };