
  var Project = require('./lib/Project/Project.js');
  var Plugin = require('./lib/Plugin/Plugin.js');

  var projectPath = null;
  var projectPlugins = null;

  var _project = null;

  // Form element
  var $name = $('#change-project').find('input[name="name"]');

  // Get specific project
  Project.findById(projectEditId, function(err, project) {
    _project = project;
    // Load data
    $name.val(project.name);
    $('.title-name').text(project.name);
    $('.path').text(project.path);

    var projectPlugins = null;
    project.getPlugins(function(_projectPlugins) {
      projectPlugins = _projectPlugins;
    });

    // Get plugins
    var checked = null;
    Plugin.findAll(function(err, plugins) {
      // Append plugins
      for (var key in plugins) {
        // Check if plugin in enabled on current project
        checked = null;
        for (var key2 in projectPlugins) {
          if (plugins[key]._id == projectPlugins[key2].id) {
            checked = 'checked';
          }
        }

        $('#project-plugins ul').append('<li>' + plugins[key].name + '<span class="checkbox"><input type="checkbox" data-id="' + plugins[key]._id + '"' + checked + ' /></span></li>');
      }

      // Edit db on change
      $('#project-plugins input[type="checkbox"]').on('change', function() {

        var add = $(this).prop('checked');
        var id = $(this).attr('data-id');

        // Remove or add plugin from project
        if (add) {
          projectPlugins.push({ id: id, used: 0 });
          project.setPlugins(projectPlugins);
        } else {
          for (var i = 0; i < projectPlugins.length; i++) {
            if (projectPlugins[i].id === id) {
              projectPlugins.splice(i, 1);
              project.setPlugins(projectPlugins);
              break;
            }
          }
        }

        // Save to db
        project.save(function() {
          // Rebuild menu
          nwMenu.rebuild();
        });
      });
    });
  });

  $('#change-project').submit(function(event) {
    event.preventDefault();

    // Update project
    _project.setName($name.val());
    _project.save(function(err) {
      if (!err) {
        // Rebuild menu
        nwMenu.rebuild();
        $('#app').load('views/manage_projects.html');
      }
    });
  });

  $('.delete-project').click(function(event) {
    event.preventDefault();

    // Remove project
    _project.remove(function(err) {
      if (!err) {
        // Rebuild menu
        nwMenu.rebuild();
        $('#app').load('views/manage_projects.html');
      }
    });
  });

  $('.project-menu a').on('click', function() {
    var selector = $(this).attr('href');
    $('.project-menu a').removeClass('active');
    $(this).addClass('active');
    $('#project').toggleClass('show');
    $('#project-plugins').toggleClass('show');
  });
