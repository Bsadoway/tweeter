$(function() {

  $(".new-tweet form textarea").keyup(function() {
    const length = $(this).val().length;
    const counter = $(this).parent().find('.counter');
    counter.text(140 - length);

    if (length > 140) {
      counter.addClass('error-text-counter');
    } else {
      counter.removeClass('error-text-counter');
    }
  });

});
