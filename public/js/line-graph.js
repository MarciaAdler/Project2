$(document).ready(() => {

    // console.log("Country Name:" + $('#country-name').text());

    let countryName = $('#country-name').text();
    let queryUrl = "/api/d3/";

    if (countryName) {
        queryUrl = "/api/d3/" + countryName;
    }
    
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(response => {
        console.log("D3: ");
        console.log(response);
        // 2. Use the margin convention practice 
        // $('.alert-secondary');
        var margin = {top: 50, right: 50, bottom: 50, left: 50}
        , width = (window.innerWidth - margin.left - margin.right) * 0.7 // Use the window's width 
        , height = (window.innerHeight - margin.top - margin.bottom) * 0.7; // Use the window's height

        // The number of datapoints
        var n = response.length;

        // 5. X scale will use the index of our data
        var xScale = d3.scaleLinear()
            .domain([0, n-1]) // input
            .range([0, width]); // output

        // console.log("Response:");
        // console.log(response[response.length - 1].y);
        // 6. Y scale will use the randomly generate number 
        var yScale = d3.scaleLinear()
            .domain([0, response[response.length - 1].y]) // input 
            .range([height, 0]); // output 

        // 7. d3's line generator
        var line = d3.line()
            .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
            .y(function(d) { return yScale(d.y); }) // set the y values for the line generator 
            .curve(d3.curveMonotoneX) // apply smoothing to the line

        // 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number


        var dataset = response;

        // response.forEach(case => {

        // });
        // d3.range(n).map(function(d) { return {"y": d3.randomUniform(1000)() } })

        console.log(dataset)

        // 1. Add the SVG to the page and employ #2
        var svg = d3.select(".alert-secondary").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // 3. Call the x axis in a group tag
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

        // 4. Call the y axis in a group tag
        svg.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

        // 9. Append the path, bind the data, and call the line generator 
        svg.append("path")
            .datum(dataset) // 10. Binds data to the line 
            .attr("class", "line") // Assign a class for styling 
            .attr("d", line); // 11. Calls the line generator 

        // 12. Appends a circle for each datapoint 
        svg.selectAll(".dot")
            .data(dataset)
        .enter().append("circle") // Uses the enter().append() method
            .attr("class", "dot") // Assign a class for styling
            .attr("cx", function(d, i) { return xScale(i) })
            .attr("cy", function(d) { return yScale(d.y) })
            .attr("r", 5)
            .on("mouseover", function(a, b, c) { 
                    console.log(a) 
                this.attr('class', 'focus')
                })
            .on("mouseout", function() {  })
    })


});
