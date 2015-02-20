lurchApp.factory('Project', function($q) {

  // Load Plugin helper class
  var Project = require('./lib/Project/Project.js');

  // Function to get plugins
  var get = function (id) {
    var deferred = $q.defer();

    if (!id) {
      // Get all plugins
      Project.findAll(function(err, projects) {
        deferred.resolve(projects);
      });
    }
    else {
      // Get one plugin
      Project.findById(id, function(err, project) {
        deferred.resolve(project);
      });
    }

    return deferred.promise;
  };

  return {
    get: get
  };
});
