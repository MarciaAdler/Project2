// Dependencies
// =============================================================

// This may be confusing but here Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
// var sequelize = require("../config/connection");
// Creating our User model
module.exports = function(sequelize, DataTypes) {
  // Creates a model that matches up with DB
  var Case = sequelize.define("Case", {
    province: Sequelize.STRING,
    country: Sequelize.STRING,
    lat: Sequelize.FLOAT,
    long: Sequelize.FLOAT,
    cases: Sequelize.INTEGER,
    caseDay: Sequelize.INTEGER,
    date: Sequelize.DATE
  });
  Case.sync({ force: true });
  return Case;
};
// var deaths = sequelize.define("deaths", {
//   province: Sequelize.STRING,
//   country: Sequelize.STRING,
//   lat: Sequelize.FLOAT,
//   long: Sequelize.FLOAT,
//   deaths: Sequelize.INTEGER,
//   caseDay: Sequelize.INTEGER,
//   date: Sequelize.DATE
// });

// var recovered = sequelize.define("recovered", {
//   province: Sequelize.STRING,
//   country: Sequelize.STRING,
//   lat: Sequelize.FLOAT,
//   long: Sequelize.FLOAT,
//   recovered: Sequelize.INTEGER,
//   caseDay: Sequelize.INTEGER,
//   date: Sequelize.DATE
// });

// Syncs with DB

// deaths.sync({ force: true });
// recovered.sync({ force: true });

// Makes the Model available for other files (will also create a table)
// (module.exports = cases), deaths, recovered;
