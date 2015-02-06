var Project = require('./lib/Project/Project.js');

// Go back link
$('#add-site .cancel').click(function(e) {
  e.preventDefault();
  $('body').removeClass('edit-add');
  $('#app').load('views/manage_projects.html');
});

// File dialog when click
$('#dragdrop-project').on('click', function() {
  $('input[name=path]').click();
});

$('#add-site input[type="text"]').on('focus', function() {
  $(this).parents('.input').addClass('active');
});
$('#add-site input[type="text"]').on('blur', function() {
  $(this).parents('.input').removeClass('active');
});

$('#add-site').submit(function(event) {
  event.preventDefault();

  $('body').prepend('<div class="msg loading"><span class="icon"></span><span class="message">Success!</span></div>');

  var name = $(this).find('input[name="name"]').val();
  var path = $(this).find('input[name="path"]').val();
  var remotePath = $(this).find('input[name="remote"]').val();
  var db = {
    host: $(this).find('input[name="db-host"]').val(),
    port: $(this).find('input[name="db-port"]').val(),
    name: $(this).find('input[name="db-name"]').val(),
    username: $(this).find('input[name="db-username"]').val(),
    password: $(this).find('input[name="db-password"]').val()
  };

  var newProject = new Project(name, path, [], false, null, db, remotePath);
  newProject.save(function(err) {
    if (!err) {
      // Rebuild menu
      nwMenu.rebuild();

      $('.msg').removeClass('loading').addClass('success');
    } else {
      $('.msg').removeClass('loading').addClass('fail');
    }
  });
});
