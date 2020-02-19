
$(document).ready(() => {

    $.ajax({
        url: "/api/countries",
        method: "GET"
    }).then(response => {
        // console.log(response);
        response.forEach(country => {
            let navLink = $(`<a href="/${country}" class="nav-item nav-link px-3">${country}</a>`);
            $('.navbar-nav').append(navLink);

        });
    })
    
});