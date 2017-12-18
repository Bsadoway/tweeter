$(function() {

  $('body').on('click', '.likes-button', function(clickEvent) {
    const likes = $(this).closest('article').find('.like-counter');
    const tweetId = $(this).closest('article').data('id');
    $(this).toggleClass('fa-heart-o fa-heart');

    //immediately increment the display like #
    let value = parseInt(likes.text(), 10);
    $(this).hasClass('fa-heart') ? value++ : value--;

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
