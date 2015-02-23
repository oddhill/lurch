// Check for updates
var update = require('./lib/update.js');

var manifest = require('./package.json');
if (manifest.manifestUrl) {
  update.checkNewVersion(function(newVersion, manifest) {
    if (newVersion) {
      $('body').prepend('<a href="#" class="install-new">Download & install update</a>');
      $('.install-new').click(function(event) {
        event.preventDefault();
        update.install(manifest);
      });
    }
  });
}
