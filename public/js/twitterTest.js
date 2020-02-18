var settings = {
  "url": "https://api.twitter.com/1.1/search/tweets.json?q=coronavirus",
  "method": "GET",
  "timeout": 0,
  "headers": {
    "Authorization": "Bearer AAAAAAAAAAAAAAAAAAAAABxfCgEAAAAAgxEYPBvPgVqOCb2T4Dz2r0t4QFU%3Dmp42L7d3GGF7zScntcAiKt69jvOL06r08nsLBwJYDTzT8YThqV"
  },
};

$.ajax(settings).done(function (response) {
  console.log(response);
});