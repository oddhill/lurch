/**
 * Get projects and insert them in the menu
 */
module.exports.getProjects = function(lurch, callback) {
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
