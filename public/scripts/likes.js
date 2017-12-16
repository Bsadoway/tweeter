$(function() {

  $('body').on('click', '.likes-button', function(clickEvent) {
    let likes = $(this).closest('article').find('.like-counter');
    const tweetId = $(this).closest('article').data('id');
    //immediately increment the display like #
    $(this).toggleClass('fa-heart-o fa-heart');

    let value = 0;
    if ($(this).hasClass('fa-heart')) {
      value = parseInt(likes.text(), 10) + 1;
    } else {
      value = parseInt(likes.text(), 10) - 1;
    }

    let likesText = value === 1 ? " like" : " likes";
    likes.text(value + likesText);

    //dispatch an ajax request to the backend
    $.ajax({
      method: 'POST',
      url: `/tweets/${tweetId}/liked`,
      data: {
        likes: value
      }
    });
  });
});
