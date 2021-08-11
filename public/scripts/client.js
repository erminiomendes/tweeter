/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//$(()=>{});
$(document).ready(function() {

  const fetchTweets = function () {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: (tweets) => {
        console.log(tweets);
        renderTweets(tweets);
      },
      error: (err) => {
        console.err(err);
      }
    })
  }


  const renderTweets = function(users) {
    //users = users.reverse()
    const $tweetsContainer = $('#tweets-container'); // Select element from the DOM by id or class (CSS) 
    for (const user of users) {
      $tweetsContainer.prepend(createTweetElement(user));     //prepend
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

  fetchTweets();

  $('#submit-form').submit(function(event) {
    // prevent the default behaviour of the submit event (data submission and page refresh)
    event.preventDefault();
    //this representa form - serialize convert obj in string
    const serializeData = $(this).serialize(); 
    $.post('/tweets', serializeData, (response) => {
      console.log(response);
      fetchTweets();
    });
  });

});

