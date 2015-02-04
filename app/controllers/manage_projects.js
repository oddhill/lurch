var Project = require('./lib/Project/Project.js');

Project.findAll(function(err, projects) {

  for (var key in projects) {
    $('#projects').append('<li><a href="#" class="edit" data-id="' + projects[key]._id + '"><span class="name">' + projects[key].name + '</span><span class="plugins-count">' + projects[key].plugins.length + '</span></a></li>');
  }

  // Edit project
  $('#projects a.edit').click(function() {
    $('body').addClass('edit-add');
      projectEditId = $(this).attr('data-id');
      $('#app').load('views/manage_project.html');
  });

});

// Add new project
$('a.add-project').click(function() {
  $('#app').load('views/add_project.html');
});
