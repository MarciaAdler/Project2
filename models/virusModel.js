// Dependencies
// =============================================================

// This may be confusing but here Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var sequelize = require("./connection");

// Creates a model that matches up with DB
var Virus = sequelize.define("virus", {
  continent: Sequelize.STRING,
  country: Sequelize.STRING,
  cases: Sequelize.INTEGER,
  deaths: Sequelize.INTEGER,
  comments: Sequelize.STRING
});

// Syncs with DB
Virus.sync();

// Makes the Model available for other files (will also create a table)
module.exports = Virus;
