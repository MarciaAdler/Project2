var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: 'KtNnLCN6QzHsMDJE7O6ycjVts',
  consumer_secret: 'VPz51xRgxknMO4vsuuq6PggSR2f9FbObXeAMrW46x6XAoZnEmN',
  bearer_token: 'AAAAAAAAAAAAAAAAAAAAABxfCgEAAAAAgxEYPBvPgVqOCb2T4Dz2r0t4QFU%3Dmp42L7d3GGF7zScntcAiKt69jvOL06r08nsLBwJYDTzT8YThqV'
});
 
var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});

var stream = client.stream('statuses/filter', {track: 'javascript'});
stream.on('data', function(event) {
  console.log(event && event.text);
});
 
stream.on('error', function(error) {
  throw error;
});
 
// You can also get the stream in a callback if you prefer.
client.stream('statuses/filter', {track: 'javascript'}, function(stream) {
  stream.on('data', function(event) {
    console.log(event && event.text);
  });
 
  stream.on('error', function(error) {
    throw error;
  });
});
// var settings = {
//   "url": "https://api.twitter.com/1.1/search/tweets.json?q=coronavirus",
//   "method": "GET",
//   "timeout": 0,
//   "headers": {
//     "Authorization": "Bearer AAAAAAAAAAAAAAAAAAAAABxfCgEAAAAAgxEYPBvPgVqOCb2T4Dz2r0t4QFU%3Dmp42L7d3GGF7zScntcAiKt69jvOL06r08nsLBwJYDTzT8YThqV"
//   },
// };

// $.ajax(settings).done(function (response) {
//   console.log(response);
//   $("#tweet").text(response.statuses[0].text);
// });

