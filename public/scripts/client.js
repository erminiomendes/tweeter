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
        //console.log(tweets);
        renderTweets(tweets);
      },
      error: (err) => {
        console.err(err);
      }
    })
  };

  const renderTweets = function(users) {
    //users = users.reverse()
    const $tweetsContainer = $('#tweets-container'); // Select element from the DOM by id or class (CSS) 
    for (const user of users) {
      $tweetsContainer.prepend(createTweetElement(user));     //prepend
    }
  };

  // help function to avoid tweet with malicious code like alert();
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
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
            <p>${escape(tweetData.content.text)}</p>
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
    const text = $('#tweet-text').val();
    var message = $('#messageInput').val();
    $('#alertMsg').hide("slow");

    if ($('#tweet-text').val().length > 140) {
      $('#alertMsg').show("slow").text("☹️   Sorry, you exceeds the 140 character limit   ☹️");
      return false;
    } 

    if ($('#tweet-text').val().length === 0) {
      $('#alertMsg').show("slow").text("⚠️   Please, write something   ⚠️");
       return false;
    } 

    //this representa form - serialize convert obj in string
    const $serializeData = $(this).serialize(); 

    $.post('/tweets', $serializeData, (response) => {
      //console.log(serializeData);
      fetchTweets();
      $('.counter').val('140');
      $('#tweet-text').val('');    
    });

    
  });

});

