/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// render each tweet in HTML format
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
      .append($('<p>').text(moment.unix(tweet.created_at/1000).fromNow()))
      .append($('<ul>')
        .append($('<li>').append($('<i>').addClass('fa fa-flag').attr('aria', 'true')))
        .append($('<li>').append($('<i>').addClass('fa fa-retweet').attr('aria', 'true')))
        .append($('<li>').append($('<i>').addClass('fa fa-heart-o likes-button').attr('aria', 'true')))
      )
      .append($('<div>').addClass('like-counter').text(`${tweet.likes} likes`))
    );
    $tweet.data('id', tweet._id);
    return $tweet;
  }

  // sends all tweets to the correct html container
  function renderTweets(tweets) {
    $('#tweets').empty().append(tweets.map(tweet => createTweetElement(tweet)));
  }

  // validates the text for no input or exceeding the max characters
  function validateText(text, count) {
    if (!text) { return false; }
    if (count < 0) { return false; }
    return true;
  }

  $('#new-tweet-submit').on('submit', function(submitEvent) {
    submitEvent.preventDefault();
    const errorMessage = $(this).find('p');
    const trimmedText = $(this).children('textarea').val().trim();
    let count = $('.counter').text();

    if(!validateText(trimmedText, count)){
      errorMessage.text("Error, tweet must contain text and must not exceed 140 characters");
      return;
    }

    //send ajax call to backend to add tweet to the database
    $.ajax({
      method: 'POST',
      url: '/tweets/',
      data: $(this).serialize()
    }).done(function(results) {
      // reset the form and load all tweets
      submitEvent.target.reset(results);
      $('.counter').text('140');
      errorMessage.text('');
      loadTweets();
    });
  });

  // load tweets from database from ajax call in reverse order
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

  // toggles the new tweet form visiblity
  $('#compose-button').on('click', function() {
    $('.new-tweet').slideToggle("slow", function() {
      $('.new-tweet textarea').focus();
    });
  });

  // load tweets on initial load
  loadTweets();

});
