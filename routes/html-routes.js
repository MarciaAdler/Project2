// const express = require("express");
// var exphbs = require("express-handlebars");
// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
const db = require("../models/");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", function(req, res) {
    // res.render("index");

    // res.render("index", newArray);
    // If the user already has an account send them to the members page

    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

<<<<<<< HEAD
  app.get("/:location", function(req, res) {
=======
  app.get("/members/:location", function(req, res) {
>>>>>>> master
    db.Case.findAll({
      where: {
        country: req.params.location
      }
    }).then(function(cb) {
      let provinces = 0;
      for (let i = 0; i < cb.length; i++) {
<<<<<<< HEAD
          if (cb[i].dataValues.caseDay === 1) {
              provinces++;
          }
      }
  
=======
        if (cb[i].dataValues.caseDay === 1) {
          provinces++;
        }
      }

>>>>>>> master
      let caseDays = cb.length / provinces;
      let caseArr = [];
      let objCounter = 0;
      for (let i = 0; i < caseDays; i++) {
<<<<<<< HEAD
          let cases = 0;
          for (let j = 0; j < provinces; j++) {
              cases +=  cb[objCounter].dataValues.cases;
              objCounter++;
          }
          caseArr.push(cases)
      }
      let newArray = caseArr.map(function(aCase) {
          return { y: aCase};
      });
      let casesObj = {
        yAxis: newArray
      }
      res.render("index", casesObj);
  });
=======
        let cases = 0;
        for (let j = 0; j < provinces; j++) {
          cases += cb[objCounter].dataValues.cases;
          objCounter++;
        }
        caseArr.push(cases);
      }
      let newArray = caseArr.map(function(aCase) {
        return { y: aCase };
      });
      let casesObj = {
        yAxis: newArray
      };
      res.render("index", casesObj);
    });
>>>>>>> master

    // res.render("index");
    // If the user already has an account send them to the members page

    // res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    res.render("index");
  });

  // to search by user input
  app.get("/signup", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });
};
