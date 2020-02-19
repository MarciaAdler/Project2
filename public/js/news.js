
$(document).ready(() => {

$.ajax({
    url: "/api/news",
    method: "GET"
}).then(response => {
    // console.log(response);
    let articlesArray = response.articles;
    articlesArray.forEach(article => {

        let newsItem = $('<div class="news-item py-3 border-bottom">');
        
        newsItem.append(`<p class="news-item-title mb-0"><a href="${article.url}" target="_blank">${article.title}</a></p>`);
        newsItem.append(`<p class="news-item-source mb-0">Source: ${article.source.name}</p>`);
        $('.news-feed').append(newsItem);
    });
})

});