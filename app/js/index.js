(function() {

  //require('nw.gui').Window.get().showDevTools().resizeTo(800, 1000);

  $(document).ready(function() {

    // Settings click event
    $('.footer .settings').on('click', function(e) {
      e.preventDefault();

      var close = false;

      // Show settings
      $('.main-content.main').addClass('minimize');

      // Close handler
      $('.main-content.main.minimize').on('click', function(e) {
        e.preventDefault();
        if (close) {
          $(this).removeClass('minimize');
          $(this).off(e);
        }
        close = true;
      });
    });

    // Load rest token to settings page
    $('.main-content.settings .key').html(localStorage.restToken);

    // Settings saving handler
    Settings.save();

    // Frame actions handlers
    FrameActions.close();
    FrameActions.minimize();

  });
})();
