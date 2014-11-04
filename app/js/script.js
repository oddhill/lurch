(function() {

var gui = require('nw.gui');
var notification = require('osx-notifier');
var Datastore = require('nedb');
var exec = require('child_process').exec;
var nwWindow = gui.Window.get();

var menu = new gui.Menu();
var sitesMenu = new gui.Menu();
var pluginsMenu = new gui.Menu();
var tray = new gui.Tray({
  title: 'Lurch',
  menu: menu
});

// NEdb init
var db = {};

db.sites = new Datastore({
  filename: gui.App.dataPath + '/sites.db',
  autoload: true
});

db.plugins = new Datastore({
  filename: gui.App.dataPath + '/plugins.db',
  autoload: true
});

// Set global variables
global.menu = menu;
global.sitesMenu = sitesMenu;
global.pluginsMenu = pluginsMenu;
global.$ = $;
global.db = db;
global.gui = gui;
global.nwWindow = nwWindow;
global.notification = notification;

// Set other global variables
global.projectEditId = null;

// Menu functions
var lurchMenu = require('./lib/menu.js');

// Project functions
var projects = require('./lib/projects.js');

// Plugin functions
var plugins = require('./lib/plugins.js');

var lurch = {
  execute: exec,
  current: ''
};

// Load current
projects.loadCurrent(function(project) {
  if (project) {
    lurch.current = project;
  } else {
    lurch.current = { name: 'None selected' };
  }
});
global.lurch = lurch;

// Append sites to menu
projects.buildMenu(function() {

  // Insert menu items to main menu
  lurchMenu.populate();

  // Get plugins and insert them into pluginsMenu
  plugins.buildMenu();

});

})();