var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: 'KtNnLCN6QzHsMDJE7O6ycjVts',
  consumer_secret: 'VPz51xRgxknMO4vsuuq6PggSR2f9FbObXeAMrW46x6XAoZnEmN',
  bearer_token: 'AAAAAAAAAAAAAAAAAAAAABxfCgEAAAAAgxEYPBvPgVqOCb2T4Dz2r0t4QFU%3Dmp42L7d3GGF7zScntcAiKt69jvOL06r08nsLBwJYDTzT8YThqV'
});

// finds the five of the coronavirus searches
 
client.get('search/tweets', {q: 'coronavirus cases lang:en'}, function(error, tweets, response) {
  // console.log(tweets);
console.log(tweets.statuses[0].text)
console.log(tweets.statuses[1].text)
console.log(tweets.statuses[2].text)
console.log(tweets.statuses[3].text)
console.log(tweets.statuses[4].text)
});

