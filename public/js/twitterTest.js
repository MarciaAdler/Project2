$(document).ready(() => {

  $.ajax({
    url: "/api/twitter",
    method: "GET"
  }).then(response => {
    // console.log(response);
    let statuses = response.statuses;
    let fiveTweets = statuses.slice(0,5);
    // console.log(fiveTweets);
    // $('.twitter-feed').append("Hello");

    fiveTweets.forEach(tweet => {
        let twitter = $('<div class="card bg-light mb-3" style="max-width: 50rem;">');
            twitter.append (`<div class="card-header"><img class= "circular--square" src="${tweet.user.profile_image_url}" class="rounded mx-auto d-block" alt="Twitter Profile Image"><h6 class="twitterUsername">@${tweet.user.screen_name}</h6></div>`);
            twitter.append(`<div class="card-body"><p class="card-text">"${tweet.text}"</p></div>`);
            // console.log(tweet);
            // $('.twitter-feed').append("Hello");
            $('.twitter-feed').append(twitter);

<<<<<<< HEAD
// finds the five of the coronavirus searches
 
client.get('search/tweets', {q: 'coronavirus cases lang:en'}, function(error, tweets, response) {
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
=======

    });

    

  })
>>>>>>> master
});