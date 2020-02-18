let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        let currentDate = yyyy + "-" + mm + "-" + dd;
        // console.log(currentDate);

        $(document).ready(() => {

        let url = 'http://newsapi.org/v2/everything?language=en&' +
          'q=Coronavirus&' +
          'from=' + currentDate + 
          'sortBy=popularity&' +
          'apiKey=b499be5fe2be429f9cd678c5202aba0d';

        $.ajax({
            url: url,
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