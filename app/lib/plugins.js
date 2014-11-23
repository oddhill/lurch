var ncp = require('ncp').ncp;
var rimraf = require('rimraf');
var fs = require('fs');

/**
 * Get most used plugins and pass them to the menu
 */
module.exports.buildMostUsedMenu = function() {

  // Add separator
  menu.insert(new gui.MenuItem({
    type: 'separator'
  }), 0);

  db.sites.findOne({ current: true }, function(err, docs) {
    if (docs) {
      docs.plugins.sort(function(a, b) {
        if (a.used < b.used)
          return 1;
        if (a.used > b.used)
          return -1;
        return 0;
      });

      var mostUsed = null;
      mostUsed = docs.plugins.slice(0, 3).reverse();

      for (var key in mostUsed) {

        if (parseInt(key) > 2) {
          break;
        }

        db.plugins.findOne({ _id: mostUsed[key].id }, function(error, plugin) {
          menu.insert(new gui.MenuItem({
            type: 'normal',
            label: plugin.name,
            click: function() {
              runPlugin(plugin.path);
            }
          }), 0);

        });
      }
    }
  });
}

/**
 * Function to get plugins and pass them to the menu
 */
module.exports.buildMenu = function(newPlugin) {
  db.sites.find({ current: true }, function(err, project) {
    var projectEnabledPlugins = [];
    if (project.length !== 0) {
      for (var key in project[0].plugins) {
        projectEnabledPlugins.push(project[0].plugins[key].id);
      }
    }

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

      if (projectEnabledPlugins !== null && projectEnabledPlugins.indexOf(plugins[key]._id) > -1) {
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
  // Alter clicked number
  var pluginId = null;
  var usedUpdate = null;
  db.plugins.find({ path: path }, function(error, plugin) {
    pluginId = plugin[0]._id;
    db.sites.findOne({ current: true }, function(error, plugin2) {
      usedUpdate = plugin2.plugins;
      for (var key in plugin2.plugins) {
        if (plugin2.plugins[key].id == pluginId) {
          usedUpdate[key].used++;
          break;
        }
      }
      db.sites.update({ current: true }, { $set: { plugins: usedUpdate } }, {});
    });
  });

  // Run plugin
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
        db.sites.update({}, { $pull: { plugins: { id: id } } }, { multi: true });
        callback();
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
      // Create plugins folder if it does not exist
      var pluginsFolder = gui.App.dataPath + '/plugins';
      fs.exists(pluginsFolder, function(exists) {
        if (!exists) {
          //Create plugins folder
          fs.mkdirSync(pluginsFolder);
        }

        // Move plugin folder to data path
        ncp(path, dest, function(err) {
          if (!err) {
            callback(newDoc);
          }
        });
      });
    }
  });
}
