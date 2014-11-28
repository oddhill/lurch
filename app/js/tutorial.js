$('document').ready(function() {

  $('#tutorial').load('tutorial.html', function() {

    $('#tutorial-slide').owlCarousel({
      mouseDrag: false,
      touchDrag: false
    });

    var slider = $("#tutorial-slide").data('owlCarousel');

    // Move to next
    $('.step .next').click(function() {
      if ($(this).hasClass('last')) {
        $('.lurch-success').addClass('on');
      }
      slider.next();
    });

    // Skip tutorial
    $('.step .skip').click(function() {
      $('#app').load('views/manage_projects.html');
      $('#tutorial').remove();
    });

    // Finish (close tutorial)
    $('.step .finish').click(function() {
      $('#app').load('views/manage_projects.html');
      $('#tutorial').remove();
    });

  });

});
