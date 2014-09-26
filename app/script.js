(function() {

var gui = require('nw.gui');
var walk = require('walkdir');
var notification = require('osx-notifier');
var exec = require('child_process').exec;
var window = gui.Window.get();
var lurch = {
  execute: exec
};

var menu = new gui.Menu();
menu.append(new gui.MenuItem({
  type: 'normal',
  label: 'Manage sites',
  click: function() {
    window.show();
    $('#app').load('manage_sites.html');
  }
}));


var findPlugins = walk(gui.App.dataPath + '/Plugins', {no_recurse: true});

findPlugins.on('directory', function(path, stat) {
  var pluginInfo = require(path + '/package.json');

  menu.append(new gui.MenuItem({
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

var tray = new gui.Tray({
  title: 'Lurch',
  menu: menu
});

})();
