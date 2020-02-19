$(document).ready(() => {
    let userQuery = "";
    let countriesToFilter = [];

    $.ajax({
        url: "/api/countries",
        method: "GET"
    }).then(response => {
        // console.log(response);
        response.forEach(country => {
            countriesToFilter.push(country);
        });
    })
    // console.log(countriesToFilter);

    $('.search-bar').on("keydown", function(event){
        // $('.search-bar').val()
        // console.log(event.key)
        if (event.keyCode >= 65 && event.keyCode <= 90) {
            // console.log(event.key);
            userQuery += event.key;
            userQuery.trim();
            // console.log(userQuery);
            searchResults(userQuery);
        } else if (event.key === "Backspace"){
            if ($('.search-bar').val() !== "") {
                userQuery = $('.search-bar').val().trim();
                userQuery = userQuery.slice(0, -1); 
                // console.log(userQuery);
                searchResults(userQuery);
            }
        }
    });



    const searchResults = str => {
        $('.search-bar-dropdown').html("");

        countriesToFilter.forEach(country => {
            for (var i = 0;i < str.length; i++) {
                var strCheck = country.includes(str);
                if (strCheck === true){
                    $('.search-bar-dropdown').removeClass('d-none');
                    $('.search-bar-dropdown').prepend(`<a href="/${country}" class="px-3 py-2"  data-country="${country}">${country}</a>`);
                    return;
                }
            }
        });
    }
    
});