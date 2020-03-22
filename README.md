# Project2

## User Story

As a concerned citizen and parent
I would like to stay up to date on the Coronavirus
so I can have peace of mind for my loved ones

## Overall Concept

The user will be able to :

<ul> 
<li>View the history of the Coronavirus </li>
<li>Track the virus by location worldwide</li>
<li>View news coverage & Twitter posts </li>
</ul>

## Technologies Used

<ul>
<li>Data Scraping</li>
<li>Bootstrap</li>
<li>d3 </li>
<li>Twitter and news API</li>
<li>New npm packages: 
<ul>
<li>puppeteer</li>
<li>twitter</li>
<li>axios</li>
<li>sqeuelize</li>
<li>mysql2</li>
<li>express</li>
<li>express-handlebars</li>
<li>passport</li>
</ul>
</li>

## How to use

<ol>
<li>To run the program, once you have the code open, run an npm install to install all the required npm packages.  You can look at the package.json to view the entire list of packages that you will install (most are listed above).</li>
<li>Go into the config folder, and update the config.json file with the information for your local database in the development section.</li>
<li>In MySQL workbench, copy the code from the folder db -> schema.sql file and run in MySQL workbench.  This will setup your database.  Ensure the database name that you run in this code matches whatever you have in your config.json file in the development section.
<li>Now that the database is setup, go into db -> coronaVirusData.js and uncomment out the code that says "uncomment the below code at startup to seed the database".  There are two areas of code that say this, one at the top of the scraper function, and one at teh bottom of the code above the export.  Once uncommented, run "node coronaVirusData.js" in your terminal.</li>
<li>After you seed your database, comment out the code you uncommented out in the above step.  Now run an npm start to launch the application</li>
</ol>

## Link

Below is the link to the app that is hosted on Heroku.
https://shrouded-woodland-22808.herokuapp.com/
