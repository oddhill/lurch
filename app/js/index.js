(function() {
  var Project = require('./lib/Project/Project.js');
  var Plugin = require('./lib/Plugin/Plugin.js');

  //require('nw.gui').Window.get().showDevTools().resizeTo(800, 1000);

  $(document).ready(function() {

    // Get projects count
    Project.findAll(function(err, res) {
      if (!err) {
        $('.main-nav .projects-calc').html(res.length);
      }
    });

    // Get plugins count
    Plugin.findAll(function(err, res) {
      if (!err) {
        $('.main-nav .plugins-calc').html(res.length);
      }
    });

    // Projects / plugins tabs
    $('.main-nav .projects').click(function() {
      $('#app').load('views/manage_projects.html');
      $('.main-nav a').removeClass('active');
      $(this).toggleClass('active');
    });

    $('.main-nav .plugins').click(function() {
      $('#app').load('views/manage_plugins.html');
      $('.main-nav a').removeClass('active');
      $(this).toggleClass('active');
    });

    // Settings click event
    $('.footer .settings').on('click', function(e) {
      e.preventDefault();

      var close = false;

      // Show settings
      $('.main-content.main').addClass('minimize');

      // Close handler
      $('.main-content.main.minimize').on('click', function(e) {
        e.preventDefault();
        if (close) {
          $(this).removeClass('minimize');
          $(this).off(e);
        }
        close = true;
      });
    });

    // Add-plugin
    $('a.add-plugin').click(function() {
      $.get('views/add_plugin.html', function(data) {
        $('body .frame').prepend(data);
      });
    });

    // Add new project
    $('a.add-project').click(function() {
      $('#app').load('views/add_project.html');
      $('body').addClass('edit-add');
    });

    // Load rest token to settings page
    $('.main-content.settings .key').html(localStorage.restToken);

  });
})();
