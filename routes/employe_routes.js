module.exports = app => {
    const employe = require("../controllers/employe_controller");
    // Nouvel Employe --> Post employe
    app.post("/employes", employe.create);
  
    // Liste des employe
    app.get("/employes", employe.findAll);
  
    // Employe par id
    app.get("/employes/:employesID", employe.findOne);

    // Del employe par ID
    app.delete("/employes/:employesID", employe.delete);
  };