$(document).ready(() => {

var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: 'KtNnLCN6QzHsMDJE7O6ycjVts',
  consumer_secret: 'VPz51xRgxknMO4vsuuq6PggSR2f9FbObXeAMrW46x6XAoZnEmN',
  bearer_token: 'AAAAAAAAAAAAAAAAAAAAABxfCgEAAAAAgxEYPBvPgVqOCb2T4Dz2r0t4QFU%3Dmp42L7d3GGF7zScntcAiKt69jvOL06r08nsLBwJYDTzT8YThqV'
});

// finds the five of the coronavirus searches
 
client.get('search/tweets', {q: 'coronavirus cases lang:en'})
.then(function(error, tweets, response) {
  for (var i = 0; i < 4; i ++){
    // //profile image 
    var profImage = tweets.statuses[i].user.profile_image_url;
    // // date created at 
    var timeCreated = tweets.statuses[i].created_at;
    // username
    var username = (tweets.statuses[i].user.screen_name);
    //tweet
    var tweet = (tweets.statuses[i].text);

    let twitter = $('<div class="card bg-light mb-3" style="max-width: 50rem;">');
      twitter.append (`<div class="card-header"><img class= "circular--square" src= "${profImage}" class="rounded mx-auto d-block" alt="Twitter Profile Image"><h6 class= "twitterUsername">"${username}"</h6></div>`)
      twitter.append(`<div class="card-body"><p class="card-text">"${tweet}"</p></div>`);
      $('.twitter-feed').append(twitter);

  }
});
});