/**
 * Get projects and insert them in the menu
 */
module.exports.buildMenu = function(lurch, callback) {
  db.sites.find({}, function(error, sites) {
    for (var key in sites) {
      if (sites[key]._id == localStorage.currentSite) {
        lurch.current = sites[key];
      }

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
        checked: sites[key]._id == localStorage.currentSite
      }));
    }

    callback();
  });
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
module.exports.updatePlugins = function(update) {
  db.sites.update({ _id: projectEditId }, update);
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
  // Update localStorage
  localStorage.currentSite = project._id;
  // Update menu
  menu.items[0].label = "Current project: " + project.name;

  // Remove 'checked' from sites menu
  var items = sitesMenu.items;
  for (var key in items) {
    // Do not remove checked from clicked menu item
    if (key !== clicked) {
      sitesMenu.items[key].checked = false;
    }
  }
}

/**
 * Load current project
 */
module.exports.loadCurrent = function(callback) {
  var id = localStorage.currentSite;
  db.sites.find({ _id: id }, function(error, project) {
    callback(project);
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
