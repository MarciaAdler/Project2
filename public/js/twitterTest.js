$(document).ready(() => {

  $.ajax({
    url: "/api/twitter",
    method: "GET"
  }).then(response => {
    // console.log(response);
    let statuses = response.statuses;
    let fiveTweets = statuses.slice(0,5);
    console.log(fiveTweets);
    // $('.twitter-feed').append("Hello");

    fiveTweets.forEach(tweet => {
        let twitter = $('<div class="card bg-light mb-3" style="max-width: 50rem;">');
            twitter.append (`<div class="card-header"><img class= "circular--square" src="${tweet.user.profile_image_url}" class="rounded mx-auto d-block" alt="Twitter Profile Image"><h6 class="twitterUsername">@${tweet.user.screen_name}</h6></div>`);
            twitter.append(`<div class="card-body"><p class="card-text">"${tweet.text}"</p></div>`);
            // console.log(tweet);
            // $('.twitter-feed').append("Hello");
            $('.twitter-feed').append(twitter);


    });

    

  })
});