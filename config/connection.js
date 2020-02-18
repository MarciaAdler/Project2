// Dependencies
var Sequelize = require("sequelize");
let sequelize;
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(
    "dj3lu0ivan1m31rr",
    "xbuuk9gp3y04z8qc",
    "t36vabtn99wbzb03",
    {
      host: "yhrz9vns005e0734.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
      dialect: "mysql"
    }
  );
} else {
  // Creates mySQL connection using Sequelize, the empty string in the third argument spot is our password.
  sequelize = new Sequelize("coronavirus_db", "root", "dbpw1234", {
    host: "localhost",
    port: 3306,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  });
}

module.exports = sequelize;
