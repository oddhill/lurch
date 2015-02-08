var Plugin = require('./lib/Plugin/Plugin.js');

Plugin.findAll(function(err, plugins) {
  if (!err) {
    for (var key in plugins) {
      $('#plugins').append('<li>' + plugins[key].name + '<span class="id">' + plugins[key]._id + '</span>' + '<a class="remove" href="#" data-id="' + plugins[key]._id + '"></a></li>');
    }

    // Remove plugin
    $('a.remove').click(function(event) {
      event.preventDefault();
      var $button = $(this);
      var id = $(this).attr('data-id');

      Plugin.findById(id, function(err, plugin) {
        plugin.remove(function(err) {
          if (!err) {
            // Rebuild menu and reload plugins view
            nwMenu.rebuild();

            // Remove from list
            $('#app').load('views/manage_plugins.html');
          }
        });
      });
    });
  }
});
