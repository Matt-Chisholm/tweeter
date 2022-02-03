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
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
// Dynamically create tweet element
  const createTweetElement = (tweet) => {
    let html = `<article>
          <header class="tweetheader">
            <div class="name"><img class="userimg" src="${tweet.user.avatars}"><h3>${tweet.user.name}</h3></div>
            <h5 class="handle">${tweet.user.handle}</h5>
          </header>
          <p class="tweetitself">
            ${escape(tweet.content.text)}
          </p>
          <footer class="tweetfooter">
            <div class="tweettime">${timeago.format(tweet.created_at)}</div>
            <div class="icons">
              <i class="fas fa-flag icon-footer"></i>
              <i id="123" class="fas fa-heart icon-footer"></i>
              <i class="fas fa-retweet icon-footer"></i>
            </div>
          </footer>
        </article>`;

    return html
  };

// Render tweets from db
  const renderTweets = (tweets) => {
    // console.log(tweets);
      $(".tweetcontainer").empty();
      for (let tweet of tweets) {
        const $tweet = createTweetElement(tweet);
        $(".tweetcontainer").prepend($tweet);
      }
  };
  
// Get method to retrieve tweets to send to render
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
  $('form').on("submit", (event) => {
    event.preventDefault();
    const $text = $(".tweet-text").val();
    const data = $("form").serialize();
    if (!$text.length) {
      $(".error").text("Cannot tweet an empty form!");
      $(".error").slideDown();
      return;
    }
    if ($text.length > 140) {
      $(".error").text("Cannot tweet more than 140 characters!");
      $(".error").slideDown();
      return;
    }
    $.ajax({
      url: "/tweets",
      method: "POST",
      data
    }).then(() => {
      $(".error").slideUp();
      loadTweets();
      $('.newtweetnav').slideToggle(200);
      $('.new-tweet').slideToggle(200);
      // clears form after submit
      $('form').trigger('reset');
    })
  });

// Toggles the new-tweet form 
  $('.newtweetnav').on('click', function() {
    $('.new-tweet').slideToggle(200);
    $('.newtweetnav').slideToggle(200);
  });

  $(".fa-heart").bind('click', function(event) {
    console.log('Clicked', this);
    $(this).css("background-color", "pink");
  });



  const btn = $('#button');

  $(window).scroll(function() {
    if ($(window).scrollTop() > 300) {
      btn.addClass('show');
    } else {
      btn.removeClass('show');
    }
  });

  btn.on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({scrollTop:0}, '300');
  });

})

