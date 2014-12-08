var Project = require('../../Project/Project.js');
var Plugin = require('../../Plugin/Plugin.js');

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
module.exports.build = function(subMenus) {
  Project.findCurrent(function(err, project) {
    var projectEnabledPlugins = [];
    if (!err && project) {
      for (var key in project.plugins) {
        projectEnabledPlugins.push(project.plugins[key].id);
      }
    }

    Plugin.findAll(function(err, plugins) {

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
          subMenus.plugins.append(item);
        }
      }
    });
  });
}

/**
 * Function for rebuild menu
 */
module.exports.rebuild = function() {
  // Rebuild menu
  // Remove current items
  var max = pluginsMenu.items.length;
  if (max == 0) {
    module.exports.build();
  } else {
    for (var i = 0; i < max; i++) {
      pluginsMenu.removeAt(0);

      if ((i+1) == max) {
        // Build menu items again
        module.exports.build();
      }
    }
  }
}
