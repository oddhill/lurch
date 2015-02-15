lurchApp.factory('Project', function($q) {

  // Load Plugin helper class
  var Project = require('./lib/Project/Project.js');

  // Function to get plugins
  var get = function() {
    var deferred = $q.defer();

    // Get all plugins
    Project.findAll(function(err, projects) {
      deferred.resolve(projects);
    });

    return deferred.promise;
  };

  return {
    get: get
  };
});
