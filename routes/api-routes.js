require("dotenv").config();
// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
const axios = require("axios");
var Twitter = require('twitter');
var client = new Twitter({
  consumer_key: 'KtNnLCN6QzHsMDJE7O6ycjVts',
  consumer_secret: 'VPz51xRgxknMO4vsuuq6PggSR2f9FbObXeAMrW46x6XAoZnEmN',
  bearer_token: 'AAAAAAAAAAAAAAAAAAAAABxfCgEAAAAAgxEYPBvPgVqOCb2T4Dz2r0t4QFU%3Dmp42L7d3GGF7zScntcAiKt69jvOL06r08nsLBwJYDTzT8YThqV'
});

module.exports = function(app) {

  // grab all countries
  app.get("/api/countries", function(req, res){
    db.Case.findAll({
      where: {
        caseDay: 1
      }
    }).then(function(rows){
      // rows.reduce()
      let countryArr = [];
      rows.forEach(row => {
        countryArr.push(row.country);
      });
      // res.send(rows);
      countryArr.sort();
      finalCountries = countryArr.filter((country, i, arr) => {
        if (country !== arr[i - 1]) {
          return country;
        }
      });
      res.json(finalCountries);
    });
  });

  // grab all case numbers for d3 line graph y-axis 
  app.get("/api/d3", function(req, res){
    db.Case.findAll({}).then(function(cb) {
      let provinces = 0;
      for (let i = 0; i < cb.length; i++) {
          if (cb[i].dataValues.caseDay === 1) {
              provinces++;
          }
      }
  
      let caseDays = cb.length / provinces;
      let caseArr = [];
      let objCounter = 0;
      for (let i = 0; i < caseDays; i++) {
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
        res.json(newArray);
    });

  });

  // grab all case numbers for d3 line graph y-axis 
  app.get("/api/d3/:location", function(req, res){
    db.Case.findAll({
      where: {
        country: req.params.location
      }
    }).then(function(cb) {
      let provinces = 0;
      for (let i = 0; i < cb.length; i++) {
          if (cb[i].dataValues.caseDay === 1) {
              provinces++;
          }
      }
  
      let caseDays = cb.length / provinces;
      let caseArr = [];
      let objCounter = 0;
      for (let i = 0; i < caseDays; i++) {
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
        res.json(newArray);
    });

  });

  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    db.User.findOne({
      where: {
        email: req.body.email
      }
    }).then(function(user) {
      res.render("index");
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });


  // search virus by specific location
  app.get("/api/searches/:location", function(req, res) {
    db.virusModel
      .findAll({
        where: {
          id: req.params.location
        },
        include: [db.virusModel]
      })
      .then(function(dbvirusModel) {
        res.json(dbvirusModel);
      });
  });

  app.get("/api/users/:id", function(req, res) {
    db.User.findAll({
      where: {
        id: req.params.id
      },
      include: [db.Search]
    }).then(function(dbSearch) {
      res.json(dbSearch);
    });
  });
  app.post("/api/searches", function(req, res) {
    // console.log("req.body:")
    // console.log(req.body);
    db.Search.create(req.body).then(function(dbSearch) {
      console.log(dbSearch);
      // res.json(dbSearch);
    });
  });


app.get("/api/twitter", function(req, res){
  client.get('search/tweets', {q: 'coronavirus cases lang:en'}, function(error, tweets, response) {
    
    res.json(tweets);
  });
  
});

  app.get("/api/news", function(req, res) {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();
    let currentDate = yyyy + "-" + mm + "-" + dd;
    let queryURL =
      "http://newsapi.org/v2/everything?language=en&" +
      "q=Coronavirus&" +
      "from=" +
      currentDate +
      "sortBy=publishedAt&" +
      "apiKey=" +
      process.env.NEWS_API;

    // console.log(queryURL);
    // res.send(queryURL);
    axios.get(queryURL).then(function(news) {
      res.json(news.data);
    });
  });
};


// axios.get(queryURL
//   ).then(function(response){
//     let articlesArray = response.articles;
//     articlesArray.forEach(article => {

//         let newsItem = $('<div class="news-item py-3 border-bottom">');

//         newsItem.append(`<p class="news-item-title mb-0"><a href="${article.url}" target="_blank">${article.title}</a></p>`);
//         newsItem.append(`<p class="news-item-source mb-0">Source: ${article.source.name}</p>`);
//         $('.news-feed').append(newsItem);
//     });
//   });
