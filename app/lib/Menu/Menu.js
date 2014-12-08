var projectsMenu = require('./inc/projects.js');
var pluginsMenu = require('./inc/plugins.js');

function Menu() {
  this.menu = new gui.Menu();
  this.subMenus = {};
  this.subMenus.projects = new gui.Menu();
  this.subMenus.plugins = new gui.Menu();
}

// Menu init
Menu.prototype.addToTray = function() {
  var menu = this.menu;

  // Add to tray
  var tray = new gui.Tray({
    icon: 'graphics/menu-icon@2x.png',
    menu: menu
  });

  // Add window menus
  var mb = new gui.Menu({type:'menubar'});
  mb.createMacBuiltin('Lurch');
  gui.Window.get().menu = mb;
};

/**
 * Function to populate the menu
 */
Menu.prototype.populate = function() {
  var menu = this.menu;
  var subMenus = this.subMenus;

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

  // Projects sub-menu
  menu.append(new gui.MenuItem({
    type: 'normal',
    label: 'Change site',
    submenu: subMenus.projects
  }));

  // Plugins sub-menu
  menu.append(new gui.MenuItem({
    type: 'normal',
    label: 'Run plugin',
    submenu: subMenus.plugins
  }));

  // Manage sites
  menu.append(new gui.MenuItem({
    type: 'normal',
    label: 'Manage projects',
    click: function() {
      nwWindow.setShowInTaskbar(true);
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

  // Populate projects menu
  projectsMenu.build(subMenus, function() {});

  // Populate plugins menu
  pluginsMenu.build(subMenus, function() {});
}

/**
 * Destroy menu
 */
module.exports.destroy = function(callback) {
  // Destroy
  var length = menu.items.length;
  for (var i = 0; i < length; i++) {
    menu.removeAt(0);

    if (i == (length-1)) {
      callback();
    }
  }
}

module.exports = Menu;
