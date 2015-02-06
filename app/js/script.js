var Project = require('./lib/Project/Project.js');
var Plugin = require('./lib/Plugin/Plugin.js');

$(document).ready(function() {

  Project.findAll(function(err, res) {
    if (!err) {
      $('.main-nav .projects-calc').html(res.length);
    }
  });

  Plugin.findAll(function(err, res) {
    if (!err) {
      $('.main-nav .plugins-calc').html(res.length);
    }
  });

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
});
