// Check for updates
var update = require('./lib/update.js');

var manifest = require('./package.json');
if (manifest.manifestUrl) {
  update.checkNewVersion(function(newVersion, manifest) {
    if (newVersion) {
      $('body .frame').prepend('<div class="new-version"><h3>New version available</h3><p class="version">' + manifest.version + '</p><a href="#" class="download">Install update</a><a class="skip" href="#">Skip update</a></div>');
      $('.download').click(function(event) {
        event.preventDefault();
        update.install(manifest);
        $(this).html('<div class="loader"></div>');
        $(this).addClass('downloading');
        $('.new-version .skip').remove();
      });

      $('.skip').click(function(event) {
      	event.preventDefault();
      	$('.new-version').remove();
      });
    }
  });
}
