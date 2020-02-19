// load dependencies
const puppeteer = require("puppeteer");
const fs = require("fs");
const db = require("../models/");

// site to scrape
const caseSite =
  "https://github.com/CSSEGISandData/COVID-19/blob/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv";

// const deathsSite = "https://github.com/CSSEGISandData/COVID-19/blob/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Deaths.csv"

// create async function to scrape a page
let scrape = async function(site) {
  // create broswer and page variable to hold puppeteer functionality
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  // goto a specific page
  await page.goto(site);
  // hold the results from the page in a variable called result
  const result = await page.evaluate(function() {
    const tableHeaders = Array.from(document.querySelectorAll("th"));
    // We have 5 constant columns (ID, province, country, lat, long, cases)
    const numberOfStaticColumns = 5;
    const daysOfData = tableHeaders.length - 5;
    // How many provinces in the data
    const tableRows = Array.from(document.querySelectorAll("tr"));
    const numberOfProvinces = tableRows.length;

    const tds = Array.from(document.querySelectorAll("td"));
    rawData = tds.map(td => td.innerText);
    let parsedArray = [];
    parsedArray.push(tableHeaders.map(th => th.innerText));
    // td counter will track each data element we push into a temporary row array which we'll
    // then insert to the bigger table
    let tdCount = 1;
    // divide our top loop by 5 to iterate just enough times to get all countries
    for (let i = 0; i < numberOfProvinces - 1; i++) {
      // create an empty row array each time we run a country
      let rowArray = [];
      for (let j = 0; j <= tableHeaders.length; j++) {
        // push td elements into the temp row
        rowArray.push(rawData[tdCount]);
        tdCount++;
      }
      // push the finished row of 5 td elements into the larger array
      parsedArray.push(rowArray);
    }
    return parsedArray;
  });

  await browser.close();
  return result;
};

let scraper = async function() {
  // db.Case.destroy({
  //   where: {},
  //   truncate: true
  // })

  var results = await scrape(caseSite);
  console.log(results);

  var daysOfData = results[1].length - 5;
  var numberOfProvinces = results.length - 1;
  console.log(daysOfData);
  console.log(numberOfProvinces);

  for (let i = 0; i < daysOfData; i++) {
    const day = i + 5;

    console.log(day);
    for (let j = 1; j <= numberOfProvinces; j++) {
      db.Case.create({
        province: results[j][1],
        country: results[j][2],
        lat: results[j][3],
        long: results[j][4],
        cases: results[j][day],
        caseDay: day - 4,
        date: results[0][day - 1]
      });
    }
  }

  fs.writeFile("covid_data.json", JSON.stringify(results), function(err) {
    if (err) throw err;
    console.log("Saved!");
  });
};

// scraper(caseSite);

module.exports = scraper;
