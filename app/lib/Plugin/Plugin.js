var fs = require('fs');
var ncp = require('ncp');
var rimraf = require('rimraf');

function Plugin(name, path, id) {
  this.name = name;
  this.path = path;
  this.id = id;
}

Plugin.prototype.setPath = function(path) {
  this.path = path;
};

Plugin.prototype.getPath = function(callback) {
  callback(this.path);
};

Plugin.prototype.setName = function(name) {
  this.name = name;
};

Plugin.prototype.getName = function(callback) {
  callback(this.name);
};

Plugin.prototype.manifestName = function(callback) {
  var manifestPath = this.path + '/package.json';

  var err = false;
  fs.exists(manifestPath, function(exists) {
    if (!exists) {
      err = true;
      callback('', err);
    }
    else {
      var manifest = require(manifestPath);
      if (!manifest.name) {
        err = true;
      }

      callback(manifest.name, err);
    }
  });
};

Plugin.findById = function(id, callback) {
  db.plugins.findOne({ _id: id }, function(err, doc) {
    if (err) return callback(err);
    callback(null, new Plugin(doc.name, doc.path, doc._id));
  });
};

Plugin.findAll = function(callback) {
  db.plugins.find({}, {}, function(err, docs) {
    if (err) return callback(err);
    callback(null, docs);
  });
};

Plugin.prototype.save = function(callback) {
  db.plugins.update({ _id: this.id }, { name: this.name, path: this.path }, { upsert: true }, function(err, result) {
    if (err) return callback(err);
    callback(null, result);
  });
};

Plugin.prototype.remove = function(callback) {
  var self = this;

  db.plugins.remove({ _id: self.id }, function(err) {
    if (err) return callback(err);
    // Remove plugin from projects
    db.projects.update({}, { $pull: { plugins: { id: self.id } } }, { multi: true }, function(err) {
      if (err) return callback(err);
      // Remove plugin folder from data path
      _removeFiles(self.path, function(err) {
        callback(err);
      });
    });
  });
};

Plugin.prototype.moveToDataPath = function(callback) {
  var self = this;

  // Create plugins folder if it does not exist
  var pluginsFolder = gui.App.dataPath + '/plugins';
  fs.exists(pluginsFolder, function(exists) {
    if (!exists) {
      //Create plugins folder
      fs.mkdirSync(pluginsFolder);
    }

    var folderName = self.path.match(/([^\/]*)\/*$/)[1];
    var dest = pluginsFolder + '/' + folderName;

    // Move plugin folder to data path
    ncp(self.path, dest, function(err) {
      if (err) return callback(err);

      // Update to new path
      self.setPath(dest);

      callback(null);
    });
  });
};

var _removeFiles = function(path, callback) {
  rimraf(path, function(err) {
    callback(err);
  });
};

/**
 * Function for running a plugin.
 */
Plugin.prototype.run = function() {
  var path = this.path;

  // Alter clicked number
  var pluginId = null;
  var usedUpdate = null;
  db.plugins.find({ path: path }, function(error, plugin) {
    pluginId = plugin[0]._id;
    db.projects.findOne({ current: true }, function(error, plugin2) {
      usedUpdate = plugin2.plugins;
      for (var key in plugin2.plugins) {
        if (plugin2.plugins[key].id == pluginId) {
          usedUpdate[key].used++;
          break;
        }
      }
      db.projects.update({ current: true }, { $set: { plugins: usedUpdate } }, {});
    });
  });

  // Run plugin
  var pluginInfo = require(path + '/package.json');
  var plugin = require(path + '/' + pluginInfo.main);
  plugin.run(lurch, function(response) {
    // Notify the user of response status
    notification({
      type: response.success ? 'pass' : 'fail',
      title: pluginInfo.name,
      message: response.message,
      group: 'Lurch'
    });

    // Send request to callback URL
    var callbackURL = localStorage.pluginCallback;
    if (callbackURL != null) {
      if (callbackURL.length > 0) {
        request.post(callbackURL, response.success);
      }
    }
  });
}

module.exports = Plugin;
