$('document').ready(function() {

  if (localStorage.tutorial != 'false') {

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
        localStorage.tutorial = 'false';
        $('#app').load('views/manage_projects.html');
        $('#tutorial').remove();
      });

      // Finish (close tutorial)
      $('.step .finish').click(function() {
        localStorage.tutorial = 'false';
        $('#app').load('views/manage_projects.html');
        $('#tutorial').remove();
      });

      // Drag and drop
      var projectHolder = document.getElementById('tutorial-drag-drop-project');
      var pluginHolder = document.getElementById('tutorial-drag-drop-plugin');
      dragndrop(projectHolder);
      dragndrop(pluginHolder);

    });

  } else {
    // Load the app
    $('#app').load('views/manage_projects.html');
    $('#tutorial').remove();
  }

});
