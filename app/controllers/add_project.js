  var Project = require('./lib/Project/Project.js');

  $('#add-site').submit(function(event) {
    event.preventDefault();

    var name = $(this).find('input[name="name"]').val();
    var path = $(this).find('input[name="path"]').val();

    var newProject = new Project(name, path, [], false, null);
    newProject.save(function(err) {
      // Rebuild menu
      nwMenu.rebuild();
      $('#app').load('views/manage_projects.html');
    });
  });
