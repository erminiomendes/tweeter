$(document).ready(function() {
  // --- our code goes here ---
    let max_length = 140;
    $('#tweet-text').keyup(function () {
      let len = max_length - $(this).val().length;
      if (len < 0) {
        $('.counter').text(len).css("color","red");
      } else {
      $('.counter').text(len).css("color","#545149");;
      }
  });

});