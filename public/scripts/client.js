/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]
$(() => {
  // Rendering the tweet and adding it to the DOM
const renderTweets = (tweets) => {
  $.ajax({
    url: "/tweets",
    action: "GET"
  })
  .then((res) => {

    for (const user of res) {
      const $tweet = createTweetElement(user);
      const $tweetlist = $(".tweetcontainer");
      $tweetlist.prepend($tweet);
    }
  })
};

// Creating a tweet from db and input from user
const createTweetElement = (tweet) => {
  let html = `<article>
        <header class="tweetheader">
          <div class="name"><img class="userimg" src="${tweet.user.avatars}"><h3>${tweet.user.name}</h3></div>
          <h5>${tweet.user.handle}</h5>
        </header>
        <p class="tweetitself">
          ${tweet.content.text}
        </p>
        <footer class="tweetfooter">
          <div class="tweettime">${timeago.format(tweet.created_at)}</div>
          <div>
            <i class="fas fa-flag icon-footer"></i>
            <i class="fas fa-heart icon-footer"></i>
            <i class="fas fa-retweet icon-footer"></i>
    
          </div>
        </footer>
      </article>`
  return html
}

renderTweets(data);

})
