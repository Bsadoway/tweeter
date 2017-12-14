$( document ).ready( function(){

  $( ".new-tweet form textarea").keyup(function() {
    var length = $(this).val().length;
    var counter = $(this).parent().find('.counter');
    if (length > 140){
      counter.css({color: '#ff0000'});
      counter.text(140 - length);
    } else {
      counter.css({color: '#000'});
      counter.text(140 - length);
    }

  });
});

function setupCounter() {
  $( ".new-tweet form textarea").keyup(function() {
    var length = $(this).val().length;
    var counter = $(this).parent().find('.counter');
    if (length > 140){
      counter.css({color: '#ff0000'});
      counter.text(140 - length);
    } else {
      counter.css({color: '#000'});
      counter.text(140 - length);
    }

  });
}
