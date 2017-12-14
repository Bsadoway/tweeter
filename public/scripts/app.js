/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(function() {
  function createTweetElement(tweet) {
    var $tweet = $('<article>').addClass('tweet');
    $tweet.append($('<header>')
      .append($('<img>').attr('src', tweet.user.avatars.small))
      .append($('<h3>').text(tweet.user.name))
      .append($('<span>').text(tweet.user.handle))
    );
    $tweet.append($('<div>')
      .append($('<p>').text(tweet.content.text)));
    $tweet.append($('<footer>')
      .append($('<p>').text(moment(tweet.created_at).startOf('hour').fromNow()))
      .append($('<ul>')
        .append(['flag', 'retweet', 'heart'].map(icon => `<li><i class="fa fa-${icon}" aria-hidden="true"></i></li>`))
      )

    );
    return $tweet;
  }

  function renderTweets(tweets) {
    $('#tweets').empty().append(tweets.map(tweet => createTweetElement(tweet)));
  }


  $('#new-tweet-submit').on('submit', function(submitEvent) {
    submitEvent.preventDefault();
    const errorMessage = $(this).find('p');
    const trimmedText = $(this).children('textarea').val();
    const count = $('.counter');

    if (!trimmedText) {
      errorMessage.text("Error, tweet must contain text");
      return;
    }
    if (count.text() < 0) {
      errorMessage.text("Error, tweet exceeds 140 characters");
      return;
    }


    $.ajax({
      method: 'POST',
      url: '/tweets/',
      data: $(this).serialize()
    }).done(function(results) {
      submitEvent.target.reset(results);
      count.text('140');
      errorMessage.text('');
      loadTweets();
    });
  });


  function loadTweets() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'JSON',
      success: function(tweetData) {
        renderTweets(tweetData.reverse());
      }
    });
  }

  $('#compose-button').on('click', function(){
    $('.new-tweet').slideToggle("slow", function(){
      $('.new-tweet textarea').focus();
    })
  });

  //setupCounter();
  //renderTweets(data);
  loadTweets();

});
