var ncp = require('ncp').ncp;
var rimraf = require('rimraf');

/**
 * Function to get plugins and pass them to the menu
 */
module.exports.buildMenu = function(newPlugin) {
  var currentId = localStorage.currentSite;
  db.sites.find({ _id: currentId }, function(err, project) {
    var projectEnabledPlugins = project[0].plugins;

  db.plugins.find({}, function(error, plugins) {

    // Add newly added plugin to plugins array.
    if (newPlugin) {
      plugins.push(newPlugin);
    }

    // Loop all plugins and build the plugins menu.
    for (var key in plugins) {
      var item = new gui.MenuItem({
        type: 'normal',
        label: plugins[key].name
      });

      item.on('click', function() {
        for (var id in pluginsMenu.items) {
          if (pluginsMenu.items[id] == this) {
            runPlugin(plugins[id].path);
          }
        }
      });

      if (projectEnabledPlugins.indexOf(plugins[key]._id) > -1) {
        pluginsMenu.append(item);
      }
    }
  });
  });
}

/**
 * Function for rebuild menu
 */
module.exports.rebuildMenu = function() {
  // Rebuild menu
  // Remove current items
  var max = pluginsMenu.items.length;
  if (max == 0) {
    module.exports.buildMenu();
  } else {
    for (var i = 0; i < max; i++) {
      pluginsMenu.removeAt(0);

      if ((i+1) == max) {
        // Build menu items again
        module.exports.buildMenu();
      }
    }
  }
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
var runPlugin = function(path) {
  var pluginInfo = require(path + '/package.json');
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
module.exports.remove = function(id, path, callback) {
  // Remove from data path
  rimraf(path, function(err) {
    if (!err) {

      // Remove from db
      db.plugins.remove({ _id: id }, function() {

        db.sites.find({ plugins: { $in: [id] }}, function(err, projects) {

          if (projects.length < 1) {
            callback();
          }

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
  });
}

/**
 * Add plugin
 */
module.exports.add = function(name, path, dest, callback) {
  db.plugins.insert({
    name: name,
    path: dest
  }, function(error, newDoc) {
    if (!error) {
      // Move plugin folder to data path
      ncp(path, dest, function(err) {
        if (!err) {
          callback(newDoc);
        }
      });
    }
  });
}
