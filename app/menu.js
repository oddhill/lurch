module.exports.init = function(menu, sitesMenu, pluginsMenu, gui, window, currentSiteName, $) {
  // Current site in menu
  menu.append(new gui.MenuItem({
    type: 'normal',
    label: 'Current site: ' + currentSiteName,
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
    label: 'Manage sites',
    click: function() {
      window.show();
      $('#app').load('manage_sites.html');
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