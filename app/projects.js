// Get sites and insert in menu
module.exports.getProjects = function(menu, sitesMenu, db, localStorage, lurch, gui, callback) {
  db.sites.find({}, function(error, sites) {
    for (var key in sites) {
      if (sites[key]._id == localStorage.currentSite) {
        lurch.currentSite = sites[key];
      }

      sitesMenu.append(new gui.MenuItem({
        type: 'checkbox',
        label: sites[key].name,
        click: function() {
          for (var key2 in sites) {
            if (sites[key2].name == this.label) {
              //lurch.current = sites[key2];
              //localStorage.currentSite = sites[key2]._id;
              module.exports.changeCurrent(menu, lurch, localStorage, sites[key2], sites[key2]._id);
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

// Change current project
module.exports.changeCurrent = function(menu, lurch, localStorage, project, projectId) {
  lurch.current = project;
  localStorage.currentSite = projectId;
  menu.items[0].label = "Current project: " + project.name;
}
