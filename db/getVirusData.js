// load dependencies
const puppeteer = require('puppeteer');
const fs = require("fs");
var Virus = require("./virusModel");


// site to scrape
const site = "https://www.ecdc.europa.eu/en/geographical-distribution-2019-ncov-cases"

// create async function to scrape a page
let scrape = async function(site) {
    // create broswer and page variable to hold puppeteer functionality
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    // goto a specific page
    await page.goto(site);
    // hold the results from the page in a variable called result
    const result = await page.evaluate(function() {
        // lets scrape all the td elements from a table
        const tds = Array.from(document.querySelectorAll("td"))
        console.log(tds);
        // create a new array using map to hold the inner text
        rawData = tds.map(td => td.innerText)
        // the data comes to us in a long string of ~50 td elements so lets create an easier to read
        // array called "parsedArray" which will take the structure:
        // X rows by Y columns where X = number of countries and Y = number of data points for each
        let parsedArray = [];
        // td counter will track each data element we push into a temporary row array which we'll
        // then insert to the bigger table
        let tdCount = 0;
        // divide our top loop by 5 to iterate just enough times to get all countries
        for (let i = 0; i < (rawData.length / 5); i++) {
            // create an empty row array each time we run a country
            let rowArray = [];
            for (let j = 0; j < 5; j++) {
                // push td elements into the temp row
                rowArray.push(rawData[tdCount]);
                tdCount++;
            }
            // push the finished row of 5 td elements into the larger array
            parsedArray.push(rowArray);
        }
        return parsedArray;
    });
    // if the parser worked we should see the following data structure
    // [
    //  [ continent, country A, cases, deaths, other info],
    //  [ continent, country B, cases, deaths, other info],
    //  etc...
    // ]
    
    // console.log(result);
    await browser.close();
    return result;
};

let scraper = async function() {
    
    var results = await scrape(site);  
    // console.log(results)      
    for (let i = 0; i < results.length; i++) {
        let dataRow = results[i];
        console.log(dataRow)

        Virus.create({
            continent: dataRow[0],
            country: dataRow[1],
            cases: dataRow[2],
            deaths: dataRow[3],
            other: dataRow[4]
        });
    }
        
    fs.appendFile("virusData.json", JSON.stringify(results), function(err) {
        if (err) throw err;
        console.log("Saved!");
    });
};

scraper();