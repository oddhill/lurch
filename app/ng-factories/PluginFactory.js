lurchApp.factory('Plugin', function($q) {

  // Load Plugin helper class
  var Plugin = require('./lib/Plugin/Plugin.js');

  // Function to get plugins
  var get = function() {
    var deferred = $q.defer();

    // Get all plugins
    Plugin.findAll(function(err, plugins) {
      deferred.resolve(plugins);
    });

    return deferred.promise;
  };

  // Remove a plugin
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

  return {
    get: get,
    remove: remove
  };

});
