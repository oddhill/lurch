var Project = require('../../Project/Project.js');
var Plugin = require('../../Plugin/Plugin.js');

/**
 * Get most used plugins and pass them to the menu
 */
module.exports.buildMostUsedMenu = function(menu) {

  // Add separator
  menu.insert(new gui.MenuItem({
    type: 'separator'
  }), 0);

  Project.findCurrent(function(err, docs) {
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

        Plugin.findById(mostUsed[key].id, function(error, plugin) {
          var menuItem = new gui.MenuItem({
            type: 'normal',
            label: plugin.name,
            click: function() {
              plugin.run();
            }
          });

          plugin.hasMenu(function(status) {
            if (status) {
              plugin.getMenu(function(pluginMenu) {
                menuItem.submenu = pluginMenu;
              });
            }
          });

          menu.insert(menuItem, 0);
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
          for (var id in subMenus.plugins.items) {
            if (subMenus.plugins.items[id] == this) {
              Plugin.findById(plugins[id]._id, function(err, plugin) {
                if (!err) {
                  plugin.run();
                }
              });
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
module.exports.rebuild = function(subMenus) {
  // Rebuild menu
  // Remove current items
  var max = subMenus.plugins.items.length;
  if (max == 0) {
    module.exports.build(subMenus);
  } else {
    for (var i = 0; i < max; i++) {
      subMenus.plugins.removeAt(0);

      if ((i+1) == max) {
        // Build menu items again
        module.exports.build(subMenus);
      }
    }
  }
}
