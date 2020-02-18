// Dependencies
var Sequelize = require("sequelize");

let connection;
if (process.env.JAWSDB_URL) {
  connection = Sequelize.createConnection(process.env.JAWSDB_URL);
} else {
  connection = Sequelize.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Databasepassword",
    database: "coronavirus_db"
  });
}

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

module.exports = connection;
