/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]

// Document.ready
$(() => {
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
        </article>`;

    return html
  };


  const renderTweets = (tweets) => {
    // console.log(tweets);
      $(".tweetcontainer").empty();
      for (let tweet of tweets) {
        const $tweet = createTweetElement(tweet);
        $(".tweetcontainer").prepend($tweet);
      }
  };
  

  const loadTweets = function() {
    $.ajax({
      url: "/tweets",
      method: "GET",
    }).then((data) => {
        renderTweets(data);
      })
  };

  loadTweets();

// AJAX POST request for form
  $('form').on("submit", (e) => {
    e.preventDefault();
    const data = $("form").serialize();
    const $tweet = $(".tweetitself").val();
    if (!$('.tweetitself').val()) {
      return alert('You cannot post an empty tweet!');
    }
    if ($('.tweetitself').val().length > 140) {
      return alert("Your tweet exceeds the maximum characters");
    }
    $.ajax({
      url: "/tweets",
      method: "POST",
      data
    }).then(() => {
      loadTweets();
      // clears form after submit
      $('form').trigger('reset');
    })
  });
})
