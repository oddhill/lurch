var plugins = require('./plugins.js');
var mainMenu = require('./menu.js');

/**
 * Get projects and insert them in the menu
 */
module.exports.buildMenu = function(callback) {
  // Get current
  var current_id = null;
  db.sites.find({ current: true }, function(error, project) {
    if (project.length > 0) {
      current_id = project[0]._id;
    }
  });

  db.sites.find({}, function(error, sites) {
    for (var key in sites) {
      sitesMenu.append(new gui.MenuItem({
        type: 'checkbox',
        label: sites[key].name,
        click: function() {
          for (var key2 in sites) {
            if (sites[key2].name == this.label) {
              changeCurrent(lurch, sites[key2], key2);
              break;
            }
          }
        },
        checked: sites[key]._id == current_id
      }));
    }

    callback();
  });
}

/**
 * Rebuild menu
 */
module.exports.rebuildMenu = function() {
  // Rebuild menu
  // Remove current items
  var max = sitesMenu.items.length;
  if (max == 0) {
    module.exports.buildMenu(function(){});
  } else {
    for (var i = 0; i < max; i++) {
      sitesMenu.removeAt(0);

      if ((i+1) == max) {
        // Build menu items again
        module.exports.buildMenu(function(){});
      }
    }
  }
}

/**
 * Get projects
 */
module.exports.getProjects = function(callback) {
  db.sites.find({}, function(error, projects) {
    callback(projects);
  });
}

/**
 * Get project
 */
module.exports.get = function(id, callback) {
  db.sites.find({ _id:id }, function(error, project) {
    callback(project);
  });
}

/**
 * Update project enabled plugins
 */
module.exports.updatePlugins = function(id, update, callback) {
  db.sites.update({ _id: id }, update, function(err) {
    callback();
  });
}

/**
 * Update a project
 */
module.exports.update = function(id, query, callback) {
  db.sites.update({ _id: id }, query, function() {
    callback();
  });
}

/**
 * Remove project
 */
module.exports.remove = function(id, callback) {
  db.sites.remove({ _id: id }, function() {
    callback();
  });
}

/**
 * Change current project
 */
var changeCurrent = function(lurch, project, clicked) {
  // Update lurch API
  lurch.current = project;
  // Update current in db
  db.sites.update({}, { $set: { current: false } }, {});
  db.sites.update({ _id: project._id }, { $set: { current: true } }, {});

  // Remove 'checked' from sites menu
  var items = sitesMenu.items;
  for (var key in items) {
    // Do not remove checked from clicked menu item
    if (key !== clicked) {
      sitesMenu.items[key].checked = false;
    }
  }

  // Rebuild menu
  mainMenu.destroy(function() {
    mainMenu.populate();
    plugins.buildMostUsedMenu();
    plugins.rebuildMenu();
    module.exports.rebuildMenu();
  });
}

module.exports.changeCurrent = changeCurrent;

/**
 * Load current project
 */
module.exports.loadCurrent = function(callback) {
  db.sites.find({ current: true }, function(error, project) {
    callback(project[0]);
  });
}

/**
 * Add new project
 */
module.exports.add = function(data, callback) {
  db.sites.insert(data, function() {
    callback();
  });
}
