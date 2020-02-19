$(document).ready(() => {

    $.ajax({
        url: "/api/countries",
        method: "GET"
    }).then(response => {
        // console.log(response);
        response.forEach(country => {
            let navLink = $(`<a href="/members/${country}" class="nav-item nav-link px-3 country-link" data-country="${country}">${country}</a>`);
            $('.navbar-nav').append(navLink);

        });
    })
    
});