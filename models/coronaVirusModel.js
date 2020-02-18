// Dependencies
// =============================================================

// This may be confusing but here Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var sequelize = require("./connection");

// Creates a model that matches up with DB
var cases = sequelize.define("cases", {
    province: Sequelize.STRING,
    country: Sequelize.STRING,
    lat: Sequelize.FLOAT,
    long: Sequelize.FLOAT,
    cases: Sequelize.INTEGER,
    caseDay: Sequelize.INTEGER,
    date: Sequelize.DATE
});

var deaths = sequelize.define("deaths", {
    province: Sequelize.STRING,
    country: Sequelize.STRING,
    lat: Sequelize.FLOAT,
    long: Sequelize.FLOAT,
    deaths: Sequelize.INTEGER,
    caseDay: Sequelize.INTEGER,
    date: Sequelize.DATE
});

var recovered = sequelize.define("recovered", {
    province: Sequelize.STRING,
    country: Sequelize.STRING,
    lat: Sequelize.FLOAT,
    long: Sequelize.FLOAT,
    recovered: Sequelize.INTEGER,
    caseDay: Sequelize.INTEGER,
    date: Sequelize.DATE
});

// Syncs with DB
cases.sync({force: true});
deaths.sync({force: true});
recovered.sync({force: true});


// Makes the Model available for other files (will also create a table)
module.exports = cases, deaths, recovered;
