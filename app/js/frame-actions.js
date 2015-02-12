var FrameActions = (function() {

  var close = function() {
    var $close = $('.frame button.close');

    $close.on('click', function() {
      global.nwWindow.close();
    });
  };

  var minimize = function() {
    var $minimize = $('.frame button.minimize');

    $minimize.on('click', function() {
      global.nwWindow.minimize();
    });
  };

  return {
    close: close,
    minimize: minimize
  };

})();
