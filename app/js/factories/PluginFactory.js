lurchApp.factory('Plugin', function($q) {

  // Load Plugin helper class
  var Plugin = require('./lib/Plugin/Plugin.js');

  /**
   * Function to get plugins
   */
  var get = function() {
    var deferred = $q.defer();

    // Get all plugins
    Plugin.findAll(function(err, plugins) {
      deferred.resolve(plugins);
    });

    return deferred.promise;
  };

  /**
   * Remove a plugin
   */
  var remove = function (id) {
    var deferred = $q.defer();

    Plugin.findById(id, function(err, plugin) {
      plugin.remove(function(err) {
        if (!err) {
          deferred.resolve();
        }
      });
    });

    return deferred.promise;
  };

  /**
   * Add a plugin
   */
  var add = function(pluginPath) {
    var deferred = $q.defer();

    // Status var
    var success = false;

    // Create a new plugin object
    var newPlugin = new Plugin(null, pluginPath);
    // Get the plugins manifest name
    newPlugin.manifestName(function(name, err) {
      if (!err) {
        // Set the plugins name
        newPlugin.setName(name);
        // Move plugin folder to data path
        newPlugin.moveToDataPath(function(err) {
          if (!err) {
            // If there is no error, well. Save it to db!
            newPlugin.save(function(err, result, savedPlugin) {
              success = true;
              deferred.resolve({success: success, plugin: savedPlugin});
            });
          } else {
            deferred.resolve({success: success});
          }
        });
      }
      else {
        deferred.resolve({success: success});
      }
    });

    return deferred.promise;
  };

  return {
    get: get,
    remove: remove,
    add: add
  };

});
