lurchApp.factory('Project', function($q) {

  // Load Plugin helper class
  var Project = require('./lib/Project/Project.js');

  // Function to get projects
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

  // Add a new project
  var add = function (project) {
    var deferred = $q.defer();

    var newProject = new Project(project.name, project.path, [], false, null, project.db, project.remote);
    newProject.save(function(err) {
      if (!err) {
        deferred.resolve();
      }
    });

    return deferred.promise;
  };

  return {
    get: get,
    add: add
  };
});
