/**
 * Function to populate the menu
 */
module.exports.populate = function() {
  // Current site in menu
  menu.append(new gui.MenuItem({
    type: 'normal',
    label: 'Current site: ' + lurch.current.name,
    enabled: false
  }));

  // Separator
  menu.append(new gui.MenuItem({
    type: 'separator'
  }));

  // Sites sub-menu
  menu.append(new gui.MenuItem({
    type: 'normal',
    label: 'Change site',
    submenu: sitesMenu
  }));

  // Plugins sub-menu
  menu.append(new gui.MenuItem({
    type: 'normal',
    label: 'Run plugin',
    submenu: pluginsMenu
  }));

  // Manage sites
  menu.append(new gui.MenuItem({
    type: 'normal',
    label: 'Manage projects',
    click: function() {
      nwWindow.show();
      $('#app').load('views/manage_projects.html');
    }
  }));

  // Separator
  menu.append(new gui.MenuItem({
    type: 'separator'
  }));

  // Quit menu item
  menu.append(new gui.MenuItem({
    type: 'normal',
    label: 'Quit',
    click: function() {
      gui.App.quit();
    }
  }));
}

/**
 * Destory menu
 */
module.exports.destroy = function(callback) {
  // Destory
  var length = menu.items.length;
  for (var i = 0; i < length; i++) {
    menu.removeAt(0);

    if (i == (length-1)) {
      callback();
    }
  }
}
