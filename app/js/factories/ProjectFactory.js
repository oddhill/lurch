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
        nwMenu.rebuild();
        deferred.resolve();
      }
    });

    return deferred.promise;
  };

  // Update project plugins
  var updatePlugins = function (add, project, pid) {
    // Remove or add plugin from project
    if (add) {
      project.plugins.push({ id: pid, used: 0 });
    }
    else {
      for (var i = 0; i < project.plugins.length; i++) {
        if (project.plugins[i].id === pid) {
          project.plugins.splice(i, 1);
          break;
        }
      }
    }

    // Save to db
    project.save(function(err) {
      nwMenu.rebuild();
    });
  };

  return {
    get: get,
    add: add,
    updatePlugins: updatePlugins
  };
});
