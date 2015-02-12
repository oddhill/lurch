var Settings = (function() {

  // Save callback url on blur
  var save = function() {
    $('.main-content.settings .callback').on('blur', function() {
      localStorage.pluginCallback = $(this).val();
    });
  };

  return {
    save: save
  };

})();
