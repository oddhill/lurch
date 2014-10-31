var walk = require('walkdir');

/**
 * Function to get plugins and pass them to the menu
 */
module.exports.buildMenu = function(newPlugin) {
  db.plugins.find({}, function(error, plugins) {

    // Add newly added plugin to plugins array.
    if (newPlugin) {
      plugins.push(newPlugin);
    }

    // Loop att plugins and build plugins menu.
    for (var key in plugins) {
      var pluginInfo = require(plugins[key].path + '/package.json');
      pluginsMenu.append(new gui.MenuItem({
        type: 'normal',
        label: pluginInfo.name,
        click: function() {
          runPlugin(plugins[key].path, pluginInfo);
        }
      }));
    }
  });
}

/**
 * Get plugins
 */
module.exports.getPlugins = function(callback) {
  db.plugins.find({}, function(error, plugins) {
    callback(plugins);
  });
}

/**
 * Function for running a plugin
 */
var runPlugin = function(path, pluginInfo) {
  var plugin = require(path + '/' + pluginInfo.main);
  plugin.run(lurch, function(response) {
    notification({
      type: response.success ? 'pass' : 'fail',
      title: pluginInfo.name,
      message: response.message,
      group: 'Lurch'
    });
  });
}

// Export the function
module.exports.runPlugin = runPlugin;
