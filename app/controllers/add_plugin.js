var Plugin = require('./lib/Plugin/Plugin.js');

var pluginPath = null;

// Drag n drop
var holder = document.getElementById('plugin-dragdrop');
dragndrop(holder, function(path) {
  if (path) {
    pluginPath = path;
    $('#add-plugin').submit();
  }
});

$('#add-plugin .path').change(function() {
  pluginPath = $(this).find('input[name="path"]').val();
  $('#add-plugin').submit();
});

$('#plugin-dragdrop a').on('click', function(e) {
  e.preventDefault();
  $('#add-plugin input[name="path"]').click();
});

$('#add-plugin').submit(function(event) {
  event.preventDefault();

  // Create a new plugin object
  var newPlugin = new Plugin(null, pluginPath);
  // Get the plugins manifest name
  newPlugin.manifestName(function(name) {
    // Set the plugins name
    newPlugin.setName(name);
    // Move plugin folder to data path
    newPlugin.moveToDataPath(function(err) {
      if (!err) {
        // If there is no error, well. Save it to db!
        newPlugin.save(function(err, result) {
          // Rebuild menu and load plugins view
          nwMenu.rebuild();
          $('#app').load('views/manage_plugins.html');
        });
      }
    });
  });
});
