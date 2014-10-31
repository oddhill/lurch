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

    // Loop all plugins and build the plugins menu.
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
 * Get plugins.
 */
module.exports.getPlugins = function(callback) {
  db.plugins.find({}, function(error, plugins) {
    callback(plugins);
  });
}

/**
 * Function for running a plugin.
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

/**
 * Remove plugin
 */
module.exports.remove = function(id, callback) {
  db.plugins.remove({ _id: id }, function() {

    db.sites.find({ plugins: { $in: [id] }}, function(err, projects) {

      for (var key in projects) {

        var projectPlugins = projects[key].plugins;

        for (var pluginKey in projectPlugins) {

          if (projectPlugins[pluginKey] == id) {
            var popKey = parseInt(pluginKey);
            popKey++;
            db.sites.update({ _id: projects[key]._id }, { $pop: { plugins: popKey } }, {}, function(err) {
              callback();
            });

          }

        }

      }

    });

  });
}

/**
 * Add plugin
 */
module.exports.add = function(name, dest, callback) {
  db.plugins.insert({
    name: name,
    path: dest
  }, function(error, newDoc) {
    if (!error) {
      callback(newDoc);
    }
  });
}
