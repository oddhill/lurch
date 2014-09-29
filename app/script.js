(function() {

var gui = require('nw.gui');
var walk = require('walkdir');
var notification = require('osx-notifier');
var Datastore = require('nedb');
var exec = require('child_process').exec;
var window = gui.Window.get();
var lurch = {
  execute: exec,
  current: ''
};

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
  filename : gui.App.dataPath + '/sites.db',
  autoload: true
});

db.settings = new Datastore({
  filename : gui.App.dataPath + '/settings.db',
  autoload: true
});

// Menu
var lurchMenu = require('./menu.js');

// Projects
var projects = require('./projects.js');

// Append sites to menu
projects.getProjects(menu, sitesMenu, db, localStorage, lurch, gui, function() {

  lurchMenu.init(menu, sitesMenu, pluginsMenu, gui, window, lurch.currentSite.name, jQuery);

  var findPlugins = walk(gui.App.dataPath + '/Plugins', {no_recurse: true}).on('directory', function(path, stat) {
    var pluginInfo = require(path + '/package.json');

    pluginsMenu.append(new gui.MenuItem({
      type: 'normal',
      label: pluginInfo.name,
      click: function() {
        var plugin = require(path + '/' + pluginInfo.main);
        plugin.run(lurch, function(response) {
          notification({
            type: response.success ? 'pass' : 'fail',
            title: pluginInfo.name,
            message: response.message,
            group: 'Lurch'
          });
        });
      }
    }));
  });
});

})();
