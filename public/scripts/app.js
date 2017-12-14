/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



function createTweetElement(tweet){
  var $tweet = $('<article>').addClass('tweet');
  $tweet.append($('<header>')
    .append($('<img>').attr('src', tweet.user.avatars.small))
    .append($('<h3>').text(tweet.user.name))
    .append($('<span>').text(tweet.user.handle))
  );
  $tweet.append($('<div>').text(tweet.content.text));
  $tweet.append($('<footer>')
    .append($('<p>').text(tweet.created_at))
    .append($('<ul>')
      .append(['flag', 'retweet', 'heart'].map(icon => `<li><i class="fa fa-${icon}" aria-hidden="true"></i></li>`))
    )

  );


  return $tweet;
}

function renderTweets(tweets){
  for(var i = 0; i < tweets.length; i++){
    var tweet = createTweetElement(tweets[i]);
    $('#tweets').append(tweet);
  }
//  $('#tweets').append(tweets.map(tweet => createTweetElement(tweet)));
}

function newTweetSubmission(){

  $('#new-tweet-submit').on('submit', function (submitEvent) {
    submitEvent.preventDefault();
    const errorMessage = $(this).find('p');
    const trimmedText = $(this).children('textarea').val();
    const count = $('.counter');
    console.log(count.text());
    if(!trimmedText) {
      errorMessage.text("Error, tweet must contain text");
      return;
    }
    if(count.text() < 0){
      errorMessage.text("Error, tweet exceeds 140 characters");
      return;
    }

    errorMessage.text('');
    $.ajax({
      method: 'POST',
      url: '/tweets/',
      data: $(this).serialize()
    }).done(function (results) {
      submitEvent.target.reset(results);
      renderTweets(results);
      count.text('140');
    });
  })
}

$(function () {

  function loadTweets(){
    $.ajax({
        url: 'tweets',
        method: 'GET',
        success: function (tweetData) {
          renderTweets(tweetData);
        }
      });
  }

  setupCounter();
  //renderTweets(data);
  newTweetSubmission();
  loadTweets();

});
