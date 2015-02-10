(function() {

  // Save callback url
  $('.main-content.settings .callback').on('blur', function() {
    localStorage.pluginCallback = $(this).val();
  });

})();
