const mysql = require("mysql");
const dbConfig = require("./config/DataB_config");

// CONNECTION BASE DE DONNEES:
// Connection à la BD
const connection = mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database
  });

module.exports = connection;