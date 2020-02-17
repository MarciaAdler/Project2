//API key: b499be5fe2be429f9cd678c5202aba0d

var url = 'http://newsapi.org/v2/everything?' +
          'q=Apple&' +
          'from=2020-02-17&' +
          'sortBy=popularity&' +
          'apiKey=b499be5fe2be429f9cd678c5202aba0d';

var req = new Request(url);

fetch(req)
    .then(function(response) {
        console.log(response.json());
    });