const sql = require("../DataB");

const Employe = function(employe) {
    this.ID_personne = employe.ID_personne;
    this.Numero_avs = employe.Numero_avs;
    this.Numero_telephone = employe.Numero_telephone;
    this.Adresse_employe = employe.Adresse_employe;
};

Employe.create = (newEmploye, result) => {
  sql.query("INSERT INTO Employe SET ?", newEmploye, (err, res) => {
    if (err) {
      console.log("erreur: ", err);
      result(err, null);
      return;
    }
    console.log("nouvel employe: ", {...newEmploye });
    result(null, {...newEmploye });
  });
};

Employe.findById = (employesID, result) => {
  sql.query("SELECT * FROM Employe, Personne WHERE Employe.ID_personne = Personne.ID_personne and Employe.ID_personne = ?", employesID, (err, res) => {
    if (err) {
      console.log("erreur: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Employe trouvé: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "Employe pas trouvé" }, null);
  });
};

Employe.getAll = result => {
  sql.query("SELECT * FROM Employe, Personne WHERE Employe.ID_personne = Personne.ID_personne", (err, res) => {
    if (err) {
      console.log("erreur: ", err);
      result(null, err);
      return;
    }

    console.log("Liste d'employes: ", res);
    result(null, res);
  });
};

Employe.remove = (id, result) => {
  sql.query("DELETE FROM Employe, Personne WHERE Employe.ID_personne = Personne.ID_personne and Employe.ID_personne = ?", id, (err, res) => {
    if (err) {
      console.log("erreur: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "Employe pas trouvé" }, null);
      return;
    }

    console.log("Employe avec id supprimé: ", id);
    result(null, res);
  });
};

module.exports = Employe;
