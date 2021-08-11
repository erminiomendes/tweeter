/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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
      "text": "Je pense, donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Billy",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@Bil"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1628472236712
  },
  {
    "user": {
      "name": "Emily",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@Emi"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1628558636712
  }

];



$(document).ready(function() {

  const renderTweets = function(users) {
    const $tweetsContainer = $('#tweets-container');
    for (const user of users) {
      $tweetsContainer.append(createTweetElement(user));
    }
  };
  
  const createTweetElement = function(tweetData) {
    const $newTweet = $(`
   
      <article class="articleTweet">

        <header class="articleTweetHeader">
          <div class="picName">
            <img src=${tweetData.user.avatars} alt="profilePicture">
            <p>${tweetData.user.name}</p>
          </div>
            <a>${tweetData.user.handle}</a>
        </header>
          <div class="content">
            <p>${tweetData.content.text}</p>
          </div>
          <footer class="articleTweetFooter">
            <p> ${timeago.format(tweetData.created_at)}</p>
            <div>
              <i class="fas fa-flag"></i> 
              <i class="fas fa-retweet"></i>
              <i class="fas fa-heart"></i>
            </div>
          </footer>
      </article>
     `);
      
    return $newTweet;
  };

  renderTweets(data);

  // $('#submit-form').submit(function(event) {
  //   event.preventDefault();
  //   console.log(event);
  // });

});

