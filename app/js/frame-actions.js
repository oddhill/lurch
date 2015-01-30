(function() {
  $(document).ready(function() {

    var $close = $('.frame button.close');
    var $minimize = $('.frame button.minimize');

    $close.on('click', function() {
      global.nwWindow.close();
    });

    $minimize.on('click', function() {
      global.nwWindow.minimize();
    });

  });
})();
