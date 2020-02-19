$(document).ready(() => {
    let countryName = $('#country-name').text();

    $.ajax({
        method: "GET",
        url: "/api/user_data"
    }).then(response => {
        let newHistoryItem = {
            location: countryName,
            foreignKey: response.id
        }

        $.ajax("/api/searches",{
            method: "POST",
            data: newHistoryItem
        }).then(response => {
            console.log("added!");
        });

    });
    

});